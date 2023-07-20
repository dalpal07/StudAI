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

export default function Product(props) {
    const [conversation, setConversation] = useState([])
    const [csvData, setCsvData] = useState("")
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
    async function getFileHeaders() {
        let headers = []
        let lines = csvData.split("\n")
        if (lines.length > 0) {
            let headerLine = lines[0]
            headers = headerLine.split(",")
            for (let i = 0; i < headers.length; i++) {
                headers[i] = headers[i].trim()
            }
        }
        console.log(headers)
        return headers
    }
    async function getFileEntries() {
        let entries = []
        let lines = csvData.split("\n")
        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                let line = lines[i]
                let entry = line.split(",")
                for (let j = 0; j < entry.length; j++) {
                    entry[j] = entry[j].trim()
                }
                entries.push(entry)
            }
        }
        console.log(entries)
        return entries
    }
    async function extendPrompt(prompt) {
        if (fileName !== "") {
            prompt = prompt + "\n\nHere is some information about the data:\n\nName: " + fileName + "\nHeaders: "
            let headers = await getFileHeaders()
            for (let i = 0; i < headers.length; i++) {
                if (i === headers.length - 1) {
                    prompt = prompt + headers[i]
                    break
                }
                prompt = prompt + headers[i] + ", "
            }
        }
        prompt = prompt + "\n\nRespond to this conversation:\n" + conversation.map((line) => {
            if (line.type === "user") {
                return "\nUser: " + line.message
            } else {
                return "\nStud: " + line.message
            }
        }) + "\nStud: [insert]"
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
                <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt} dataProcessing={dataProcessing}/>
                <FileUpload setCsvData={setCsvData} setFileName={setFileName} fileName={fileName} dataProcessing={dataProcessing}/>
                <Script extendPrompt={extendPrompt} setScript={setScript} conversation={conversation} setDataProcessing={setDataProcessing}/>
                <Run getFileHeaders={getFileHeaders} getFileEntries={getFileEntries} script={script} fileName={fileName} setDataProcessing={setDataProcessing}/>
            </InnerBox>
            <HandleLoading/>
        </>
    )
}