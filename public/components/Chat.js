import {Box, Button, Input, styled, Typography} from "@mui/material";
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

export default function Chat(props) {
    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState("");
    const [prompt, setPrompt] = useState("You are an AI chatbot named Stud. Your goal is to chat with users about their data requests until you sufficiently understand the details of what they're asking. When you sufficiently understand, let the user know that you will take care of their request.")

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                resolve(content);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
    async function getFileHeaders() {
        let headers = []
        let file = props.file
        await readFile(file).then((content) => {
            let lines = content.split("\n")
            if (lines.length > 0) {
                let headerLine = lines[0]
                headers = headerLine.split(",")
                for (let i = 0; i < headers.length; i++) {
                    headers[i] = headers[i].trim()
                }
            }
        })
        return headers
    }

    const sendToServer = async () => {
        let req = prompt
        if (props.file !== null) {
            req = req + "\n\nHere is some information about the data:\n\nName: " + props.file.name + "\nHeaders: "
            let headers = await getFileHeaders()
            for (let i = 0; i < headers.length; i++) {
                if (i === headers.length - 1) {
                    req = req + headers[i]
                    break
                }
                req = req + headers[i] + ", "
            }
        }
        req = req + "\n\nRespond to this conversation:\n" + conversation.map((line) => {
            if (line.type === "user") {
                return "\nUser: " + line.message
            } else {
                return "\nStud: " + line.message
            }
        }) + "\nStud: [insert]"
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            const data = await response.json()
            setConversation([...conversation, {type: "assistant", message: data.response}])
        }
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

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
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
            <InputBox>
                <Typography><b>Prompt:</b></Typography>
                <ChatInput placeholder="Fill in AI prompt here..." multiline rows={4}
                           value={prompt}
                           onChange={handlePromptChange}/>
            </InputBox>
        </div>
    )
}