import {useEffect, useState} from "react";
export default function Script(props) {
    const [localIndex, setLocalIndex] = useState(-1)
    const prompt = "Given information about a user's data and a summary describing their data manipulation/filtering request, please write a single nodejs function that follows the following format:\n\"function performRequest(headers, entries) {\n// Your code here\nreturn {headers: newHeaders, entries: newEntries}\n}\"\nheaders and newHeaders will be single arrays of strings, while entries and newEntries will be double arrays of strings. Do not include comments in your code."
    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt, true)
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            if (!props.requestCancelled) {
                const data = await response.json()
                props.setScript(data.response)
            }
            else {
                props.setRequestCancelled(false)
            }
        }
    }
    useEffect(() => {
        if (props.conversation.length > 0) {
            const lastMessage = props.conversation[props.conversation.length - 1]
            if (lastMessage.type === "assistant") {
                if (lastMessage.message.includes("Please give me a moment while I process this request for you.") && props.conversationIndex !== localIndex) {
                    setLocalIndex(props.conversationIndex)
                    setTimeout(() => {
                        props.setDataProcessing(true)
                    }, 1000)
                }
            }
        }
    }, [props.conversation])
    useEffect(() => {
        if (props.dataProcessing) {
            sendToServer().then(() => {
                props.setConversationIndex(props.conversation.length)
            });
        }
    }, [props.dataProcessing])
}
