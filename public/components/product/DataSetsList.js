import {
    ContextMenuBox,
    DataBox,
    DataSetsListBox,
    StackColumnBox,
} from "@/public/components/common/Boxes";
import {BoldTextNoWrap, ItalicText, Text} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import DataBottom from "@/public/components/product/DataBottom";
import {useDispatch, useSelector} from "react-redux";
import {openFile, selectCurrentFileName, selectFileEdited, selectSaved} from "@/slices/fileSlice";
import {HiddenButton} from "@/public/components/common/Buttons";
import {useRef, useState} from "react";
import {selectSub} from "@/slices/userSlice";

export default function DataSetsList() {
    const currentFileName = useSelector(selectCurrentFileName);
    const saved = useSelector(selectSaved);
    const sub = useSelector(selectSub);
    const dispatch = useDispatch();
    const contextMenuRef = useRef(null);
    const [contextMenuFileIndex, setContextMenuFileIndex] = useState(-1);

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
        hideContextMenu();
    }
    function handleClickOutside(event) {
        const contextMenu = contextMenuRef.current;
        if (contextMenu && !contextMenu.contains(event.target)) {
            contextMenu.style.display = 'none';
            document.removeEventListener("click", handleClickOutside);
        }
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
                                <BoldTextNoWrap>{dataSet.name}</BoldTextNoWrap>
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
            </ContextMenuBox>
        </>
    )
}