import {ArrowButton} from "@/public/components/common/Buttons";
import Image from "next/image";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {JustifyRightBox, StackRowBox} from "@/public/components/common/Boxes";
import {useDispatch, useSelector} from "react-redux";
import {
    nextHistoryIndex,
    prevHistoryIndex, selectCurrentFileName,
    selectDisabledNext,
    selectDisabledPrev,
} from "@/slices/fileSlice";
import {BoldTextNoWrap} from "@/public/components/common/Typographies";

export default function UndoRedo() {
    const currentFileName = useSelector(selectCurrentFileName);
    const disabledPrev = useSelector(selectDisabledPrev);
    const disabledNext = useSelector(selectDisabledNext);
    const dispatch = useDispatch();
    return (
        <StackRowBox style={{width: "100%", alignItems: "end"}}>
            <StackRowBox style={{
                width: "50%",
                justifyContent: "flex-start",
            }}>
                <BoldTextNoWrap size={"1.125rem"}>{currentFileName}</BoldTextNoWrap>
            </StackRowBox>
            <JustifyRightBox style={{width: "50%"}}>
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
            </JustifyRightBox>
        </StackRowBox>
    )
}