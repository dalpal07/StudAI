import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {DefaultButton, GreenButton, UndoRedoButton} from "@/public/components/common/Buttons";
import {WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {DownloadContainer, BasicBox} from "@/public/components/common/Boxes";
import {downloadFile} from "@/public/functions/DownloadFile";
import {Text} from "@/public/components/common/Typographies";
import {
    addHistory,
    clearHistory,
    nextHistoryIndex,
    prevHistoryIndex,
    save,
    selectCurrentFileEntries,
    selectCurrentFileHeaders,
    selectCurrentFileRequest,
    selectDisabledNext,
    selectDisabledPrev,
    selectHasNext,
    selectHasPrev
} from "@/slices/fileSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";
export default function Run(props) {
    const [localScript, setLocalScript] = useState("")
    const dispatch = useDispatch();
    const sub = useSelector(selectSub);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    const disabledPrev = useSelector(selectDisabledPrev);
    const disabledNext = useSelector(selectDisabledNext);
    const currentFileRequest = useSelector(selectCurrentFileRequest);
    const handleFailedScript = async (statusText) => {
        props.setReq(null)
        props.setDataProcessing(false)
        if (statusText !== 'Abort') {
            alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
        }
    }
    const handleSuccessScript = async (data) => {
        const {headers, entries} = data
        dispatch(addHistory({headers: headers, entries: entries, request: props.req, name: props.fileName}))
        props.setReq(null)
        props.setDataProcessing(false)
    }
    const handleClick = async () => {
        const response = await fetch("/api/run", {
            method: "POST",
            signal: props.controller.signal,
            body: JSON.stringify({
                generatedFunction: props.script,
                headers: currentFileHeaders,
                entries: currentFileEntries,
                extraFiles: props.extraFiles,
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
        const csvContent = currentFileHeaders.join(",") + "\n" + currentFileEntries.map(e => e.join(",")).join("\n")
        downloadFile(csvContent, props.fileName)
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
            dispatch(clearHistory())
        }
        else if (props.clearFileVerified === false) {
            props.setVerify(false)
            props.setClearFileVerified(null)
        }
    }, [props.clearFileVerified])
    return (
        <DownloadContainer>
            <BasicBox>
                <UndoRedoButton onClick={() => dispatch(prevHistoryIndex())} disabled={disabledPrev || props.disabled}>
                    <UndoIcon/>
                </UndoRedoButton>
                <WidthSpacer width={"0.5rem"}/>
                <UndoRedoButton onClick={() => dispatch(nextHistoryIndex())} disabled={disabledNext || props.disabled}>
                    <RedoIcon/>
                </UndoRedoButton>
            </BasicBox>
            <WidthFlexSpacer style={{minWidth: "1rem"}}/>
            <Text style={{textAlign: "center"}}><b>{currentFileRequest}</b></Text>
            <WidthFlexSpacer style={{minWidth: "1rem"}}/>
            <DefaultButton onClick={() => props.setVerify(true)} disabled={props.disabled || props.fileName === ""}>
                Clear
            </DefaultButton>
            <WidthSpacer width={"0.5rem"}/>
            <DefaultButton onClick={() => dispatch(save({id: sub, headers: currentFileHeaders, entries: currentFileEntries, fileName: props.fileName}))} disabled={props.disabled || props.fileName === ""}>
                Save
            </DefaultButton>
            <WidthSpacer width={"0.5rem"}/>
            <GreenButton onClick={handleButton} disabled={props.disabled || props.fileName === ""}>
                Download
            </GreenButton>
        </DownloadContainer>
    )
}