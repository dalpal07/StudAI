import {useEffect, useState} from "react";
import NoFileContent from "../../../public/components/file-upload/NoFileContent";
import FileContent from "../../../public/components/file-upload/FileContent";
import {UploadBoxButton} from "../../../public/components/common/Buttons";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "../../../public/functions/ExtractFileData";
import {useRouter} from "next/router";

const maxFileSizeBytes = 200 * 1024;

async function fetchFileContent(fileName) {
    const response = await fetch(`/api/user/files/get-file-content?id=sample&fileName=${fileName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.status === 200) {
        const data = await response.json();
        return data.headers.join(",") + "\n" + data.entries.map((entry) => entry.join(",")).join("\n");
    }
}

export default function FileUpload(props) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [tempFile, setTempFile] = useState(null);
    const router = useRouter();
    const {query} = router;

    if (query && query.fileName) {
        if (props.fileName === "") {
            fetchFileContent(query.fileName).then((content) => {
                const simulatedFile = new File([content], query.fileName, {type: "text/plain"});
                setNewFile(simulatedFile);
            });
        }
        router.replace(router.pathname, undefined, { shallow: true });
    }

    const handleFileChange = (file) => {
        if (file.size > maxFileSizeBytes) {
            alert("File is too large. Please upload a file less than " + (maxFileSizeBytes) / 1024 + "KB.")
            return
        }
        const fileExtension = getFileExtension(file.name);
        if (fileExtension === "csv") {
            props.setFileName(file.name)
            readCsvFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                props.setDataIndex(0)
                props.setDataHistory([{headers: headers, entries: entries, prev: null, next: null, request: "Original Dataset: " + file.name}])
            });
        }
        else if (fileExtension === "xlsx") {
            props.setFileName(file.name)
            console.log("xlsx")
            readXlsxFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                props.setDataIndex(0)
                props.setDataHistory([{headers: headers, entries: entries, prev: null, next: null, request: "Original Dataset: " + file.name}])
            });
        }
        else {
            alert("Invalid file type. Please upload a .csv or .xlsx file.")
        }
    }
    const setNewFile = (file) => {
        handleFileChange(file)
        setIsDraggingOver(false);
    }
    const handleDrop = (event) => {
        if (!props.disabled) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (props.fileName === "") {
                setNewFile(file);
            }
            else {
                setTempFile(file)
                props.setVerify(true)
            }
        }
    };
    useEffect(() => {
        if (props.replaceFileVerified) {
            props.setVerify(false)
            props.setReplaceFileVerified(null)
            setNewFile(tempFile)
        }
        else if (props.replaceFileVerified === false) {
            props.setVerify(false)
            props.setReplaceFileVerified(null)
        }
    }, [props.replaceFileVerified])
    return (
        <UploadBoxButton
            isDraggingOver={isDraggingOver}
            onDrop={handleDrop}
            onDragOver={(event) => {
                if (!props.disabled) {
                    event.preventDefault()
                    setIsDraggingOver(true)
                }
            }}
            onDragLeave={() => setIsDraggingOver(false)}
        >
            {props.fileName === "" ?
                <NoFileContent handleFileChange={handleFileChange} isDraggingOver={isDraggingOver} disabled={props.disabled}/>
                :
                <FileContent headers={props.headers} entries={props.entries}/>
            }
        </UploadBoxButton>
    )
}