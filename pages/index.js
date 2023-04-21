import {Container} from "@mui/material";
import {useState} from "react";
import TemplateTable from "@/public/components/TemplateTable";
import Warnings from "@/public/components/Warnings";
import FileUpload from "@/public/components/FileUpload";

export default function Home() {
    const [rows, setRows] = useState([]);
    const [warnings, setWarnings] = useState([]);

    return (
        <Container>
            <TemplateTable rows={rows} setRows={setRows}/>
            <FileUpload rows={rows} setWarnings={setWarnings}/>
            <Warnings warnings={warnings}/>
        </Container>
    )
}
