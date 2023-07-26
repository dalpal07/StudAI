import {useState} from "react";
import NoFileContent from "@/public/components/file-upload/NoFileContent";
import FileContent from "@/public/components/file-upload/FileContent";
import {UploadBoxButton} from "@/public/components/common/Buttons";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "@/public/functions/ExtractFileData";

export default function FileUpload(props) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const handleFileChange = (file) => {
        props.setFileName(file.name)
        const fileExtension = getFileExtension(file.name);
        if (fileExtension === "csv") {
            readCsvFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                props.setDataIndex(0)
                props.setDataHistory([{headers: headers, entries: entries, prev: null, next: null}])
            });
        }
        else if (fileExtension === "xlsx") {
            console.log("xlsx")
            readXlsxFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                props.setDataIndex(0)
                props.setDataHistory([{headers: headers, entries: entries, prev: null, next: null}])
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
    return (
        <UploadBoxButton
            isDraggingOver={isDraggingOver}
            onDrop={handleDrop}
            onDragOver={(event) => {
                if (!props.dataProcessing) {
                    event.preventDefault()
                    setIsDraggingOver(true)
                }
            }}
            onDragLeave={() => setIsDraggingOver(false)}
        >
            {props.fileName === "" ?
                <NoFileContent handleFileChange={handleFileChange} isDraggingOver={isDraggingOver} dataProcessing={props.dataProcessing}/>
                :
                <FileContent headers={props.headers} entries={props.entries}/>
            }
        </UploadBoxButton>
    )
}