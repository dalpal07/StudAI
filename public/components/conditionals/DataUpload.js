import {useDispatch, useSelector} from "react-redux";
import {selectDataUpload, setCancelled} from "@/slices/dataSlice";
import {
    DataUploadBox,
    DragDropBox,
    JustifyRightBox,
    OverlayContainer,
    StackColumnBox,
    StackRowBox,
} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {DefaultButton, GreenButton, HiddenButton, WhiteButton} from "@/public/components/common/Buttons";
import {BoldText, BoldTextNoWrap, Text, WhiteBoldText} from "@/public/components/common/Typographies";
import {useState} from "react";
import {Box} from "@mui/material";
import Image from "next/image";
import {generateRandomUUID} from "@/public/functions/GenerateRandomUUID";
import {selectSub} from "@/slices/userSlice";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "@/public/functions/ExtractFileData";
import {save, selectSaved} from "@/slices/fileSlice";

function formatBytes(bytes) {
    if (bytes < 1024) {
        return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
}

async function readFile(file) {
    const fileExtension = getFileExtension(file.name);
    let headers;
    let entries;
    if (fileExtension === "csv") {
        const content = await readCsvFile(file)
        headers = getFileHeaders(content)
        entries = getFileEntries(content)
    }
    else if (fileExtension === "xlsx") {
        const content = await readXlsxFile(file)
        headers = getFileHeaders(content)
        entries = getFileEntries(content)
    }
    if (headers && entries) {
        return {headers: headers, entries: entries};
    }
}

function getName(name, existingNames) {
    let fileName = name;
    let count = 0;
    for (let i = 0; i < existingNames.length; i++) {
        if (existingNames[i].name === fileName) {
            count++;
        }
    }
    if (count > 0) {
        fileName = fileName.substring(0, fileName.lastIndexOf(".")) + " (" + count + ")" + fileName.substring(fileName.lastIndexOf("."));
    }
    return fileName;
}

export default function DataUpload() {
    const dataUpload = useSelector(selectDataUpload);
    const dispatch = useDispatch();
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const saved = useSelector(selectSaved);
    const sub = useSelector(selectSub);
    const handleDone = () => {
        pendingFiles.forEach((file) => {
            readFile(file).then((result) => {
                const fileName = getName(file.name, saved);
                dispatch(save({
                    id: sub,
                    headers: result.headers,
                    entries: result.entries,
                    fileName: fileName,
                }))
            });
        });
        dispatch(setCancelled({cancelled: true}));
        setPendingFiles([]);
    }

    const handleRemoveFile = (key) => {
        const newPendingFiles = pendingFiles.filter((file) => file.key !== key);
        setPendingFiles(newPendingFiles);
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const files = event.dataTransfer.files;
        const newPendingFiles = [...pendingFiles];
        for (let i = 0; i < files.length; i++) {
            files[i].key = generateRandomUUID().toString();
            newPendingFiles.push(files[i]);
        }
        setPendingFiles(newPendingFiles);
    };

    const handleCancel = () => {
        dispatch(setCancelled({cancelled: true}));
        setPendingFiles([]);
    }

    if (dataUpload) {
        return (
            <OverlayContainer>
                <DataUploadBox>
                    <DragDropBox
                        isdraggingover={isDraggingOver.toString()}
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                            if (!isDraggingOver) {
                                setIsDraggingOver(true);
                            }
                        }}
                        onDragLeave={() => setIsDraggingOver(false)}
                    >
                        <BoldText size={"0.875rem"}>Drag and drop</BoldText>
                        <HeightSpacer height={"0.5rem"}/>
                        <Text size={"0.875rem"}>Or upload from your computer</Text>
                        <HeightSpacer height={"0.5rem"}/>
                        <WhiteButton>
                            <BoldText size={"0.875rem"}>Upload</BoldText>
                        </WhiteButton>
                    </DragDropBox>
                    {
                        pendingFiles.length > 0 ?
                            <>
                                <HeightSpacer height={"1.12rem"}/>
                                <Box style={{
                                    height: "0.0625rem",
                                    width: "100%",
                                    background: "var(--50-black, rgba(28, 26, 26, 0.50))",
                                }}></Box>
                                <HeightSpacer height={"1.12rem"}/>
                                <StackRowBox style={{width: "100%", justifyContent: "flex-start"}}>
                                    <BoldText size={"0.875rem"}>My Uploads</BoldText>
                                </StackRowBox>
                                <HeightSpacer height={"0.75rem"}/>
                                <StackRowBox style={{
                                    padding: "0.5rem",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    alignItems: "center",
                                    borderRadius: "0.3125rem",
                                    background: "#F0F0F0",
                                    overflow: "scroll",
                                    whiteSpace: "nowrap",
                                }} id={"scrollable-files"}>
                                    {pendingFiles.map((file) => {
                                        return (
                                            <StackRowBox style={{
                                                marginLeft: file === pendingFiles[0] ? "auto" : "",
                                                marginBottom: "0.25rem",
                                            }} key={file.key}>
                                                <WidthSpacer width={"0.15rem"}/>
                                                <StackRowBox key={file.name} style={{
                                                    width: "10rem",
                                                    padding: "0.5rem 1.125rem",
                                                    alignItems: "center",
                                                    borderRadius: "0.3125rem",
                                                    border: "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
                                                    background: "var(--UI-white, #F9F9F9)",
                                                }}>
                                                    <StackColumnBox style={{
                                                        width: "9rem",
                                                    }}>
                                                        <BoldTextNoWrap size={"0.875rem"}>{file.name}</BoldTextNoWrap>
                                                        <HeightSpacer height={"0.25rem"}/>
                                                        <Text size={"0.875rem"}>{formatBytes(file.size)}</Text>
                                                    </StackColumnBox>
                                                    <WidthSpacer width={"1.75rem"}/>
                                                    <HiddenButton onClick={() => handleRemoveFile(file.key)}>
                                                        <Image src={"./images/Delete.svg"} alt={"delete"} width={10} height={12}/>
                                                    </HiddenButton>
                                                </StackRowBox>
                                            </StackRowBox>
                                        )
                                    })}
                                </StackRowBox>
                                <HeightSpacer height={"1.12rem"}/>
                            </>
                            :
                            <HeightSpacer height={"0.75rem"}/>
                    }
                    <JustifyRightBox>
                        <DefaultButton onClick={() => handleCancel()}>
                            <BoldText size={"0.875rem"}>Cancel</BoldText>
                        </DefaultButton>
                        {
                            pendingFiles.length > 0 &&
                            <>
                                <WidthSpacer width={"0.62rem"}/>
                                <GreenButton>
                                    <WhiteBoldText onClick={handleDone} size={"0.875rem"}>Done</WhiteBoldText>
                                </GreenButton>
                            </>
                        }
                    </JustifyRightBox>
                </DataUploadBox>
            </OverlayContainer>
        )
    }
}