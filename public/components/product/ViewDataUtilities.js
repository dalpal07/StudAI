import {DefaultButton} from "@/public/components/common/Buttons";
import {BoldText, GrayBoldText} from "@/public/components/common/Typographies";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {
    discardChanges,
    save, selectCurrentFileEdited,
    selectCurrentFileEntries,
    selectCurrentFileHeaders,
    selectCurrentFileName,
    selectHistoryIndex
} from "@/slices/fileSlice";
import {ViewDataUtilitiesBox} from "@/public/components/common/Boxes";
import {useDispatch, useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";

export default function ViewDataUtilities() {
    const currentFileName = useSelector(selectCurrentFileName);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    const currentFileEdited = useSelector(selectCurrentFileEdited);
    const historyIndex = useSelector(selectHistoryIndex);
    const sub = useSelector(selectSub);
    const dispatch = useDispatch();
    return (
        <ViewDataUtilitiesBox>
            <DefaultButton onClick={() => dispatch(discardChanges())} disabled={!currentFileEdited}>
                {
                    currentFileEdited ?
                        <BoldText size={"0.875rem"}>Discard changes</BoldText>
                        :
                        <GrayBoldText size={"0.875rem"}>Discard changes</GrayBoldText>
                }
            </DefaultButton>
            <WidthSpacer width={"0.75rem"}/>
            <DefaultButton onClick={() => dispatch(save({
                id: sub,
                headers: currentFileHeaders,
                entries: currentFileEntries,
                fileName: currentFileName,
                indexSaved: historyIndex
            }))} disabled={!currentFileEdited}>
                {
                    currentFileEdited ?
                        <BoldText size={"0.875rem"}>Save changes</BoldText>
                        :
                        <GrayBoldText size={"0.875rem"}>Save changes</GrayBoldText>
                }
            </DefaultButton>
        </ViewDataUtilitiesBox>
    )
}