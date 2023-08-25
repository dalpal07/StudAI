import {useEffect, useState} from "react";
import NoFileContent from "../../../public/components/file-upload/NoFileContent";
import FileContent from "../../../public/components/file-upload/FileContent";
import {UploadBoxButton} from "../../../public/components/common/Buttons";
import {useRouter} from "next/router";

async function fetchFileContent(fileName) {
    const response = await fetch(`/api/user/files/get-file-content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({fileName: fileName, id: "sample"}),
    });
    if (response.status === 200) {
        const data = await response.json();
        return data.headers.join(",") + "\n" + data.entries.map((entry) => entry.join(",")).join("\n");
    }
    else {
        alert("Failed to fetch file content")
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
                props.handleFileChange(simulatedFile);
            });
        }
        router.replace(router.pathname, undefined, { shallow: true });
    }
    const setNewFile = (file) => {
        props.handleFileChange(file)
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
                <NoFileContent handleFileChange={props.handleFileChange} isDraggingOver={isDraggingOver} disabled={props.disabled}/>
                :
                <FileContent headers={props.headers} entries={props.entries}/>
            }
        </UploadBoxButton>
    )
}