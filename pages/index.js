import {Button, Container, Input} from "@mui/material";
import {useState} from "react";
import TemplateTable from "@/public/components/TemplateTable";
import Warnings from "@/public/components/Warnings";
import { saveAs } from 'file-saver';

function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
}


export default function Home() {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [warnings, setWarnings] = useState([]);

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                resolve(content);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    const sendToServer = async () => {
        const content = await readFile(file);
        const obj = {
            name: file.name.split(".").shift(),
            ext: file.name.split(".").pop(),
            content: content,
            template: rows
        }
        const req = JSON.stringify(obj);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: req
        })
            .then(response => response.json())
            .then(data => {
                setWarnings(data.warnings)
                downloadFile(data.content, data.fileName)
            });
    };

    return (
        <Container>
            <TemplateTable rows={rows} setRows={setRows}/>
            <Input type={"file"} onChange={(event) => setFile(event.target.files[0])}/>
            <Button onClick={sendToServer}>Send</Button>
            <Warnings warnings={warnings}/>
        </Container>
    )
}
