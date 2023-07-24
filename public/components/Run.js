import {useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import {Box, Button, styled} from "@mui/material";

const DownloadContainer = styled(Box) ({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
});

const DownloadButton = styled(Button)({
    color: "white",
    display: "flex",
    padding: "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    backgroundColor: 'var(--main-green, #53B753)',
    textTransform: "none",
    margin: "1rem 0",
});

function downloadFile(content, fileName) {
    // if fileName extension is not csv, change to csv
    if (fileName.split(".")[1] !== "csv") {
        fileName = fileName.split(".")[0] + ".csv"
    }
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
}

export default function Run(props) {
    const [localScript, setLocalScript] = useState("")
    const handleClick = async () => {
        const response = await fetch("/api/run", {
            method: "POST",
            body: JSON.stringify({
                generatedFunction: props.script,
                headers: props.headers,
                entries: props.entries
            })
        })
        if (response.status === 200) {
            const data = await response.json()
            const {headers, entries} = data
            props.setHeaders(headers)
            props.setEntries(entries)
            props.setDataProcessing(false)
            // const csvContent = headers.join(",") + "\n" + entries.map(e => e.join(",")).join("\n")
            // downloadFile(csvContent, props.fileName)
        }
        else {
            props.setDataProcessing(false)
            alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
        }
    }
    const handleButton = () => {
        const csvContent = props.headers.join(",") + "\n" + props.entries.map(e => e.join(",")).join("\n")
        downloadFile(csvContent, props.fileName)
    }
    useEffect(() => {
        if (props.script !== "" && props.script !== localScript) {
            setLocalScript(props.script)
            handleClick()
        }
    }, [props.script])
    return (
        <DownloadContainer>
            <DownloadButton onClick={handleButton} disabled={props.dataProcessing || props.fileName === ""}>
                Download
            </DownloadButton>
        </DownloadContainer>
    )
}