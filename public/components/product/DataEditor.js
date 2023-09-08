import {
    DataEditorBox, MobileDataEditorBox,
} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import RequestArea from "@/public/components/product/RequestArea";
import ViewDataArea from "@/public/components/product/ViewDataArea";
import {useMediaQuery} from "@mui/material";

export default function DataEditor() {
    const isMobile = useMediaQuery('(max-width:600px)');
    if (isMobile) {
        return (
            <MobileDataEditorBox>
                <BoldText size={"1.125rem"}>Data Editor</BoldText>
                <HeightSpacer height={"1rem"}/>
                <RequestArea/>
                <HeightSpacer height={"1rem"}/>
                <ViewDataArea/>
            </MobileDataEditorBox>
        )
    }
    return (
        <DataEditorBox>
            <HeightSpacer height={"1rem"}/>
            <BoldText size={"1.5rem"}>Data Editor</BoldText>
            <HeightSpacer height={"1.5rem"}/>
            <RequestArea/>
            <HeightSpacer height={"2rem"}/>
            <ViewDataArea/>
        </DataEditorBox>
    )
}