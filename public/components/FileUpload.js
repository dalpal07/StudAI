import {Box, Button, Input, styled, Typography} from "@mui/material";
import {useState} from "react";
import { read, utils } from 'xlsx';

const FileInput = styled(Input) ({
    display: 'none'
})

export default function FileUpload(props) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const UploadBox = styled(Box) ({
        marginTop: "1.5rem",
        display: "flex",
        height: "18.875rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        alignSelf: "stretch",
        borderRadius: "1.25rem",
        border: "2px dashed var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
        background: "#E3E3E3",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10) inset",
        backgroundColor: isDraggingOver ? '#F5F5F5' : 'transparent'
    })

    const TextBox = styled(Box)({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
    });

    const DragDropTypography = styled(Typography)({
        color: "var(--main-black, #3F3636)",
        fontFamily: "Inter",
        fontSize: "1.125rem",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
    });

    const DragDropSubTypography = styled(Typography)({
        color: "var(--main-black, #3F3636)",
        fontFamily: "Inter",
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        opacity: 0.5,
    });

    const FileButton = styled(Button) ({
        color: "white",
        display: "flex",
        padding: "0.5rem 1.5rem",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: isDraggingOver ? 'gray' : 'var(--main-green, #53B753)',
    })

    const FileTypography = styled(Typography) ({
        display: 'inline-block',
        fontSize: '1rem',
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
        if (!props.dataProcessing) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            handleFileChange(file)
            setIsDraggingOver(false);
        }
    };
    const handleUpload = (event) => {
        const file = event.target.files[0];
        handleFileChange(file)
    }
    const handleButtonClick = () => {
        // Trigger the click event on the hidden file input
        document.getElementById("fileInput").click();
    };

    return (
        <UploadBox
            onDrop={handleDrop}
            onDragOver={(event) => {
                if (!props.dataProcessing) {
                    event.preventDefault()
                    setIsDraggingOver(true)
                }
            }}
            onDragLeave={() => setIsDraggingOver(false)}
        >
            <TextBox>
                <DragDropTypography>Drag and drop messy data here</DragDropTypography>
                <DragDropSubTypography>Make sure your files are messy</DragDropSubTypography>
            </TextBox>
            <FileInput
                id="fileInput"
                type={"file"}
                onChange={handleUpload}
            />
            <FileButton htmlFor="fileInput" onClick={handleButtonClick} disabled={props.dataProcessing}>
                Upload Messy Data
            </FileButton>
            <FileTypography>{props.fileName !== "" ? props.fileName : "No file selected"}</FileTypography>
        </UploadBox>
    )
}