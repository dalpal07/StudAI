import {useEffect, useState} from "react";
export default function Script(props) {
    const [localIndex, setLocalIndex] = useState(-1)
    const prompt = "Given information about a user's data and a summary describing their data manipulation/filtering request, please write a single nodejs function that follows the following format:\n\"function performRequest(headers, entries) {\n// Your code here\nreturn {headers: newHeaders, entries: newEntries}\n}\"\nheaders and newHeaders will be single arrays of strings, while entries and newEntries will be double arrays of strings. Do not include comments in your code."

    const sendToServer = async () => {
        const reqString = await props.extendPrompt(prompt, true)
        // console.log("Prompt: " + reqString)
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reqString,
            }),
        })
        // console.log("Edge function returned")
        if (response.status === 200) {
            readStream(response)
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
        props.setScript(currentAIMessage)
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
