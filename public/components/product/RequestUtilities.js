import {DefaultButton, GreenButton} from "@/public/components/common/Buttons";
import {BoldText, WhiteBoldText} from "@/public/components/common/Typographies";
import {WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {RequestUtilitiesBox} from "@/public/components/common/Boxes";
import {sendRequest} from "@/slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentFileEntries, selectCurrentFileHeaders, selectCurrentFileName} from "@/slices/fileSlice";

export default function RequestUtilities(props) {
    const currentFileName = useSelector(selectCurrentFileName);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    const dispatch = useDispatch();
    const handleSendButtonClick = async () => {
        if (props.input === "") {
            return
        }
        dispatch(sendRequest({
            request: props.input,
            headers: currentFileHeaders,
            entries: currentFileEntries,
            fileName: currentFileName
        }))
        setInput("")
    }
    return (
        <RequestUtilitiesBox>
            <DefaultButton>
                <BoldText size={"0.875rem"}>Previous requests</BoldText>
            </DefaultButton>
            <WidthSpacer width={"0.75rem"}/>
            <DefaultButton>
                <BoldText size={"0.875rem"}>Help</BoldText>
            </DefaultButton>
            <WidthFlexSpacer/>
            <GreenButton>
                <WhiteBoldText size={"0.875rem"} onClick={handleSendButtonClick}>Send</WhiteBoldText>
            </GreenButton>
        </RequestUtilitiesBox>
    )
}