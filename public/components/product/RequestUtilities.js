import {GreenButton} from "@/public/components/common/Buttons";
import {WhiteBoldText} from "@/public/components/common/Typographies";
import {WidthFlexSpacer} from "@/public/components/common/Spacers";
import {RequestUtilitiesBox} from "@/public/components/common/Boxes";
import {selectDisabled} from "@/slices/dataSlice";
import {useSelector} from "react-redux";
import {selectCurrentFileName} from "@/slices/fileSlice";

export default function RequestUtilities(props) {
    const currentFileName = useSelector(selectCurrentFileName);
    const disabled = useSelector(selectDisabled) || props.input === "" || !currentFileName;

    return (
        <RequestUtilitiesBox>
            <WidthFlexSpacer/>
            <GreenButton onClick={props.handleSendButtonClick} disabled={disabled}>
                <WhiteBoldText size={"0.875rem"}>Send</WhiteBoldText>
            </GreenButton>
        </RequestUtilitiesBox>
    )
}