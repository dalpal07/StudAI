import {Box, Button, styled, Typography} from "@mui/material";
import Image from "next/image";

const InnerBox = styled(Box)({
    position: "absolute",
    top: 50,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.125rem",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
});

const Text = styled(Typography)({
    marginTop: "1.12rem",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
});

const WelcomeText = styled(Text)({
    fontSize: "1.125rem",
});

const DataMaidText = styled(Text)({
    fontSize: "1.75rem",
});

const SeeText = styled(Text)({
    marginTop: 0,
    fontSize: "1.125rem",
    color: "#F2F2F2",
})

const GreenButton = styled(Button)({
    marginTop: "3rem",
    display: "flex",
    padding: "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    background: "var(--main-green, #53B753)",
    textTransform: "none"
});

export default function Intro() {
    return (
        <InnerBox>
            <WelcomeText>Welcome to</WelcomeText>
            <Image src={"./images/FullLogo.svg"} alt={"StudAI Logo"} width={400} height={72.42}/>
            <DataMaidText>Your Personal Data Maid</DataMaidText>
            <a href="/api/auth/login" style={{textDecoration: "none"}}>
                <GreenButton>
                    <SeeText>See what Stud can do</SeeText>
                </GreenButton>
            </a>
        </InnerBox>
    )
}