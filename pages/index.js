import {Container} from "@mui/material";
import {useState} from "react";
import Script from "@/public/components/Script";
import FileUpload from "@/public/components/FileUpload";
import Chat from "@/public/components/Chat";

export default function Home() {
    const [file, setFile] = useState(null);
    const [conversation, setConversation] = useState([]);sd
    return (
        <Container>
            <FileUpload file={file} setFile={setFile}/>
            <Chat file={file}/>
            <Script file={file} conversation={conversation}/>
        </Container>
    )
}
