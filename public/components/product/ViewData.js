import {BoldText, GrayBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {WhiteButton} from "@/public/components/common/Buttons";
import {ViewDataBox} from "@/public/components/common/Boxes";

export default function ViewData() {
    return (
        <ViewDataBox>
            <BoldText size={"1.125rem"}>View data set here</BoldText>
            <HeightSpacer height={"0.5rem"}/>
            <GrayBoldText size={"0.875rem"}>Drag and drop from ‘My data sets’ or</GrayBoldText>
            <HeightSpacer height={"1.5rem"}/>
            <WhiteButton>
                <BoldText size={"0.875rem"}>Select from my data sets</BoldText>
            </WhiteButton>
        </ViewDataBox>
    )
}