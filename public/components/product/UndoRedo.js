import {ArrowButton} from "@/public/components/common/Buttons";
import Image from "next/image";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {UndoRedoBox} from "@/public/components/common/Boxes";
import {useDispatch, useSelector} from "react-redux";
import {
    nextHistoryIndex,
    prevHistoryIndex,
    selectDisabledNext,
    selectDisabledPrev,
} from "@/slices/fileSlice";

export default function UndoRedo() {
    const disabledPrev = useSelector(selectDisabledPrev);
    const disabledNext = useSelector(selectDisabledNext);
    const dispatch = useDispatch();
    return (
        <UndoRedoBox>
            <ArrowButton onClick={() => dispatch(prevHistoryIndex())} disabled={disabledPrev}>
                {
                    disabledPrev ?
                        <Image src={"./images/LeftArrowDisabled.svg"} alt={"LeftArrowDisabled"} width={17} height={21}/>
                        :
                        <Image src={"./images/LeftArrow.svg"} alt={"LeftArrow"} width={17} height={21}/>
                }
            </ArrowButton>
            <WidthSpacer width={"0.5rem"}/>
            <ArrowButton onClick={() => dispatch(nextHistoryIndex())} disabled={disabledNext}>
                {
                    disabledNext ?
                        <Image src={"./images/RightArrowDisabled.svg"} alt={"LeftArrowDisabled"} width={17} height={21}/>
                        :
                        <Image src={"./images/RightArrow.svg"} alt={"LeftArrow"} width={17} height={21}/>
                }
            </ArrowButton>
        </UndoRedoBox>
    )
}