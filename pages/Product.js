import Chat from "@/public/components/chat/Chat";
import FileUpload from "@/public/components/file-upload/FileUpload";
import Script from "@/public/components/Script";
import {useEffect, useState} from "react";
import Run from "@/public/components/Run";
import { BoldText } from "/public/components/common/Typographies"
import {InnerBox2} from "@/public/components/common/Boxes";
import {HeightSpacer} from "@/public/components/common/Spacers";
import ExtendPrompt from "@/public/functions/ExtendPrompt";
import Loading from "@/public/components/conditionals/Loading";
import Verify from "@/public/components/conditionals/Verify";

export default function Product() {
    const [conversation, setConversation] = useState([{type: "assistant", message: "Hello! My name is Stud and I am your personal data maid. Please upload a file and then let me know how I can help you clean, rearrange, or filter your data."}])
    const [conversationIndex, setConversationIndex] = useState(0)
    const [dataHistory, setDataHistory] = useState([{headers: [], entries: [], prev: null, next: null}])
    const [dataIndex, setDataIndex] = useState(0)
    const [fileName, setFileName] = useState("")
    const [script, setScript] = useState("")
    const [dataProcessing, setDataProcessing] = useState(false)
    const [verifyReplaceFile, setVerifyReplaceFile] = useState(false)
    const [verifyClearFile, setVerifyClearFile] = useState(false)
    const [replaceFileVerified, setReplaceFileVerified] = useState(null)
    const [clearFileVerified, setClearFileVerified] = useState(null)
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        if (disabled) {
            document.getElementById("inner").style.setProperty("opacity", "0.5")
            document.body.style.setProperty("overflow", "hidden")
        }
        else {
            document.getElementById("inner").style.setProperty("opacity", "1")
            document.body.style.setProperty("overflow", "auto")
        }
    }, [disabled])
    useEffect(() => {
        if (dataProcessing || verifyReplaceFile || verifyClearFile) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [dataProcessing, verifyReplaceFile, verifyClearFile])
    const extendPrompt = async (prompt, isScript) => {
        return await ExtendPrompt({
            prompt: prompt,
            isScript: isScript,
            fileName: fileName,
            dataHistory: dataHistory,
            dataIndex: dataIndex,
            conversation: conversation,
            conversationIndex: conversationIndex,
        })
    }
    return (
        <>
            <InnerBox2 id={"inner"}>
                <BoldText size={"1.5rem"}>Give Stud a Try</BoldText>
                <HeightSpacer height={"0.75rem"}/>
                <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt}
                      disabled={disabled} fileName={fileName}/>
                <FileUpload setFileName={setFileName} fileName={fileName} disabled={disabled}
                            headers={dataHistory[dataIndex].headers} setDataHistory={setDataHistory}
                            entries={dataHistory[dataIndex].entries} setDataIndex={setDataIndex}
                            verify={verifyReplaceFile} setVerify={setVerifyReplaceFile} replaceFileVerified={replaceFileVerified}
                            setReplaceFileVerified={setReplaceFileVerified}/>
                <Script extendPrompt={extendPrompt} setScript={setScript} conversation={conversation} setDataProcessing={setDataProcessing}
                        setConversationIndex={setConversationIndex} conversationIndex={conversationIndex}/>
                <Run headers={dataHistory[dataIndex].headers}  entries={dataHistory[dataIndex].entries} script={script} fileName={fileName} setDataProcessing={setDataProcessing}
                     setDataIndex={setDataIndex} setDataHistory={setDataHistory} disabled={disabled} dataIndex={dataIndex} dataHistory={dataHistory} setFileName={setFileName}
                     verify={verifyClearFile} setVerify={setVerifyClearFile} clearFileVerified={clearFileVerified} setClearFileVerified={setClearFileVerified}/>
            </InnerBox2>
            <Loading dataProcessing={dataProcessing}/>
            <Verify verify={verifyReplaceFile} setVerified={setReplaceFileVerified} message={"Are you sure you want to replace this file? This action cannot be undone."}/>
            <Verify verify={verifyClearFile} setVerified={setClearFileVerified} message={"Are you sure you want to clear this file? This action cannot be undone."}/>
        </>
    )
}