import {Box, Button, styled} from "@mui/material";
import Image from "next/image";
import { BoldText, WhiteBoldText } from "/public/components/Typographies";
import {HeightSpacer} from "@/public/components/Spacers";
import {GreenButton} from "@/public/components/Buttons";

const InnerBox = styled(Box)({
    position: "absolute",
    top: 50,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
});

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