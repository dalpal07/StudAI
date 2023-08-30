import {UndoRedoButton} from "@/public/components/common/Buttons";
import CloseIcon from "@mui/icons-material/Close"
import {OverlayBox, OverlayContainer, Spinner} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";
import {useDispatch, useSelector} from "react-redux";
import {selectDataProcessing, setCancelled} from "@/slices/dataSlice";

export default function Loading(props) {
    const dataProcessing = useSelector(selectDataProcessing);
    const dispatch = useDispatch();

    if (dataProcessing) {
        return (
            <OverlayContainer>
                <OverlayBox>
                    <UndoRedoButton style={{position: "absolute", right: 10, top: 10}} onClick={() => dispatch(setCancelled({cancelled: true}))}>
                        <CloseIcon/>
                    </UndoRedoButton>
                    <Spinner/>
                    <BoldText size={"1.5rem"}>Processing Your Data...</BoldText>
                </OverlayBox>
            </OverlayContainer>
        )
    }
}