import FileUpload from "@/public/components/file-upload/FileUpload";
import Script from "@/public/components/Script";
import {useEffect, useState} from "react";
import Run from "@/public/components/Run";
import {HelpBox, InnerBox2, OuterBox, StackColumnBox, StackRowBox} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import Loading from "@/public/components/conditionals/Loading";
import NavBar from "@/public/components/NavBar";
import Footer from "@/public/components/Footer";
import LowerChat from "@/public/components/chat/LowerChat";
import {BoldText} from "@/public/components/common/Typographies";
import {DefaultButton} from "@/public/components/common/Buttons";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "@/public/functions/ExtractFileData";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import {useDispatch, useSelector} from "react-redux";
import {selectProductAccess} from "@/slices/subscriptionSlice";
import {selectSub} from "@/slices/userSlice";
import {selectSaved, setHistory} from "@/slices/fileSlice";
import {selectDataProcessing} from "@/slices/dataSlice";

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

function Product() {
    const dispatch = useDispatch();
    const productAccess = useSelector(selectProductAccess);
    const sub = useSelector(selectSub);
    const saved = useSelector(selectSaved);
    const dataProcessing = useSelector(selectDataProcessing);
    const [disabled, setDisabled] = useState(false)

    const [extraFiles, setExtraFiles] = useState([]);

    function openFile(fileName) {
        fetchFileContent(fileName, sub).then((content) => {
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
            readCsvFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                dispatch(setHistory({headers: headers, entries: entries, name: file.name}));
            });
        }
        else if (fileExtension === "xlsx") {
            console.log("xlsx")
            readXlsxFile(file).then((content) => {
                const headers = getFileHeaders(content)
                const entries = getFileEntries(content)
                dispatch(setHistory({headers: headers, entries: entries, name: file.name}));
            });
        }
        else {
            alert("Invalid file type. Please upload a .csv or .xlsx file.")
        }
    }

    useEffect(() => {
        if (document.getElementById("inner")) {
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
        if (dataProcessing) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [dataProcessing])
    if (productAccess) {
        return (
            <OuterBox>
                <NavBar/>
                <InnerBox2 id={"inner"}>
                    <HeightSpacer height={"1rem"}/>
                    <StackRowBox style={{width: "100%", height: "100%"}}>
                        <HelpBox style={{width: "15rem"}}>
                            <BoldText size={"1.25rem"}>Saved Files:</BoldText>
                            <HeightSpacer height={"1.5rem"}/>
                            {saved && saved.length > 0 ? saved.map((file, index) => {
                                return (
                                    <StackColumnBox key={index}>
                                        <StackRowBox style={{alignItems: "center"}}>
                                            <BoldText>{file}</BoldText>
                                            <WidthFlexSpacer/>
                                            <DefaultButton onClick={() => openFile(file)}
                                                           style={{padding: "0"}}>Open</DefaultButton>
                                            <WidthSpacer width={"1rem"}/>
                                        </StackRowBox>
                                        <HeightSpacer height={"1rem"}/>
                                    </StackColumnBox>
                                )
                            }) : ""}
                        </HelpBox>
                        <WidthSpacer width={"2rem"}/>
                        <StackColumnBox style={{width: "100%", height: "100%"}}>
                            <Run disabled={disabled}
                                 extraFiles={extraFiles}/>
                            <HeightSpacer height={"1rem"}/>
                            <FileUpload disabled={disabled}
                                        handleFileChange={handleFileChange}/>
                            <HeightSpacer height={"1.5rem"}/>
                            <LowerChat disabled={disabled} extraFiles={extraFiles}
                                       setExtraFiles={setExtraFiles}/>
                            <HeightSpacer height={"1.5rem"}/>
                            <Script/>
                        </StackColumnBox>
                    </StackRowBox>
                    <HeightSpacer height={"1.5rem"}/>
                    <Footer/>
                </InnerBox2>
                <Loading/>
            </OuterBox>
        )
    }
}

export default PageWrapper(Product, true, true);