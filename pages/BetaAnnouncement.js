import Image from "next/image";
import { BoldText } from "/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {GreenButton} from "@/public/components/common/Buttons";
import {InnerBox} from "@/public/components/common/Boxes";

export default function BetaAnnouncement() {
    return (
        <InnerBox>
            <BoldText size={"3rem"}>Get pumped for Beta</BoldText>
            <HeightSpacer size={"1rem"}/>
            <BoldText size={"1.5rem"}>Coming September 2023</BoldText>
        </InnerBox>
    )
}