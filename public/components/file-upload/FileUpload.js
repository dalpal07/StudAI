import {useEffect, useState} from "react";
import NoFileContent from "@/public/components/file-upload/NoFileContent";
import FileContent from "@/public/components/file-upload/FileContent";
import {UploadBoxButton} from "@/public/components/common/Buttons";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectCurrentFileName} from "@/slices/fileSlice";

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
    const router = useRouter();
    const {query} = router;
    const currentFileName = useSelector(selectCurrentFileName);

    if (query && query.fileName) {
        if (!currentFileName) {
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
            setNewFile(file);
        }
    };
    return (
        <UploadBoxButton
            isDraggingOver={isDraggingOver}
            onDrop={handleDrop}
            onDragOver={(event) => {
                event.preventDefault()
                if (!isDraggingOver) {
                    console.log("dragging over")
                    setIsDraggingOver(true)
                }
            }}
            onDragLeave={() => setIsDraggingOver(false)}
        >
            {!currentFileName ?
                <NoFileContent handleFileChange={props.handleFileChange} isDraggingOver={isDraggingOver} disabled={props.disabled}/>
                :
                <FileContent/>
            }
        </UploadBoxButton>
    )
}