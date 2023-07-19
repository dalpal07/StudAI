import {Box, Typography} from "@mui/material";
import {useState} from "react";

export default function Run(props) {
    const [response, setResponse] = useState("")

    const handleClick = async () => {
        const headers = await props.getFileHeaders()
        const entries = await props.getFileEntries()
        const response = await fetch("/api/run", {
            method: "POST",
            body: JSON.stringify({
                generatedFunction: props.script,
                headers: headers,
                entries: entries
            })
        })
        if (response.status === 200) {
            const data = await response.json()
            setResponse(JSON.stringify(data))
        }
    }

    return (
        <Box>
            <h1>Run</h1>
            <button onClick={handleClick}>Run the Script</button>
            <Typography><b>Response:</b></Typography>
            <Typography>{response}</Typography>
        </Box>
    )
}