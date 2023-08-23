import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {DefaultButton, GreenButton, UndoRedoButton} from "../../public/components/common/Buttons";
import {WidthFlexSpacer, WidthSpacer} from "../../public/components/common/Spacers";
import {DownloadContainer, BasicBox} from "../../public/components/common/Boxes";
import {downloadFile} from "../../public/functions/DownloadFile";
import {Text} from "../../public/components/common/Typographies";
export default function Run(props) {
    const [localScript, setLocalScript] = useState("")
    const handleFailedScript = async (statusText) => {
        props.setReq(null)
        props.setDataProcessing(false)
        if (statusText !== 'Abort') {
            alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
        }
    }
    const handleSuccessScript = async (data) => {
        const {headers, entries} = data
        let newHistory = [...props.dataHistory]
        newHistory[props.dataIndex].next = props.dataHistory.length
        newHistory.push({headers: headers, entries: entries, prev: props.dataIndex, next: null, request: props.req})
        props.setDataHistory(newHistory)
        props.setDataIndex(props.dataHistory.length)
        props.setReq(null)
        props.setDataProcessing(false)
    }
    const handleClick = async () => {
        const response = await fetch("/api/run", {
            method: "POST",
            signal: props.controller.signal,
            body: JSON.stringify({
                generatedFunction: props.script,
                headers: props.headers,
                entries: props.entries
            })
        })
        if (response.status === 200) {
            const data = await response.json()
            await handleSuccessScript(data)
        }
        else {
            await handleFailedScript(response.statusText)
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
    const clearData = () => {
        props.setDataHistory([{headers: [], entries: [], prev: null, next: null}])
        props.setDataIndex(0)
        props.setFileName("")
    }
    useEffect(() => {
        if (props.script !== "" && props.script !== localScript) {
            setLocalScript(props.script)
            handleClick()
        }
    }, [props.script])
    useEffect(() => {
        if (props.clearFileVerified) {
            props.setVerify(false)
            props.setClearFileVerified(null)
            clearData()
        }
        else if (props.clearFileVerified === false) {
            props.setVerify(false)
            props.setClearFileVerified(null)
        }
    }, [props.clearFileVerified])
    return (
        <DownloadContainer>
            <BasicBox>
                <UndoRedoButton onClick={handleUndo} disabled={props.dataHistory[props.dataIndex].prev === null || props.disabled}>
                    <UndoIcon/>
                </UndoRedoButton>
                <WidthSpacer width={"0.5rem"}/>
                <UndoRedoButton onClick={handleRedo} disabled={props.dataHistory[props.dataIndex].next === null || props.disabled}>
                    <RedoIcon/>
                </UndoRedoButton>
            </BasicBox>
            <WidthFlexSpacer style={{minWidth: "1rem"}}/>
            <Text style={{textAlign: "center"}}><b>{props.dataHistory[props.dataIndex].request}</b></Text>
            <WidthFlexSpacer style={{minWidth: "1rem"}}/>
            <DefaultButton onClick={() => props.setVerify(true)} disabled={props.disabled || props.fileName === ""}>
                Clear
            </DefaultButton>
            <WidthSpacer width={"0.5rem"}/>
            <GreenButton onClick={handleButton} disabled={props.disabled || props.fileName === ""}>
                Download
            </GreenButton>
        </DownloadContainer>
    )
}