import Chat from "@/public/components/Chat";
import FileUpload from "@/public/components/FileUpload";
import Script from "@/public/components/Script";
import {useEffect, useState} from "react";
import Run from "@/public/components/Run";
import { BoldText } from "/public/components/common/Typographies"
import {InnerBox2, LoadingContainer, LoadingBox, Spinner} from "@/public/components/common/Boxes";
import {HeightSpacer} from "@/public/components/common/Spacers";

export default function Product() {
    const [conversation, setConversation] = useState([{type: "assistant", message: "Hello! My name is Stud and I am your personal data maid. Please upload a file and then let me know how I can help you clean, rearrange, or filter your data."}])
    const [conversationIndex, setConversationIndex] = useState(0)
    const [dataHistory, setDataHistory] = useState([{headers: [], entries: [], prev: null, next: null}])
    const [dataIndex, setDataIndex] = useState(0)
    const [fileName, setFileName] = useState("")
    const [script, setScript] = useState("")
    const [dataProcessing, setDataProcessing] = useState(false)
    useEffect(() => {
        if (dataProcessing) {
            document.getElementById("inner").style.setProperty("opacity", "0.5")
            document.body.style.setProperty("overflow", "hidden")
        }
        else {
            document.getElementById("inner").style.setProperty("opacity", "1")
            document.body.style.setProperty("overflow", "auto")
        }
    }, [dataProcessing])
    async function extendPrompt(prompt, isScript) {
        if (fileName !== "") {
            prompt = prompt + "\n\nInformation about the data (this information need not be requested again from the user):\n\nName: " + fileName + "\nHeaders: "
            for (let i = 0; i < dataHistory[dataIndex].headers.length; i++) {
                if (i === dataHistory[dataIndex].headers.length - 1) {
                    prompt = prompt + dataHistory[dataIndex].headers[i]
                    break
                }
                prompt = prompt + dataHistory[dataIndex].headers[i] + ", "
            }
            if (dataHistory[dataIndex].entries.length > 0) {
                prompt = prompt + "\nSample entries for reference (these entries should only be used for understanding what format the data generally follows):\n"
                if (dataHistory[dataIndex].entries.length > 5) {
                    const randomIndices = []
                    while (randomIndices.length < 5) {
                        const randomIndex = Math.floor(Math.random() * dataHistory[dataIndex].entries.length)
                        if (!randomIndices.includes(randomIndex)) {
                            randomIndices.push(randomIndex)
                        }
                    }
                    for (let i = 0; i < randomIndices.length; i++) {
                        for (let j = 0; j < dataHistory[dataIndex].entries[randomIndices[i]].length; j++) {
                            if (j === dataHistory[dataIndex].entries[randomIndices[i]].length - 1) {
                                prompt = prompt + dataHistory[dataIndex].entries[randomIndices[i]][j]
                                break
                            }
                            prompt = prompt + dataHistory[dataIndex].entries[randomIndices[i]][j] + ", "
                        }
                        prompt = prompt + "\n"
                    }
                    prompt = prompt + "\n"
                }
                else {
                    for (let i = 0; i < dataHistory[dataIndex].entries.length; i++) {
                        for (let j = 0; j < dataHistory[dataIndex].entries[i].length; j++) {
                            if (j === dataHistory[dataIndex].entries[i].length - 1) {
                                prompt = prompt + dataHistory[dataIndex].entries[i][j]
                                break
                            }
                            prompt = prompt + dataHistory[dataIndex].entries[i][j] + ", "
                        }
                        prompt = prompt + "\n"
                    }
                }
            }
        }
        if (!isScript) {
            if (conversationIndex > 0) {
                prompt = prompt + "\nPrevious conversation for reference (this information should not be used unless the user specifically refers to it in the current conversation):\n" + conversation.slice(0, conversationIndex).map((line) => {
                    if (line.type === "user") {
                        return "\nUser: " + line.message
                    } else {
                        return "\nStud: " + line.message
                    }
                })
                prompt = prompt + "\n\n"
            }
            prompt = prompt + "\nRespond to the current conversation:\n" + conversation.slice(conversationIndex).map((line) => {
                if (line.type === "user") {
                    return "\nUser: " + line.message
                } else {
                    return "\nStud: " + line.message
                }
            }) + "\nStud: [insert]"
        }
        else {
            prompt = prompt + "\nConversation:\n" + conversation.slice(conversationIndex).map((line) => {
                if (line.type === "user") {
                    return "\nUser: " + line.message
                } else {
                    return "\nStud: " + line.message
                }
            })
        }
        console.log(prompt)
        return prompt
    }
    const HandleLoading = () => {
        if (dataProcessing) {
            return (
                <LoadingContainer>
                    <LoadingBox>
                        <Spinner/>
                        <BoldText size={"1.5rem"}>Processing Your Data...</BoldText>
                    </LoadingBox>
                </LoadingContainer>
            )
        }
    }

    return (
        <>
            <InnerBox2 id={"inner"}>
                <BoldText size={"1.5rem"}>Give Stud a Try</BoldText>
                <HeightSpacer height={"0.75rem"}/>
                <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt}
                      dataProcessing={dataProcessing} fileName={fileName}/>
                <FileUpload setFileName={setFileName} fileName={fileName} dataProcessing={dataProcessing}
                            headers={dataHistory[dataIndex].headers} setDataHistory={setDataHistory}
                            entries={dataHistory[dataIndex].entries} setDataIndex={setDataIndex}/>
                <Script extendPrompt={extendPrompt} setScript={setScript} conversation={conversation} setDataProcessing={setDataProcessing}
                        setConversationIndex={setConversationIndex} conversationIndex={conversationIndex}/>
                <Run headers={dataHistory[dataIndex].headers}  entries={dataHistory[dataIndex].entries} script={script} fileName={fileName} setDataProcessing={setDataProcessing}
                     setDataIndex={setDataIndex} setDataHistory={setDataHistory} dataProcessing={dataProcessing} dataIndex={dataIndex} dataHistory={dataHistory}/>
            </InnerBox2>
            <HandleLoading/>
        </>
    )
}