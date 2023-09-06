import {BoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import Image from "next/image";
import {HomeMiddleBox} from "@/public/components/common/Boxes";

export default function HomeMiddle() {
    return (
        <HomeMiddleBox>
            <BoldText size={"0.875rem"}>Welcome to</BoldText>
            <HeightSpacer height={"1.12rem"}/>
            <Image priority={true} src={"/images/FullLogo.svg"} alt={"logo"} width={362} height={77}/>
            <HeightSpacer height={"1.12rem"}/>
            <BoldText size={"1.125rem"}>Your Personal Data Maid</BoldText>
        </HomeMiddleBox>
    )
}