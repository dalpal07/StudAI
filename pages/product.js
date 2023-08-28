import FileUpload from "../public/components/file-upload/FileUpload";
import Script from "../public/components/Script";
import {useEffect, useState} from "react";
import Run from "../public/components/Run";
import {HelpBox, InnerBox2, OuterBox, StackColumnBox, StackRowBox} from "../public/components/common/Boxes";
import {HeightSpacer, WidthFlexSpacer, WidthSpacer} from "../public/components/common/Spacers";
import Loading from "../public/components/conditionals/Loading";
import Verify from "../public/components/conditionals/Verify";
import {useRouter} from "next/router";
import NavBar from "../public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import Footer from "../public/components/Footer";
import LowerChat from "../public/components/chat/LowerChat";
import AbortController from 'abort-controller';
import {BoldText} from "../public/components/common/Typographies";
import {DefaultButton} from "public/components/common/Buttons";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "public/functions/ExtractFileData";

async function getFiles(user) {
    const response = await fetch("/api/user/files/get-file-names", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: user.sub}),
    });
    if (response.status === 200) {
        const data = await response.json();
        return data.fileNames;
    } else {
        return null;
    }
}

async function fetchFileContent(fileName, id) {
    const response = await fetch(`/api/user/files/get-file-content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({fileName: fileName, id: id}),
    });
    if (response.status === 200) {
        const data = await response.json();
        let headers = data.headers;
        let entries = data.entries;
        let content = "";
        for (let i = 0; i < data.headers.length; i++) {
            if (headers[i].includes(",") && headers[i][0] !== "\"") {
                headers[i] = "\"" + headers[i] + "\"";
            }
        }
        for (let i = 0; i < entries.length; i++) {
            for (let j = 0; j < entries[i].length; j++) {
                if (entries[i][j].includes(",") && entries[i][j][0] !== "\"") {
                    entries[i][j] = "\"" + entries[i][j] + "\"";
                }
            }
        }
        return headers.join(",") + "\n" + entries.map((entry) => entry.join(",")).join("\n");
    }
    else {
        alert("Failed to fetch file content")
    }
}

export default function Product() {
    const [req, setReq] = useState(null)
    const [dataHistory, setDataHistory] = useState([{headers: [], entries: [], prev: null, next: null, request: null}])
    const [dataIndex, setDataIndex] = useState(0)
    const [fileName, setFileName] = useState("")
    const [script, setScript] = useState("")
    const [dataProcessing, setDataProcessing] = useState(false)
    const [verifyReplaceFile, setVerifyReplaceFile] = useState(false)
    const [verifyClearFile, setVerifyClearFile] = useState(false)
    const [replaceFileVerified, setReplaceFileVerified] = useState(null)
    const [clearFileVerified, setClearFileVerified] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const { user, isLoading, error } = useUser();
    const router = useRouter();
    const [isPaid, setIsPaid] = useState(null);
    const [requests, setRequests] = useState(0);
    const [type, setType] = useState("");

    const [loadFiles, setLoadFiles] = useState(true);
    const [files, setFiles] = useState([]);
    const [extraFiles, setExtraFiles] = useState([]);

    const [controller, setController] = useState(new AbortController());

    function openFile(fileName) {
        fetchFileContent(fileName, user.sub).then((content) => {
            const simulatedFile = new File([content], fileName, {type: "text/plain"});
            handleFileChange(simulatedFile);
        });
    }

    const handleFileChange = (file) => {
        let maxFileSizeBytes = 200 * 1024;
        if (file.size > maxFileSizeBytes) {
            alert("File is too large. Please upload a file less than " + (maxFileSizeBytes) / 1024 + "KB.")
            return
        }
        const fileExtension = getFileExtension(file.name);
        if (fileExtension === "csv") {
            setFileName(file.name)
            readCsvFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                setDataIndex(0)
                setDataHistory([{headers: headers, entries: entries, prev: null, next: null, request: "Original Dataset: " + file.name}])
            });
        }
        else if (fileExtension === "xlsx") {
            setFileName(file.name)
            console.log("xlsx")
            readXlsxFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                setDataIndex(0)
                setDataHistory([{headers: headers, entries: entries, prev: null, next: null, request: "Original Dataset: " + file.name}])
            });
        }
        else {
            alert("Invalid file type. Please upload a .csv or .xlsx file.")
        }
    }

    useEffect(() => {
        if (loadFiles && user) {
            getFiles(user).then((data) => {
                if (data) {
                    setFiles(data);
                }
                setLoadFiles(false);
            });
        }
    }, [loadFiles, user]);

    useEffect(() => {
        if (!isLoading && !isPaid) {
            if (user) {
                const apiUrl = `/api/user/`;
                const queryParams = new URLSearchParams({id: user.sub});
                fetch(`${apiUrl}get-product-access?${queryParams}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => response.json()).then((data) => {
                    if (data.access) {
                        setIsPaid(true);
                        setRequests(data.requests);
                        setType(data.type);
                    } else {
                        router.push("/payment");
                    }
                })
                // setIsPaid(true);
            } else {
                router.push("/api/auth/login");
            }
        }
    }, [user, isLoading, isPaid]);
    useEffect(() => {
        if (isPaid) {
            if (disabled) {
                document.getElementById("inner").style.setProperty("opacity", "0.5")
                document.body.style.setProperty("overflow", "hidden")
            } else {
                document.getElementById("inner").style.setProperty("opacity", "1")
                document.body.style.setProperty("overflow", "auto")
            }
        }
    }, [disabled])
    useEffect(() => {
        if (dataProcessing || verifyReplaceFile || verifyClearFile) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [dataProcessing, verifyReplaceFile, verifyClearFile])
    if (isPaid) {
        return (
            <OuterBox>
                <NavBar/>
                <InnerBox2 id={"inner"}>
                    <HeightSpacer height={"1rem"}/>
                    <StackRowBox style={{width: "100%", height: "100%"}}>
                        <HelpBox style={{width: "15rem"}}>
                            <BoldText size={"1.25rem"}>Saved Files:</BoldText>
                            <HeightSpacer height={"1.5rem"}/>
                            {files.length > 0 ? files.map((file, index) => {
                                return (
                                    <StackColumnBox key={index}>
                                        <StackRowBox style={{alignItems: "center"}}>
                                            <BoldText>{file}</BoldText>
                                            <WidthFlexSpacer/>
                                            <DefaultButton onClick={() => openFile(file)} style={{padding: "0"}}>Open</DefaultButton>
                                            <WidthSpacer width={"1rem"}/>
                                        </StackRowBox>
                                        <HeightSpacer height={"1rem"}/>
                                    </StackColumnBox>
                                )
                            }) : ""}
                        </HelpBox>
                        <WidthSpacer width={"2rem"}/>
                        <StackColumnBox style={{width: "100%", height: "100%"}}>
                            <Run headers={dataHistory[dataIndex].headers} entries={dataHistory[dataIndex].entries}
                                 script={script} fileName={fileName} setDataProcessing={setDataProcessing}
                                 setDataIndex={setDataIndex} setDataHistory={setDataHistory} disabled={disabled}
                                 dataIndex={dataIndex} dataHistory={dataHistory} setFileName={setFileName}
                                 verify={verifyClearFile} setVerify={setVerifyClearFile} clearFileVerified={clearFileVerified}
                                 setClearFileVerified={setClearFileVerified} setLoadFiles={setLoadFiles}
                                 setScript={setScript} setReq={setReq} req={req} controller={controller} extraFiles={extraFiles}/>
                            <HeightSpacer height={"1rem"}/>
                            <FileUpload setFileName={setFileName} fileName={fileName} disabled={disabled}
                                        headers={dataHistory[dataIndex].headers} setDataHistory={setDataHistory}
                                        entries={dataHistory[dataIndex].entries} setDataIndex={setDataIndex}
                                        verify={verifyReplaceFile} setVerify={setVerifyReplaceFile}
                                        replaceFileVerified={replaceFileVerified}
                                        setReplaceFileVerified={setReplaceFileVerified} handleFileChange={handleFileChange}/>
                            <HeightSpacer height={"1.5rem"}/>
                            <LowerChat disabled={disabled} fileName={fileName} setRequests={setRequests} setReq={setReq} files={files} setExtraFiles={setExtraFiles}/>
                            <HeightSpacer height={"1.5rem"}/>
                            <Script setScript={setScript} req={req} setRequests={setRequests} setReq={setReq}
                                    headers={dataHistory[dataIndex].headers}
                                    setDataProcessing={setDataProcessing}
                                    dataProcessing={dataProcessing} controller={controller}/>
                        </StackColumnBox>
                    </StackRowBox>
                    <HeightSpacer height={"1.5rem"}/>
                    <Footer/>
                </InnerBox2>
                <Loading dataProcessing={dataProcessing} setDataProcessing={setDataProcessing} controller={controller}
                         setController={setController} setReq={setReq}/>
                <Verify verify={verifyReplaceFile} setVerified={setReplaceFileVerified}
                        message={"Are you sure you want to replace this file? This action cannot be undone."}/>
                <Verify verify={verifyClearFile} setVerified={setClearFileVerified}
                        message={"Are you sure you want to clear this file? This action cannot be undone."}/>
            </OuterBox>
        )
    }
}