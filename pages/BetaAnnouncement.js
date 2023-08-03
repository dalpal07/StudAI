import Image from "next/image";
import { BoldText } from "/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {DownloadContainer, InnerBox} from "@/public/components/common/Boxes";

export default function BetaAnnouncement() {
    return (
        <InnerBox>
            <DownloadContainer>
                <Image src={"./images/favicon.svg"} alt={"logo"} width={70} height={70}/>
                <WidthSpacer width={"1rem"}/>
                <BoldText size={"5rem"}>beta</BoldText>
            </DownloadContainer>
            <BoldText size={"1.5rem"}>Coming September 2023</BoldText>
        </InnerBox>
    )
}