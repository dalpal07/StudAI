import {useDispatch, useSelector} from "react-redux";
import {cancelDataUpload, selectDataUpload} from "@/slices/dataSlice";
import {
    DataUploadBox,
    DragDropBox, JustifyRightBox,
    OverlayContainer, StackColumnBox, StackRowBox,
} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {DefaultButton, GreenButton, HiddenButton, WhiteButton} from "@/public/components/common/Buttons";
import {BoldText, BoldTextNoWrap, Text, WhiteBoldText} from "@/public/components/common/Typographies";
import {useState} from "react";
import {selectPendingFiles, uploadFile} from "@/slices/fileSlice";
import {Box} from "@mui/material";
import Image from "next/image";

export default function DataUpload() {
    const dataUpload = useSelector(selectDataUpload);
    const pendingFiles = useSelector(selectPendingFiles);
    const dispatch = useDispatch();
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            dispatch(uploadFile({file: files[i]}));
        }
    };

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
                                            }} key={file.name}>
                                                <WidthSpacer width={"0.15rem"}/>
                                                <StackRowBox key={file.fileName} style={{
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
                                                        <BoldTextNoWrap size={"0.875rem"}>{file.fileName}</BoldTextNoWrap>
                                                        <HeightSpacer height={"0.25rem"}/>
                                                        <Text size={"0.875rem"}>{file.fileSize}</Text>
                                                    </StackColumnBox>
                                                    <WidthSpacer width={"1.75rem"}/>
                                                    <HiddenButton>
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
                        <DefaultButton onClick={() => dispatch(cancelDataUpload())}>
                            <BoldText size={"0.875rem"}>Cancel</BoldText>
                        </DefaultButton>
                        {
                            pendingFiles.length > 0 &&
                            <>
                                <WidthSpacer width={"0.62rem"}/>
                                <GreenButton>
                                    <WhiteBoldText size={"0.875rem"}>Done</WhiteBoldText>
                                </GreenButton>
                            </>
                        }
                    </JustifyRightBox>
                </DataUploadBox>
            </OverlayContainer>
        )
    }
}