import {Box, Container, styled, Typography} from "@mui/material";
import {useState} from "react";
import Script from "@/public/components/Script";
import FileUpload from "@/public/components/FileUpload";
import Chat from "@/public/components/Chat";
import NavBar from "@/public/components/NavBar";

const OuterBox = styled(Box) ({
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.3125rem",
    background: "#EEE",
});

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

export default function Home() {
    const [conversation, setConversation] = useState([]);
    const [csvData, setCsvData] = useState("")
    const [fileName, setFileName] = useState("")

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

    return (
        <OuterBox>
            <NavBar/>
            <InnerBox>
                <TitleBox>
                    <TitleTypography>Give Stud a Try</TitleTypography>
                </TitleBox>
                <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt}/>
                <FileUpload setCsvData={setCsvData} setFileName={setFileName} fileName={fileName}/>
                <Script extendPrompt={extendPrompt}/>
            </InnerBox>
        </OuterBox>
    )
}
