import {BoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import Image from "next/image";
import {HomeBottomBox} from "@/public/components/common/Boxes";

export default function HomeBottom() {
    return (
        <HomeBottomBox>
            <BoldText size={"0.875rem"}>See what stud can do</BoldText>
            <HeightSpacer height={"0.5rem"}/>
            <Image src={"./images/DownArrow.svg"} alt={"arrow"} width={27} height={15}/>
            <HeightSpacer height={"2.5rem"}/>
        </HomeBottomBox>
    )
}