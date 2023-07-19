import {Box, Button, Input, styled, Typography} from "@mui/material";
import {useState} from "react";

const InputBox = styled(Box)({
    border: "1px solid black",
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

const ScriptBox = styled(Box)({
   marginBottom: "50px",
});

const GetButton = styled(Button)({
    display: "inline-block",
});

export default function Script(props) {
    const [prompt, setPrompt] = useState("Given information about a user's data and a conversation of their request, please write a nodejs function titled \"performRequest\" (i.e., \"function performRequest(headers, entries){...}\") that takes in an array of headers as well as an array of arrays (representing entries and cells) to perform the user's request. Please return an object with attributes \"headers\" and \"entries\". These should contain most of the original data set, just with the modifications requested. The code should not include any comments.");
    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
    }

    function renderScript() {
        if (props.script === "") {
            return (<ScriptBox/>)
        } else {
            return (
                <ScriptBox>
                    <Typography><b>Try this script:</b></Typography>
                    <Typography>{props.script}</Typography>
                </ScriptBox>
            )
        }
    }

    const sendToServer = async () => {
        const req = await props.extendPrompt(prompt)
        const response = await fetch("/api/chat", {
            method: "POST",
            body: req
        })
        if (response.status === 200) {
            const data = await response.json()
            props.setScript(data.response)
        }
    }

    const handleGetButtonClick = () => {
        sendToServer()
    }

    return (
        <div>
            <h1>Script</h1>
            <InputBox>
                <Typography><b>Prompt:</b></Typography>
                <ChatInput placeholder="Fill in AI prompt here..." multiline rows={4}
                           value={prompt}
                           onChange={handlePromptChange}/>
                <GetButton onClick={handleGetButtonClick}>Get</GetButton>
            </InputBox>
            {renderScript()}
        </div>
    );
}
