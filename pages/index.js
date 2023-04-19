import {Button, Container, Input} from "@mui/material";
import {useState} from "react";
import TemplateTable from "@/public/components/TemplateTable";

export default function Home() {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);

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
            .then(data => data.fileName)
            .then(fileName => {
                window.open(`/uploads/${fileName}`)
            });
    };

    return (
        <Container>
            <TemplateTable rows={rows} setRows={setRows}/>
            <Input type={"file"} onChange={(event) => setFile(event.target.files[0])}/>
            <Button onClick={sendToServer}>Send</Button>
        </Container>
    )
}
