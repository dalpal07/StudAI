import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {DefaultButton, GreenButton, UndoRedoButton} from "@/public/components/common/Buttons";
import {WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {DownloadContainer, BasicBox} from "@/public/components/common/Boxes";
import {downloadFile} from "@/public/functions/DownloadFile";
import {Text} from "@/public/components/common/Typographies";
import {
    clearHistory,
    nextHistoryIndex,
    prevHistoryIndex,
    save,
    selectCurrentFileEntries,
    selectCurrentFileHeaders, selectCurrentFileName,
    selectCurrentFileRequest,
    selectDisabledNext,
    selectDisabledPrev,
} from "@/slices/fileSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";
export default function Run(props) {
    const dispatch = useDispatch();
    const sub = useSelector(selectSub);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    const disabledPrev = useSelector(selectDisabledPrev);
    const disabledNext = useSelector(selectDisabledNext);
    const currentFileRequest = useSelector(selectCurrentFileRequest);
    const currentFileName = useSelector(selectCurrentFileName);

    const handleDownload = () => {
        const csvContent = currentFileHeaders.join(",") + "\n" + currentFileEntries.map(e => e.join(",")).join("\n")
        downloadFile(csvContent, currentFileName)
    }

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
            <DefaultButton onClick={() => dispatch(clearHistory())} disabled={props.disabled || !currentFileName}>
                Clear
            </DefaultButton>
            <WidthSpacer width={"0.5rem"}/>
            <DefaultButton onClick={() => dispatch(save({id: sub, headers: currentFileHeaders, entries: currentFileEntries, fileName: currentFileName}))} disabled={props.disabled || !currentFileName}>
                Save
            </DefaultButton>
            <WidthSpacer width={"0.5rem"}/>
            <GreenButton onClick={handleDownload} disabled={props.disabled || !currentFileName}>
                Download
            </GreenButton>
        </DownloadContainer>
    )
}