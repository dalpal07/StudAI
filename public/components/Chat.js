import {Box, Button, Input, styled} from "@mui/material";
import {useEffect, useRef, useState} from "react";

const ChatBox = styled(Box)({
    border: "1px solid black",
    height: "500px",
    overflowY: "scroll",
    padding: "20px",
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

const ChatInput = styled(Input)({
    width: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderBottom: "none",
    overflowX: "wrap",
    overflowWrap: "break-word",
    overflowY: "scroll",
    height: "100%",
    display: "inline-block",
});

const SendButton = styled(Button)({
    display: "inline-block",
});

const Chat = () => {
    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState("");
    const sendToServer = async () => {
        let req = JSON.stringify(conversation);
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        const res = await response.json()
        setConversation([...conversation, {type: "assistant", message: res.response}])
    }
    const handleSendButtonClick = () => {
        if (input === "") {
            return
        }
        setConversation([...conversation, {type: "user", message: input}])
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

    // Call scrollToBottom when component mounts or whenever content changes
    useEffect(() => {
        scrollToBottom();
        if (conversation.length > 0 && conversation[conversation.length - 1].type === "user") {
            console.log("Sending to server")
            sendToServer()
        }
    }, [conversation]);

    return (
        <div>
            <h1>Chat</h1>
            <ChatBox ref={scrollableBoxRef}>
                {conversation.map((line) => {
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
            </ChatBox>
            <InputBox>
                <ChatInput placeholder="Make your request here..." multiline rows={4}
                           value={input}
                           onChange={handleInputChange}
                           onKeyPress={handleKeyPress}/>
                <SendButton onClick={handleSendButtonClick}>Send</SendButton>
            </InputBox>
        </div>
    )
}

export default Chat