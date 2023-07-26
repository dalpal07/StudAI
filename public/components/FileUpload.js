import {useState} from "react";
import { read, utils } from 'xlsx';
import NoFileContent from "@/public/components/NoFileContent";
import FileContent from "@/public/components/FileContent";
import {UploadBoxButton} from "@/public/components/common/Buttons";

function splitLine(row) {
    let entries = []
    let entry = ""
    let inQuotes = false
    for (let i = 0; i < row.length; i++) {
        if (row[i] === "\"") {
            inQuotes = !inQuotes
        }
        if (row[i] === "," && !inQuotes) {
            entries.push(entry)
            entry = ""
        } else {
            entry = entry + row[i]
        }
    }
    entries.push(entry)
    return entries
}
function getFileHeaders(csvData) {
    let headers = []
    let lines = csvData.split("\n")
    if (lines.length > 0) {
        let headerLine = lines[0]
        headers = splitLine(headerLine)
        for (let i = 0; i < headers.length; i++) {
            headers[i] = headers[i].trim()
        }
    }
    console.log(headers)
    return headers
}
function getFileEntries(csvData) {
    let entries = []
    let lines = csvData.split("\n")
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i]
        let entry = splitLine(line)
        for (let j = 0; j < entry.length; j++) {
            entry[j] = entry[j].trim()
        }
        entries.push(entry)
    }
    console.log(entries)
    return entries
}

export default function FileUpload(props) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

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