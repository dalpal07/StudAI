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

const UpperBox = styled(Box)({
    overflowY: "scroll",
    width: "100%"
});

const ChatLine = styled(Box)({
    display: "flex",
});

const AssistantChatLine = styled(ChatLine)({

});

const UserChatLine = styled(ChatLine)({
    justifyContent: "flex-end",
    alignItems: "flex-end"
});

const ChatMessage = styled(Box)({
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    padding: "0.75rem 1.125rem",
    gap: "0.625rem",
    borderRadius: "1.25rem",
    marginBottom: "0.75rem",
    maxWidth: "60%",
});

const UserChatMessage = styled(ChatMessage)({
    alignItems: "flex-end",
    background: "#53B753",
    color: "#F2F2F2",
});

const AssistantChatMessage = styled(ChatMessage)({
    background: "#E3E3E3",
    color: "var(--main-black, #3F3636)",
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

const ChatInput = styled(Input)(({ hasvalue }) => ({
    width: "100%",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: hasvalue === "true" ? "normal" : "italic",
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
    const prompt= "You are an AI chatbot named Stud. Your goal is to chat with users about their data requests until you sufficiently understand the details of what they're asking. When you sufficiently understand, let the user know that you will take care of their request. No need to ask if there's anything else you can do."
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
                    <SendButton onClick={handleSendButtonClick} disabled={props.dataProcessing}><Image src={"./images/send.svg"} alt={"Send"} width={40} height={40}/></SendButton>
                </BottomBox>
            </ChatBox>
        </Box>
    )
}