import {StackColumnBox, StackRowBox} from "@/public/components/common/Boxes";
import {BoldText, GrayBoldText, WhiteBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {TextareaAutosize} from "@mui/material";
import {useState} from "react";
import {ArrowButton, DefaultButton, GreenButton, WhiteButton} from "@/public/components/common/Buttons";
import {useSelector} from "react-redux";
import {selectDisabledNext, selectDisabledPrev} from "@/slices/fileSlice";
import Image from "next/image";

export default function DataEditor() {
    const [input, setInput] = useState("");
    const noInput = input === "";
    const disabledPrev = useSelector(selectDisabledPrev);
    const disabledNext = useSelector(selectDisabledNext);
    return (
        <StackColumnBox style={{
            padding: "0rem 1.125rem",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            alignItems: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
        }}>
            <BoldText size={"1.5rem"}>Data Editor</BoldText>
            <HeightSpacer height={"1.75rem"}/>
            <TextareaAutosize style={{
                width: "100%",
                height: "6.5rem",
                boxSizing: "border-box",
                padding: "1.125rem",
                borderRadius: "0.625rem",
                border: "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
                background: "#FEFEFE",
                resize: "none",
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontStyle: noInput ? "italic" : "normal",
                fontWeight: "500",
                lineHeight: "normal",
                color: noInput ? "rgba(28, 26, 26, 0.5)" : "var(--main-black, #1C1A1A)",
                overflowY: "auto",
            }}
                              placeholder={"Make a request to stud..."}
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
            />
            <HeightSpacer height={"0.75rem"}/>
            <StackRowBox style={{
                width: "100%",
                boxSizing: "border-box",
            }}>
                <DefaultButton>
                    <BoldText size={"0.875rem"}>Previous requests</BoldText>
                </DefaultButton>
                <WidthSpacer width={"0.75rem"}/>
                <DefaultButton>
                    <BoldText size={"0.875rem"}>Help</BoldText>
                </DefaultButton>
                <WidthFlexSpacer/>
                <GreenButton>
                    <WhiteBoldText size={"0.875rem"}>Send</WhiteBoldText>
                </GreenButton>
            </StackRowBox>
            <HeightSpacer height={"2rem"}/>
            <StackRowBox style={{
                width: "100%",
                boxSizing: "border-box",
                justifyContent: "flex-end",
            }}>
                <ArrowButton>
                    {
                        disabledPrev ?
                            <Image src={"./images/LeftArrowDisabled.svg"} alt={"LeftArrowDisabled"} width={17} height={21}/>
                            :
                            <Image src={"./images/LeftArrow.svg"} alt={"LeftArrow"} width={17} height={21}/>
                    }
                </ArrowButton>
                <WidthSpacer width={"0.5rem"}/>
                <ArrowButton>
                    {
                        false ?
                            <Image src={"./images/RightArrowDisabled.svg"} alt={"LeftArrowDisabled"} width={17} height={21}/>
                            :
                            <Image src={"./images/RightArrow.svg"} alt={"LeftArrow"} width={17} height={21}/>
                    }
                </ArrowButton>
            </StackRowBox>
            <HeightSpacer height={"0.75rem"}/>
            <StackColumnBox style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                flex: "1 0 0",
                alignSelf: "stretch",
                borderRadius: "0.3125rem",
                border: "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
                background: "#F0F0F0",
            }}>
                <BoldText size={"1.125rem"}>View data set here</BoldText>
                <HeightSpacer height={"0.5rem"}/>
                <GrayBoldText size={"0.875rem"}>Drag and drop from ‘My data sets’ or</GrayBoldText>
                <HeightSpacer height={"1.5rem"}/>
                <WhiteButton>
                    <BoldText size={"0.875rem"}>Select from my data sets</BoldText>
                </WhiteButton>
            </StackColumnBox>
            <HeightSpacer height={"0.75rem"}/>
            <StackRowBox style={{
                width: "100%",
                boxSizing: "border-box",
                justifyContent: "flex-end",
            }}>
                <DefaultButton>
                    <GrayBoldText size={"0.875rem"}>Discard changes</GrayBoldText>
                </DefaultButton>
                <WidthSpacer width={"0.75rem"}/>
                <DefaultButton>
                    <GrayBoldText size={"0.875rem"}>Save changes</GrayBoldText>
                </DefaultButton>
            </StackRowBox>
        </StackColumnBox>
    )
}