import {BoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import Image from "next/image";
import {HomeBottomBox, StackColumnBox} from "@/public/components/common/Boxes";
import {HiddenHref} from "@/public/components/common/Miscellaneous";
import {HiddenButton} from "@/public/components/common/Buttons";

export default function HomeBottom(props) {
    return (
        <HomeBottomBox>
            <HiddenButton onClick={() => props.scrollPage(1)}>
                <StackColumnBox style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}>
                    <BoldText size={"0.875rem"}>See what stud can do</BoldText>
                    <HeightSpacer height={"0.5rem"}/>
                    <Image src={"./images/DownArrow.svg"} alt={"arrow"} width={27} height={15}/>
                </StackColumnBox>
            </HiddenButton>
            <HeightSpacer height={"2.5rem"}/>
        </HomeBottomBox>
    )
}