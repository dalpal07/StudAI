import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function Script(props) {
    const {user} = useUser();
    const sendToServer = async () => {
        const response = await fetch("/api/script", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request: props.req,
                headers: props.headers,
            }),
        })
        if (response.status === 200) {
            readStream(response)
        }
    }

    const addRequest = async () => {
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`/api/user/add-request?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
        if (response.status === 200) {
            const data = await response.json();
            props.setRequests(data.requests)
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
        if (!props.requestCancelled) {
            // addRequest()
            props.setScript(currentAIMessage)
        }
        else {
            props.setRequestCancelled(false)
        }
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
