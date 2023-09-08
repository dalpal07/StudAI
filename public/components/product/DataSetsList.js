import {
    ContextMenuBox,
    DataBox,
    DataSetsListBox, MobileDataBox, MobileDataSetsBox, MobileDataSetsListBox,
    StackColumnBox, StackRowBox,
} from "@/public/components/common/Boxes";
import {BoldTextNoWrap, ItalicText, Text} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import DataBottom from "@/public/components/product/DataBottom";
import {useDispatch, useSelector} from "react-redux";
import {openFile, renameFile, selectCurrentFileName, selectFileEdited, selectSaved} from "@/slices/fileSlice";
import {HiddenButton} from "@/public/components/common/Buttons";
import {useEffect, useRef, useState} from "react";
import {selectSub} from "@/slices/userSlice";
import {Box, Input, useMediaQuery} from "@mui/material";

export default function DataSetsList() {
    const currentFileName = useSelector(selectCurrentFileName);
    const saved = useSelector(selectSaved);
    const sub = useSelector(selectSub);
    const dispatch = useDispatch();
    const contextMenuRef = useRef(null);
    const [contextMenuFileIndex, setContextMenuFileIndex] = useState(-1);
    const [rename, setRename] = useState("");
    const [newName, setNewName] = useState("");
    const isMobile = useMediaQuery('(max-width:600px)');

    function showContextMenu(event, index) {
        setContextMenuFileIndex(index);
        event.preventDefault(); // Prevent the default context menu
        const contextMenu = document.getElementById(`context-menu`);
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        document.addEventListener("click", handleClickOutside);
    }
    function hideContextMenu() {
        const contextMenu = document.getElementById(`context-menu`);
        contextMenu.style.display = 'none';
    }
    function handleAction(action) {
        if (contextMenuFileIndex === -1) {
            return;
        }
        if (action === "open") {
            const fileName = saved[contextMenuFileIndex].name;
            dispatch(openFile({fileName: fileName, id: sub}));
        }
        if (action === "rename") {
            console.log("renaming...");
            setRename(saved[contextMenuFileIndex].name);
        }
        hideContextMenu();
    }
    function handleClickOutside(event) {
        const contextMenu = contextMenuRef.current;
        if (contextMenu && !contextMenu.contains(event.target)) {
            contextMenu.style.display = 'none';
            document.removeEventListener("click", handleClickOutside);
        }
    }

    if (isMobile) {
        return (
            <>
                <MobileDataSetsListBox>
                    {saved.map((dataSet, index) => {
                        return (
                            <StackRowBox key={index}>
                                <MobileDataBox
                                    onContextMenu={(e) => showContextMenu(e, index)}
                                    greenborder={(dataSet.name === currentFileName).toString()}
                                    onClick={() => dispatch(openFile({fileName: dataSet.name, id: sub}))}
                                >
                                    {
                                        rename === dataSet.name ?
                                            <Input style={{
                                                width: "100%",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                border: "1px solid #C5C5C5",
                                            }}
                                                   type={"text"}
                                                   disableUnderline={true}
                                                   autoFocus={true}
                                                   defaultValue={rename}
                                                   onChange={(e) => setNewName(e.target.value)}
                                                   onKeyDown={(e) => {
                                                       if (e.key === "Enter") {
                                                           if (newName === "" || newName === rename) {
                                                               setRename("");
                                                               setNewName("");
                                                               return;
                                                           }
                                                           console.log("enter");
                                                           dispatch(renameFile({id: sub, oldFileName: rename, newFileName: newName}));
                                                           setRename("");
                                                           setNewName("");
                                                       }
                                                   }}
                                            />
                                            :
                                            <BoldTextNoWrap>{dataSet.name}</BoldTextNoWrap>
                                    }
                                    <HeightSpacer height={"0.25rem"}/>
                                    <ItalicText size={"0.75rem"}>Last updated: {dataSet.lastUpdated}</ItalicText>
                                    <HeightSpacer height={"0.25rem"}/>
                                    <DataBottom name={dataSet.name}/>
                                </MobileDataBox>
                                <WidthSpacer width={"0.25rem"}/>
                            </StackRowBox>
                        )
                    })}
                </MobileDataSetsListBox>
                <ContextMenuBox id={`context-menu`} ref={contextMenuRef}>
                    <HiddenButton onClick={() => handleAction("open")}>
                        <Text size={"0.875rem"}>Open in viewer</Text>
                    </HiddenButton>
                    <HeightSpacer height={"0.25rem"}/>
                    <Box style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#C5C5C5",
                    }}/>
                    <HeightSpacer height={"0.25rem"}/>
                    <HiddenButton onClick={() => handleAction("rename")}>
                        <Text size={"0.875rem"}>Rename</Text>
                    </HiddenButton>
                </ContextMenuBox>
            </>
        )
    }

    return (
        <>
            <DataSetsListBox>
                {saved.map((dataSet, index) => {
                    return (
                        <StackColumnBox key={index}>
                            <DataBox
                                onContextMenu={(e) => showContextMenu(e, index)}
                                greenborder={(dataSet.name === currentFileName).toString()}
                                onClick={() => dispatch(openFile({fileName: dataSet.name, id: sub}))}
                            >
                                {
                                    rename === dataSet.name ?
                                        <Input style={{
                                            width: "100%",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            border: "1px solid #C5C5C5",
                                        }}
                                            type={"text"}
                                            disableUnderline={true}
                                            autoFocus={true}
                                            defaultValue={rename}
                                            onChange={(e) => setNewName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (newName === "" || newName === rename) {
                                                        setRename("");
                                                        setNewName("");
                                                        return;
                                                    }
                                                    console.log("enter");
                                                    dispatch(renameFile({id: sub, oldFileName: rename, newFileName: newName}));
                                                    setRename("");
                                                    setNewName("");
                                                }
                                            }}
                                        />
                                        :
                                        <BoldTextNoWrap>{dataSet.name}</BoldTextNoWrap>
                                }
                                <HeightSpacer height={"0.25rem"}/>
                                <ItalicText size={"0.75rem"}>Last updated: {dataSet.lastUpdated}</ItalicText>
                                <HeightSpacer height={"0.25rem"}/>
                                <DataBottom name={dataSet.name}/>
                            </DataBox>
                            <HeightSpacer height={"0.25rem"}/>
                        </StackColumnBox>
                    )
                })}
            </DataSetsListBox>
            <ContextMenuBox id={`context-menu`} ref={contextMenuRef}>
                <HiddenButton onClick={() => handleAction("open")}>
                    <Text size={"0.875rem"}>Open in viewer</Text>
                </HiddenButton>
                <HeightSpacer height={"0.25rem"}/>
                <Box style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#C5C5C5",
                }}/>
                <HeightSpacer height={"0.25rem"}/>
                <HiddenButton onClick={() => handleAction("rename")}>
                    <Text size={"0.875rem"}>Rename</Text>
                </HiddenButton>
            </ContextMenuBox>
        </>
    )
}