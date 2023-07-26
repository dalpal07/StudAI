import {Box, Button, styled, Typography} from "@mui/material";
import Image from "next/image";
import { LargeBoldText, LargerBoldText, WhiteLargeBoldText } from "/public/components/Typographies";
import {HeightSpacer} from "@/public/components/Spacers";

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

const GreenButton = styled(Button)({
    marginTop: "3rem",
    display: "flex",
    padding: "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    background: "var(--main-green, #53B753)",
    textTransform: "none",
    "&:hover": {
        background: "var(--main-green-hover, #4AAE4A)",
    }
});

export default function Intro() {
    return (
        <InnerBox>
            <LargeBoldText>Welcome to</LargeBoldText>
            <HeightSpacer height={"1.1rem"}/>
            <Image src={"./images/FullLogo.svg"} alt={"StudAI Logo"} width={400} height={72.42}/>
            <HeightSpacer height={"1.65rem"}/>
            <LargerBoldText>Your Personal Data Maid</LargerBoldText>
            <HeightSpacer height={"1.125rem"}/>
            <a href="/api/auth/login" style={{textDecoration: "none"}}>
                <GreenButton>
                    <WhiteLargeBoldText>See what Stud can do</WhiteLargeBoldText>
                </GreenButton>
            </a>
        </InnerBox>
    )
}