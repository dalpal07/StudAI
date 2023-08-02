import {useEffect, useRef} from "react";
import {ChatBox} from "../../../public/components/common/Boxes";
import UpperChat from "../../../public/components/chat/UpperChat";
import LowerChat from "../../../public/components/chat/LowerChat";

export default function Chat(props) {
    const prompt= "You are a chat bot named Stud. Your goal is to chat with users about their data requests until you understand what they're asking for. When you sufficiently understand, reply with a summary showing that you understand their request and say, \"Please give me a moment while I process this request for you.\". Do not ask if there's anything else you can help with. If a user thanks you, tell them, \"You bet!\", and then end the conversation."
    const sendToServer = async () => {
        // const reqString = await props.extendPrompt(prompt, false)
        // const response = await fetch("/api/chat", {
        //     method: "POST",
        //     body:
        // })
        // if (response.status === 200) {
        //     const data = await response.json()
        //     // delete end of response if "[/insert]" is present
        //     if (data.response.includes("[/insert]")) {
        //         data.response = data.response.substring(0, data.response.indexOf("[/insert]"))
        //     }
        //     props.setConversation([...props.conversation, {type: "assistant", message: data.response}])
        // }
        const reqString = await props.extendPrompt(prompt, false)
        // const testString = "This is a test"
        console.log("Prompt: " + reqString)
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reqString,
            }),
        })
        // console.log(response)
        console.log("Edge function returned")
        if (response.status === 200) {
            const data = response.body
            console.log(data)
            const reader = data.getReader();
            console.log(reader)
            const decoder = new TextDecoder();
            let done = false;
            console.log("API call successfull!")

            props.setCurrentAIMessage("")
            props.setConversation([...props.conversation, {type: "stud", message: currentAIMessage}])

            while (!done) {
                const {value, done: doneReading} = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                props.setCurrentAIMessage((prev) => prev + chunkValue)
                console.log(props.currentAIMessage)
                // props.setConversation([...props.conversation, {type: "stud", message: (prev) => prev + chunkValue}]);
            }
            props.setConversation([...props.conversation, {type: "stud", message: props.currentAIMessage}])
        }
    }



    const scrollableBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTop = scrollableBoxRef.current.scrollHeight;
        }
    };

    const coldCall = async () => {
        const response = await fetch("/api/chat", {
            method: "POST",
            body: ""
        })
        if (response.status !== 200) {
            console.log("Cold call error: " + response.status)
        }
    }

    // Call scrollToBottom when component mounts or whenever content changes
    useEffect(() => {
        coldCall();
        scrollToBottom();
        if (props.conversation.length > 1 && props.conversation[props.conversation.length - 1].type === "user") {
            sendToServer()
        }
    }, [props.conversation]);

    return (
        <ChatBox>
            <UpperChat scrollableBoxRef={scrollableBoxRef} conversation={props.conversation}/>
            <LowerChat disabled={props.disabled} conversation={props.conversation}
                       setConversation={props.setConversation} fileName={props.fileName}/>
        </ChatBox>
    )
}