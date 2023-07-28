import {OverlayBox, OverlayContainer, Spinner} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";

export default function Loading(props) {
    if (props.dataProcessing) {
        return (
            <OverlayContainer>
                <OverlayBox>
                    <Spinner/>
                    <BoldText size={"1.5rem"}>Processing Your Data...</BoldText>
                </OverlayBox>
            </OverlayContainer>
        )
    }
}