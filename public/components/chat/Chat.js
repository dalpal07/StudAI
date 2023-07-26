import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {IconButton} from "@/public/components/common/Buttons";
import {ChatBox, UpperBox, UserChatLine, AssistantChatLine, UserChatMessage, AssistantChatMessage, BottomBox, ChatInputOuterBox} from "@/public/components/common/Boxes";
import {ChatInput} from "@/public/components/common/Inputs";
import UpperChat from "@/public/components/chat/UpperChat";
import LowerChat from "@/public/components/chat/LowerChat";

export default function Chat(props) {
    const prompt= "You are a chat bot named Stud. Your goal is to chat with users about their data requests until you understand what they're asking for. When you sufficiently understand, reply with \"Please give me a moment while I process this request for you.\". Do not ask if there's anything else you can help with. Do not ask for unnecessary information about the file. If a user thanks you, tell them, \"You bet!\", and then end the conversation."
    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt, false)
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            const data = await response.json()
            // delete end of response if "[/insert]" is present
            if (data.response.includes("[/insert]")) {
                data.response = data.response.substring(0, data.response.indexOf("[/insert]"))
            }
            props.setConversation([...props.conversation, {type: "assistant", message: data.response}])
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
            <LowerChat dataProcessing={props.dataProcessing} conversation={props.conversation}
                       setConversation={props.setConversation} fileName={props.fileName}/>
        </ChatBox>
    )
}