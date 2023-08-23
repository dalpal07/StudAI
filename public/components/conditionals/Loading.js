import {UndoRedoButton} from "../../../public/components/common/Buttons";
import CloseIcon from "@mui/icons-material/Close"
import {OverlayBox, OverlayContainer, Spinner} from "../../../public/components/common/Boxes";
import {BoldText} from "../../../public/components/common/Typographies";
import AbortController from 'abort-controller';

export default function Loading(props) {
    const handleCancel = () => {
        console.log("Canceling request")
        props.controller.abort()
        props.setController(new AbortController())
        props.setDataProcessing(false)
        props.setReq(null)
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