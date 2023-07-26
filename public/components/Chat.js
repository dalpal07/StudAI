import {Input, styled} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {IconButton} from "@/public/components/common/Buttons";
import {ChatBox, UpperBox, UserChatLine, AssistantChatLine, UserChatMessage, AssistantChatMessage, BottomBox, ChatInputOuterBox} from "@/public/components/common/Boxes";

const ChatInput = styled(Input)(({ hasvalue }) => ({
    width: "100%",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: hasvalue === "true" ? "normal" : "italic",
    fontWeight: "500",
    lineHeight: "normal",
}));

export default function Chat(props) {
    const [input, setInput] = useState("");
    const [sendHover, setSendHover] = useState(false);
    const sendDisabled = props.dataProcessing || props.fileName === "" || input === "";
    const prompt= "You are a chatbot named Stud. Your goal is to chat with users about their data requests until you understand what they're asking for. When you sufficiently understand, reply with \"Please give me a moment while I process this request for you.\". Do not ask if there's anything else you can help with. Do not ask for unnecessary information about the file. If a user thanks you, tell them, \"You bet!\", and then end the conversation."
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
    const handleSendButtonClick = () => {
        if (input === "") {
            return
        }
        props.setConversation([...props.conversation, {type: "user", message: input}])
        setInput("")
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendButtonClick()
        }
    };
    const handleInputChange = (event) => {
        let temp = event.target.value
        if (temp.length > 0 && temp[temp.length - 1] === "\n") {
            temp = temp.substring(0, temp.length - 1)
        }
        setInput(temp)
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
            <UpperBox ref={scrollableBoxRef}>
                {props.conversation.map((line) => {
                    return (
                        <>
                            {line.type === "user" ?
                                <UserChatLine>
                                    <UserChatMessage>{line.message}</UserChatMessage>
                                </UserChatLine>
                                :
                                <AssistantChatLine>
                                    <AssistantChatMessage>{line.message}</AssistantChatMessage>
                                </AssistantChatLine>
                            }
                        </>
                    )
                })}
            </UpperBox>
            <BottomBox>
                <ChatInputOuterBox>
                    <ChatInput placeholder="What can Stud do for you today?"
                               hasvalue={(input !== "").toString()}
                               disableUnderline={true}
                               disabled={props.dataProcessing}
                               value={input}
                               onChange={handleInputChange}
                               onKeyPress={handleKeyPress}/>
                </ChatInputOuterBox>
                <IconButton onClick={handleSendButtonClick} disableTouchRipple disabled={sendDisabled}
                            onMouseEnter={() => setSendHover(true)} onMouseLeave={() => setSendHover(false)}>
                    <Image src={
                        sendDisabled ?
                            "/images/send-disabled.svg"
                            :
                            sendHover ?
                                "/images/send-hover.svg"
                                :
                                "/images/send.svg"
                    } alt={"Send"} width={40} height={40}/>
                </IconButton>
            </BottomBox>
        </ChatBox>
    )
}