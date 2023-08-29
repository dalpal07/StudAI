import Image from "next/image";
import { BoldText } from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {BetaContainer, InnerBox} from "@/public/components/common/Boxes";
import {GreenButton} from "@/public/components/common/Buttons";
import {HiddenHref} from "@/public/components/common/Miscellaneous";

export default function BetaAnnouncement() {
    return (
        <InnerBox>
            <BetaContainer>
                <Image src={"./images/favicon.svg"} alt={"logo"} width={93} height={93}/>
                <WidthSpacer width={"0.75rem"}/>
                <BoldText size={"7rem"}>beta</BoldText>
            </BetaContainer>
            <HeightSpacer height={"1rem"}/>
            <BoldText size={"1.25rem"}>Coming September of 2023 🚀</BoldText>
            <HeightSpacer height={"4.125rem"}/>
            <HiddenHref href={"https://studai-waitlist.vercel.app"}>
                <GreenButton size={"1.125rem"}>Join the Waitlist</GreenButton>
            </HiddenHref>
        </InnerBox>
    )
}