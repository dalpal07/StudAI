import {Container} from "@mui/material";
import {useState} from "react";
import Instruction from "@/public/components/Instruction";
import FileUpload from "@/public/components/FileUpload";
import Chat from "@/public/components/Chat";

export default function Home() {
    const [instruction, setInstruction] = useState("");
    return (
        <Container>
            {/*<Instruction instruction={instruction} setInstruction={setInstruction}/>*/}
            {/*<FileUpload instruction={instruction}/>*/}
            <Chat/>
        </Container>
    )
}
