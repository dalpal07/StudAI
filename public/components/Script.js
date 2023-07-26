import {useEffect, useState} from "react";
export default function Script(props) {
    const [localIndex, setLocalIndex] = useState(-1)
    const prompt = "Given information about a user's data and a conversation describing their data manipulation/filtering request, please write a nodejs function titled \"performRequest\" (i.e., \"function performRequest(headers, entries) {...}\") that takes in an array of headers as well as a double array of entries to carry out the user's request. Please return an object with attributes \"headers\" and \"entries\" that contain the transformed/filtered data. If no changes are made to some of the data, please return that original data."
    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt, true)
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
                if (lastMessage.message.includes("Please give me a moment while I process this request for you.") && props.conversationIndex !== localIndex) {
                    setLocalIndex(props.conversationIndex)
                    sendToServer()
                    setTimeout(() => {
                        props.setDataProcessing(true)
                    }, 1500)
                    props.setConversationIndex(props.conversation.length)
                }
            }
        }
    }, [props.conversation])
}
