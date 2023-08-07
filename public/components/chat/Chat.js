import {useEffect, useRef} from "react";
import {ChatBox} from "../../../public/components/common/Boxes";
import UpperChat from "../../../public/components/chat/UpperChat";
import LowerChat from "../../../public/components/chat/LowerChat";

export default function Chat(props) {
    const prompt= "You are a chat bot named Stud. Your goal is to chat with users about their data requests until you understand what they're asking for. When you sufficiently understand, reply with a summary showing that you understand their request and say, \"Please give me a moment while I process this request for you.\". We already have their data and file information, so do not ask for it. If a user thanks you, simply tell them, \"You bet! Please let me know if there's anything else I can help you with today.\""
    const sendToServer = async () => {
        const reqString = await props.extendPrompt(prompt, false)
        const messages = [{"role": "system", "content": reqString}, ...props.conversation]
        // console.log("Prompt: " + reqString)
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages,
            }),
        })
        // console.log(response)
        console.log("Edge function returned")
        if (response.status === 200) {
            props.setCurrentAIMessage("")
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
        props.setConversation([...props.conversation, {"role": "assistant", "content": currentAIMessage}])
    }

    const scrollableBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTop = scrollableBoxRef.current.scrollHeight;
        }
    };

    // Call scrollToBottom when component mounts or whenever content changes
    useEffect(() => {
        scrollToBottom();
        if (props.conversation.length > 1 && props.conversation[props.conversation.length - 1].role === "user") {
            sendToServer()
        }
    }, [props.conversation]);

    return (
        <ChatBox>
            <UpperChat scrollableBoxRef={scrollableBoxRef} conversation={props.conversation}/>
            <LowerChat disabled={props.disabled} conversation={props.conversation}
                       setConversation={props.setConversation} fileName={props.fileName}
                       extendPrompt={props.extendPrompt} currentAIMessage={props.currentAIMessage}
                       setCurrentAIMessage={props.setCurrentAIMessage}/>
        </ChatBox>
    )
}