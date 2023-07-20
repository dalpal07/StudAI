import {useEffect, useState} from "react";
import { saveAs } from 'file-saver';

function downloadFile(content, fileName) {
    // if fileName extension is not csv, change to csv
    if (fileName.split(".")[1] !== "csv") {
        fileName = fileName.split(".")[0] + ".csv"
    }
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
}

export default function Run(props) {
    const [localScript, setLocalScript] = useState("")
    const handleClick = async () => {
        const headers = await props.getFileHeaders()
        const entries = await props.getFileEntries()
        const response = await fetch("/api/run", {
            method: "POST",
            body: JSON.stringify({
                generatedFunction: props.script,
                headers: headers,
                entries: entries
            })
        })
        props.setDataProcessing(false)
        if (response.status === 200) {
            const data = await response.json()
            downloadFile(data.content, props.fileName)
        }
        else {
            alert("An error occurred while processing your request. Please try again. Contact Stud if the problem persists.")
        }
    }
    useEffect(() => {
        if (props.script !== "" && props.script !== localScript) {
            setLocalScript(props.script)
            handleClick()
        }
    }, [props.script])
}