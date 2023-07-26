import {useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import {Box, styled} from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {GreenButton, UndoRedoButton} from "@/public/components/Buttons";
import {WhiteBoldText} from "@/public/components/Typographies";
import {WidthSpacer} from "@/public/components/Spacers";

const DownloadContainer = styled(Box) ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
});

const Spacer = styled(Box)({
    display: "flex",
    width: "100%",
});

const UndoRedoContainer = styled(Box)({
    display: "flex",
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
                <WidthSpacer width={"0.5rem"}/>
                <UndoRedoButton onClick={handleRedo} disabled={props.dataHistory[props.dataIndex].next === null || props.dataProcessing}>
                    <RedoIcon/>
                </UndoRedoButton>
            </UndoRedoContainer>
            <Spacer/>
            <GreenButton onClick={handleButton} disabled={props.dataProcessing || props.fileName === ""}>
                Download
            </GreenButton>
        </DownloadContainer>
    )
}