import {Container} from "@mui/material";
import {useState} from "react";
import Script from "@/public/components/Script";
import FileUpload from "@/public/components/FileUpload";
import Chat from "@/public/components/Chat";

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
        <Container>
            <FileUpload setCsvData={setCsvData} setFileName={setFileName} fileName={fileName}/>
            <Chat conversation={conversation} setConversation={setConversation} extendPrompt={extendPrompt}/>
            <Script extendPrompt={extendPrompt}/>
        </Container>
    )
}
