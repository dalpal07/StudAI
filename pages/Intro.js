import Image from "next/image";
import { BoldText } from "/public/components/common/Typographies";
import {HeightSpacer} from "../public/components/common/Spacers";
import {GreenButton} from "../public/components/common/Buttons";
import {InnerBox} from "../public/components/common/Boxes";

export default function Intro() {
    return (
        <InnerBox>
            <BoldText size={"1.125rem"}>Welcome to</BoldText>
            <HeightSpacer height={"1.1rem"}/>
            <Image src={"./images/FullLogo.svg"} alt={"StudAI Logo"} width={400} height={72.42}/>
            <HeightSpacer height={"2rem"}/>
            <BoldText size={"1.75rem"}>Your Personal Data Maid</BoldText>
            <HeightSpacer height={"4.125rem"}/>
            <a href="/api/auth/login" style={{textDecoration: "none"}}>
                <GreenButton size={"1.125rem"} padding={"0.25rem 1.5rem"}>
                    See what Stud can do
                </GreenButton>
            </a>
        </InnerBox>
    )
}