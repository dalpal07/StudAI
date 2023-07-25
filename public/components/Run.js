import {useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import {Box, Button, styled} from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const DownloadContainer = styled(Box) ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
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
    "&:disabled": {
        backgroundColor: "#D6D6D6",
        color: "#3F3636",
        opacity: 0.5,
    },
    "&:hover": {
        backgroundColor: "var(--main-green-hover, #4AAE4A)",
    }
});

const Spacer = styled(Box)({
    display: "flex",
    width: "100%",
});

const UndoRedoContainer = styled(Box)({
    display: "flex",
});

const UndoRedoButton = styled(Button)({
    padding: "0.5rem 1.5rem",
    backgroundColor: "var(--main-gray, #E5E5E5)",
    color: "var(--main-black, #3F3636)",
    marginRight: "0.5rem",
    "&:hover": {
        background: "#D6D6D6",
    }
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
            let newHistory = [...props.dataHistory]
            newHistory[props.dataIndex].next = props.dataHistory.length
            newHistory.push({headers: headers, entries: entries, prev: props.dataIndex, next: null})
            props.setDataHistory(newHistory)
            props.setDataIndex(props.dataHistory.length)
            props.setDataProcessing(false)
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
    const handleUndo = () => {
        const indexToGo = props.dataHistory[props.dataIndex].prev
        if (indexToGo === null) {
            return
        }
        props.setDataIndex(indexToGo)
    }
    const handleRedo = () => {
        const indexToGo = props.dataHistory[props.dataIndex].next
        if (indexToGo === null) {
            return
        }
        props.setDataIndex(indexToGo)
    }
    useEffect(() => {
        if (props.script !== "" && props.script !== localScript) {
            setLocalScript(props.script)
            handleClick()
        }
    }, [props.script])
    return (
        <DownloadContainer>
            <UndoRedoContainer>
                <UndoRedoButton onClick={handleUndo} disabled={props.dataHistory[props.dataIndex].prev === null || props.dataProcessing}>
                    <UndoIcon/>
                </UndoRedoButton>
                <UndoRedoButton onClick={handleRedo} disabled={props.dataHistory[props.dataIndex].next === null || props.dataProcessing}>
                    <RedoIcon/>
                </UndoRedoButton>
            </UndoRedoContainer>
            <Spacer/>
            <DownloadButton onClick={handleButton} disabled={props.dataProcessing || props.fileName === ""}>
                Download
            </DownloadButton>
        </DownloadContainer>
    )
}