import {useEffect, useState} from "react";
export default function Script(props) {
    const [localMessage, setLocalMessage] = useState("")
    const prompt = "Given information about a user's data and a conversation of their request, please write a nodejs function titled \"performRequest\" (i.e., \"function performRequest(headers, entries){...}\") that takes in an array of headers as well as an array of arrays (representing entries and cells) to perform the user's request. Please return an object with attributes \"headers\" and \"entries\". These should contain most of the original data set, just with the modifications requested. The code should not include any comments."
    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt)
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            const data = await response.json()
            props.setScript(data.response)
        }
    }
    useEffect(() => {
        if (props.conversation.length > 0) {
            const lastMessage = props.conversation[props.conversation.length - 1]
            if (lastMessage.type === "assistant") {
                if (!lastMessage.message.includes("?") && lastMessage.message !== localMessage) {
                    console.log("Successful update called to get script.")
                    setLocalMessage(lastMessage.message)
                    sendToServer()
                    props.setDataProcessing(true)
                }
            }
        }
    }, [props.conversation])
}
