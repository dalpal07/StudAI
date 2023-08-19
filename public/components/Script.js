import {useEffect, useState} from "react";
export default function Script(props) {

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
        console.log(response.status)
        if (response.status === 200) {
            console.log("Good status")
            if (!props.requestCancelled) {
                console.log("Request not cancelled")
                const data = await response.json()
                props.setScript(data.script)
            }
            else {
                props.setRequestCancelled(false)
            }
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
