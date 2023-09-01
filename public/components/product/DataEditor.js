import {
    DataEditorBox,
} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import RequestArea from "@/public/components/product/RequestArea";
import ViewDataArea from "@/public/components/product/ViewDataArea";

export default function DataEditor() {

    return (
        <DataEditorBox>
            <BoldText size={"1.5rem"}>Data Editor</BoldText>
            <HeightSpacer height={"1.75rem"}/>
            <RequestArea/>
            <HeightSpacer height={"2rem"}/>
            <ViewDataArea/>
        </DataEditorBox>
    )
}