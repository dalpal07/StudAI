import {Box, Button, Input, styled, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";

const ChatBox = styled(Box)({
    display: "flex",
    height: "373px",
    padding: "1.125rem",
    paddingLeft: "1.75rem",
    paddingRight: "1.75rem",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    flex: "1 0 0",
    borderRadius: "1.25rem",
    border: "1px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    background: "#F2F2F2",
});

const ChatLine = styled(Box)({
    display: "flex",
});

const AssistantChatLine = styled(ChatLine)({

});

const UserChatLine = styled(ChatLine)({
    justifyContent: "flex-end",
    alignItems: "flex-end",
});

const ChatMessage = styled(Box)({
    border: "1px solid black",
    marginBottom: "15px",
    width: "fit-content",
    maxWidth: "60%",
    borderRadius: "20px",
    padding: "10px",
});

const InputBox = styled(Box)({
    border: "1px solid black",
    borderTop: "none",
    height: "100px",
    display: "flex",
});

const BottomBox = styled(Box)({
    display: "flex",
    width: "100%",
    height: "fit-content",
    alignItems: "center",
    justifyContent: "center",
});

const ChatInputOuterBox = styled(Box)({
    display: "flex",
    padding: "0.75rem",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "1.25rem",
    background: "#E3E3E3",
    height: "1em",
    width: "100%",
});

const ChatInput = styled(Input)(({ hasValue }) => ({
    width: "100%",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: hasValue ? "normal" : "italic",
    fontWeight: "500",
    lineHeight: "normal",
}));

const SendButton = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default function Chat(props) {
    const [input, setInput] = useState("");
    const [prompt, setPrompt] = useState("You are an AI chatbot named Stud. Your goal is to chat with users about their data requests until you sufficiently understand the details of what they're asking. When you sufficiently understand, let the user know that you will take care of their request.")
    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt)
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            const data = await response.json()
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

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
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
        if (response.status === 200) {
            console.log("Cold call successful")
        }
    }

    // Call scrollToBottom when component mounts or whenever content changes
    useEffect(() => {
        coldCall();
        scrollToBottom();
        if (props.conversation.length > 0 && props.conversation[props.conversation.length - 1].type === "user") {
            console.log("Sending to server")
            sendToServer()
        }
    }, [props.conversation]);

    return (
        <Box>
            <ChatBox ref={scrollableBoxRef}>
                {props.conversation.map((line) => {
                    return (
                        <>
                            {line.type === "user" ?
                                <UserChatLine>
                                    <ChatMessage>{line.message}</ChatMessage>
                                </UserChatLine>
                                :
                                <AssistantChatLine>
                                    <ChatMessage>{line.message}</ChatMessage>
                                </AssistantChatLine>
                            }
                        </>
                    )
                })}
                <BottomBox>
                    <ChatInputOuterBox>
                        <ChatInput placeholder="What can Stud do for you today?"
                                   hasValue={input !== ""}
                                   disableUnderline={true}
                                   value={input}
                                   onChange={handleInputChange}
                                   onKeyPress={handleKeyPress}/>
                    </ChatInputOuterBox>
                    <SendButton onClick={handleSendButtonClick}><Image src={"./images/send.svg"} alt={"Send"} width={40} height={40}/></SendButton>
                </BottomBox>
            </ChatBox>
            <InputBox>
                <Typography><b>Prompt:</b></Typography>
                <ChatInput placeholder="Fill in AI prompt here..." multiline rows={4}
                           hasValue={prompt !== ""}
                           value={prompt}
                           onChange={handlePromptChange}/>
            </InputBox>
        </Box>
    )
}