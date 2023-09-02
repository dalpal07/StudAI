import {DefaultButton} from "@/public/components/common/Buttons";
import {GrayBoldText} from "@/public/components/common/Typographies";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {
    save,
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
    const historyIndex = useSelector(selectHistoryIndex);
    const sub = useSelector(selectSub);
    const dispatch = useDispatch();
    return (
        <ViewDataUtilitiesBox>
            <DefaultButton>
                <GrayBoldText size={"0.875rem"}>Discard changes</GrayBoldText>
            </DefaultButton>
            <WidthSpacer width={"0.75rem"}/>
            <DefaultButton>
                <GrayBoldText size={"0.875rem" } onClick={() => dispatch(save({
                    id: sub,
                    headers: currentFileHeaders,
                    entries: currentFileEntries,
                    fileName: currentFileName,
                    indexSaved: historyIndex
                }))}>Save changes</GrayBoldText>
            </DefaultButton>
        </ViewDataUtilitiesBox>
    )
}