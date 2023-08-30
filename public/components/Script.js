import {useEffect} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useDispatch} from "react-redux";
import {addRequest} from "@/slices/subscriptionSlice";

export default function Script(props) {
    const {user} = useUser();
    const sendToServer = async () => {
        const response = await fetch("/api/script", {
            method: "POST",
            signal: props.controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request: props.req,
                headers: props.headers,
            }),
        })
        if (response.status === 200) {
            try {
                await readStream(response)
            } catch (e) {
                props.setDataProcessing(false)
                props.setReq(null)
                if (e.name !== 'AbortError') {
                    alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
                }
            }
        } else {
            props.setDataProcessing(false)
            props.setReq(null)
            if (response.statusText !== 'Abort') {
                alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
            }
        }
    }

    const handleRequestComplete = async () => {
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`/api/user/add-request?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
        if (response.status === 200) {
            const dispatch = useDispatch();
            dispatch(addRequest())
        }
    }

    const readStream = async (response) => {
        const data = response.body
        // console.log(data)
        const reader = data.getReader();
        // console.log(reader)
        const decoder = new TextDecoder();
        let done = false;
        // console.log("API call successfull!")
        let currentAIMessage = ""

        while (!done) {
            const {value, done: doneReading} = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            currentAIMessage += chunkValue
            // console.log("Current AI message: " + currentAIMessage)
        }
        // handleRequestComplete()
        props.setScript(currentAIMessage)
    }

    useEffect(() => {
        if (props.req) {
            props.setDataProcessing(true)
        }
    }, [props.req])
    useEffect(() => {
        if (props.dataProcessing) {
            sendToServer()
        }
    }, [props.dataProcessing])
}
