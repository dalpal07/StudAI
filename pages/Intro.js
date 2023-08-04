import Image from "next/image";
import { BoldText } from "/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {GreenButton} from "@/public/components/common/Buttons";
import {InnerBox} from "@/public/components/common/Boxes";
import {HiddenHref} from "@/public/components/common/Miscellaneous";

export default function Intro() {
    return (
        <InnerBox>
            <BoldText size={"1.125rem"}>Welcome to</BoldText>
            <HeightSpacer height={"0.85rem"}/>
            <Image src={"./images/FullLogo.svg"} alt={"StudAI Logo"} width={361.9} height={77}/>
            <HeightSpacer height={"1.35rem"}/>
            <BoldText size={"1.75rem"}>Your Personal Data Maid</BoldText>
            <HeightSpacer height={"4.125rem"}/>
            <HiddenHref href="/api/auth/login">
                <GreenButton size={"1.125rem"} padding={"0.25rem 1.5rem"}>
                    See what Stud can do
                </GreenButton>
            </HiddenHref>
        </InnerBox>
    )
}