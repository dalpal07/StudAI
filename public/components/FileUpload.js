import {Box, Button, Input, styled, Typography} from "@mui/material";
import {useState} from "react";
import { read, utils } from 'xlsx';

const FileInput = styled(Input) ({
    display: 'none'
})

export default function FileUpload(props) {
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
    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
    };
    function readCsvFile(file) {
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
    function readXlsxFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const csv = utils.sheet_to_csv(worksheet);
                console.log(csv)
                resolve(csv);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
    const handleFileChange = (file) => {
        props.setFileName(file.name)
        const fileExtension = getFileExtension(file.name);
        if (fileExtension === "csv") {
            readCsvFile(file).then((content) => {
                props.setCsvData(content)
            });
        }
        else if (fileExtension === "xlsx") {
            console.log("xlsx")
            readXlsxFile(file).then((content) => {
                props.setCsvData(content)
            });
        }
        else {
            alert("Invalid file type. Please upload a .csv or .xlsx file.")
        }
    }
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileChange(file)
        setIsDraggingOver(false);
    };
    const handleUpload = (event) => {
        const file = event.target.files[0];
        handleFileChange(file)
    }

    return (
        <div>
            <h1>File</h1>
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
                            onChange={handleUpload}
                        />
                    </label>
                </FileButton>
                <FileTypography>{props.fileName !== "" ? props.fileName : "No file selected"}</FileTypography>
            </UploadBox>
        </div>
    )
}