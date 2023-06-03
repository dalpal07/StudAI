import {Box, Button, Input, styled, Typography} from "@mui/material";
import {useState} from "react";
import { saveAs } from 'file-saver';

const FileInput = styled(Input) ({
    display: 'none'
})

function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
}

export default function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const UploadBox = styled(Box) ({
        marginBottom: '1rem',
        alignItems: 'center',
        padding: '.5rem',
        width: 'fit-content',
        backgroundColor: isDraggingOver ? '#F5F5F5' : 'transparent'
    })

    const FileButton = styled(Button) ({
        display: 'inline-block',
        backgroundColor: isDraggingOver ? 'gray' : '#1976d2',
    })

    const FileTypography = styled(Typography) ({
        display: 'inline-block',
        marginLeft: '1rem',
        fontSize: '1.1rem',
        color: isDraggingOver ? 'gray' : 'black'
    })

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
            instruction: props.instruction
        }
        const req = JSON.stringify(obj);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: req
        })
            .then(response => response.json())
            .then(data => {
                downloadFile(data.content, data.fileName)
            });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setIsDraggingOver(false);
    };

    return (
        <Box>
            <UploadBox
                onDrop={handleDrop}
                onDragOver={(event) => {
                    event.preventDefault()
                    setIsDraggingOver(true)
                }}
                onDragLeave={() => setIsDraggingOver(false)}
            >
                <FileButton variant={"contained"}>
                    <label htmlFor="fileInput">
                        Choose a file
                        <FileInput
                            id="fileInput"
                            type={"file"}
                            onChange={(event) => setFile(event.target.files[0])}
                        />
                    </label>
                </FileButton>
                <FileTypography>{file? file.name : "No file selected"}</FileTypography>
            </UploadBox>
            <Button onClick={sendToServer} disabled={file === null}>Transform</Button>
        </Box>
    )
}