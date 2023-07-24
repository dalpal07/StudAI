import Chat from "@/public/components/Chat";
import FileUpload from "@/public/components/FileUpload";
import Script from "@/public/components/Script";
import {Box, Button, styled, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Run from "@/public/components/Run";

const InnerBox = styled(Box) ({
    margin: "1.5rem",
});

const TitleBox = styled(Box) ({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
});

const TitleTypography = styled(Typography) ({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
});

const LoadingContainer = styled(Box) ({
    display: "flex",
    position: "fixed",
    top: "30%",
    width: "100%",
    justifyContent: "center",
});

const LoadingBox = styled(Box) ({
    background: "#F2F2F2",
    display: "flex",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.30), 0px 0px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
    width: "35rem",
    height: "15rem",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

const Spinner = styled(Box) ({
    width: 64,
    height: 64,
    border: "8px solid",
    borderColor: "var(--main-green, #53B753) transparent var(--main-green, #53B753) transparent",
    borderRadius: "50%",
    animation: "spin-anim 1.2s linear infinite",
    marginBottom: "1.5rem",
});

export default function Product() {
    const [conversation, setConversation] = useState([{type: "assistant", message: "Hello! My name is Stud and I am your personal data maid. Please upload a file and then let me know how I can help you clean, rearrange, or filter your data. For example, try asking \"Can you please swap the first 2 columns in my file?\"."}])
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
            prompt = prompt + "\n\nInformation about the data:\n\nName: " + fileName + "\nHeaders: "
            for (let i = 0; i < dataHistory[dataIndex].headers.length; i++) {
                if (i === dataHistory[dataIndex].headers.length - 1) {
                    prompt = prompt + dataHistory[dataIndex].headers[i]
                    break
                }
                prompt = prompt + dataHistory[dataIndex].headers[i] + ", "
            }
            if (dataHistory[dataIndex].entries.length > 0) {
                prompt = prompt + "\nSample entries for reference:\n"
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
            if (conversationIndex !== 0) {
                prompt = prompt + "\nPrevious conversation for reference:\n" + conversation.slice(0, conversationIndex).map((line) => {
                    if (line.type === "user") {
                        return "\nUser: " + line.message
                    } else {
                        return "\nStud: " + line.message
                    }
                })
                prompt = prompt + "\n\n"
            }
            prompt = prompt + "\nRespond to this conversation:\n" + conversation.slice(conversationIndex).map((line) => {
                if (line.type === "user") {
                    return "\nUser: " + line.message
                } else {
                    return "\nStud: " + line.message
                }
            }) + "\nStud: [insert]"
        }
        else {
            prompt = prompt + "\nConversation for reference:\n" + conversation.map((line) => {
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
                        <TitleTypography>Processing Your Data...</TitleTypography>
                    </LoadingBox>
                </LoadingContainer>
            )
        }
    }

    return (
        <>
            <InnerBox id={"inner"}>
                <TitleBox>
                    <TitleTypography>Give Stud a Try</TitleTypography>
                </TitleBox>
                <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt}
                      dataProcessing={dataProcessing} fileName={fileName}/>
                <FileUpload setFileName={setFileName} fileName={fileName} dataProcessing={dataProcessing}
                            headers={dataHistory[dataIndex].headers} setDataHistory={setDataHistory}
                            entries={dataHistory[dataIndex].entries} setDataIndex={setDataIndex}/>
                <Script extendPrompt={extendPrompt} setScript={setScript} conversation={conversation} setDataProcessing={setDataProcessing}
                        setConversationIndex={setConversationIndex}/>
                <Run headers={dataHistory[dataIndex].headers}  entries={dataHistory[dataIndex].entries} script={script} fileName={fileName} setDataProcessing={setDataProcessing}
                     setDataIndex={setDataIndex} setDataHistory={setDataHistory} dataProcessing={dataProcessing} dataIndex={dataIndex} dataHistory={dataHistory}/>
            </InnerBox>
            <HandleLoading/>
        </>
    )
}