import {DefaultButton, HiddenButton, MenuButton} from "@/public/components/common/Buttons";
import React from "react";
import {MenuBox, StackRowBox} from "@/public/components/common/Boxes";
import {useRouter} from "next/router";
import {Box, Button} from "@mui/material";
import Image from "next/image";
import {Height} from "@mui/icons-material";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {BoldText, GrayBoldText, GrayText} from "@/public/components/common/Typographies";
import {useSelector} from "react-redux";
import {selectName} from "@/slices/userSlice";

export default function Menu({clicked, forwardRef}) {
        const name = useSelector(selectName);
        const router = useRouter();
        if (clicked) {
            return (
                <MenuBox ref={forwardRef}>
                        <Image src={"./images/Profile.svg"} alt={"profile"} width={50} height={50}/>
                        <HeightSpacer height={"0.5rem"}/>
                        <GrayText size={"0.875rem"}>{name}</GrayText>
                        <HeightSpacer height={"0.25rem"}/>
                        <DefaultButton onClick={() => router.push("/subscription")}>
                                <BoldText size={"0.875rem"}>
                                        View my plan
                                </BoldText>
                        </DefaultButton>
                        <HeightSpacer height={"1.12rem"}/>
                        <HiddenButton onClick={() => router.push('/product')}>
                            <BoldText size={"1.125rem"}>My Data</BoldText>
                        </HiddenButton>
                        <HeightSpacer height={"0.5rem"}/>
                        <HiddenButton onClick={() => router.push('/')}>
                            <BoldText size={"1.125rem"}>Home</BoldText>
                        </HiddenButton>
                        <HeightSpacer height={"0.5rem"}/>
                        <HiddenButton onClick={() => router.push('/support')}>
                            <BoldText size={"1.125rem"}>Support</BoldText>
                        </HiddenButton>
                        <HeightSpacer height={"1rem"}/>
                        <Box style={{
                            width: "3.75rem",
                            height: "0.0625rem",
                            background: "var(--50-black, rgba(28, 26, 26, 0.50))",
                        }}/>
                        <HeightSpacer height={"0.5rem"}/>
                        <HiddenButton onClick={() => router.push('/api/auth/logout')}>
                            <StackRowBox style={{alignItems: "center"}}>
                                <GrayBoldText size={"1.125rem"}>Logout</GrayBoldText>
                                <WidthSpacer width={"0.5rem"}/>
                                <Image src={"./images/Logout.svg"} alt={"logout"} width={12.3} height={10}/>
                            </StackRowBox>
                        </HiddenButton>
                </MenuBox>
            )
        }
}