import {OverlayBox, OverlayContainer, Spinner, StackRowBox} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";
import {DefaultButton, UndoRedoButton} from "@/public/components/common/Buttons";
import {HeightFlexSpacer, HeightSpacer, WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import CloseIcon from "@mui/icons-material/Close"

export default function Loading(props) {
    const handleCancel = () => {
        props.setDataProcessing(false)
        props.setRequestCancelled(true)
    }

    if (props.dataProcessing) {
        return (
            <OverlayContainer>
                <OverlayBox>
                    <UndoRedoButton style={{position: "absolute", right: 10, top: 10}} onClick={handleCancel}>
                        <CloseIcon/>
                    </UndoRedoButton>
                    <Spinner/>
                    <BoldText size={"1.5rem"}>Processing Your Data...</BoldText>
                </OverlayBox>
            </OverlayContainer>
        )
    }
}