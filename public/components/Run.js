import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {DefaultButton, GreenButton, UndoRedoButton} from "../../public/components/common/Buttons";
import {WidthFlexSpacer, WidthSpacer} from "../../public/components/common/Spacers";
import {DownloadContainer, BasicBox} from "../../public/components/common/Boxes";
import {downloadFile} from "../../public/functions/DownloadFile";
export default function Run(props) {
    const [localScript, setLocalScript] = useState("")
    const [triesRemaining, setTriesRemaining] = useState(2)
    const handleFailedScript = async () => {
        props.setDataProcessing(false)
        alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
        setTriesRemaining(2)
    }
    const handleSuccessScript = async (data) => {
        const {headers, entries} = data
        let newHistory = [...props.dataHistory]
        newHistory[props.dataIndex].next = props.dataHistory.length
        newHistory.push({headers: headers, entries: entries, prev: props.dataIndex, next: null})
        props.setDataHistory(newHistory)
        props.setDataIndex(props.dataHistory.length)
        props.setDataProcessing(false)
        setTriesRemaining(2)
    }
    const TryAgain = async (data) => {
        const prompt = "I sent a generated function to my file and got an error. Please rewrite the function to fix the error. Keep in mind that any helper functions must be contained inside a single function, \"function performRequest\" and follow the exact format: \"function performRequest(headers, entries) {\n[insert code here]\n}\" and it must return an object \"{headers: newHeaders, entries: newEntries}\" where newHeaders is an array (i.e., [val1,val2,...]) and newEntries is an double array (i.e., [[val1,val2,...],[val1,val2,...],...]).\n\n"
            + "generatedFunction:\n\"" + props.script  + "\n\nError:\n\n" + data.error
        const response = await fetch("/api/chat", {
            method: "POST",
            body: prompt
        })
        if (response.status === 200) {
            const data = await response.json()
            props.setScript(data.response)
        }
        else {
            await handleFailedScript()
        }
    }
    const handleClick = async () => {
        setTriesRemaining(triesRemaining - 1)
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
            await handleSuccessScript(data)
        }
        else {
            if (triesRemaining > 0) {
                const data = await response.json()
                await TryAgain(data)
            }
            else {
                await handleFailedScript()
            }
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
            <WidthFlexSpacer/>
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