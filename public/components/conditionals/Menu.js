import {DefaultButton, MenuButton} from "@/public/components/common/Buttons";
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
import {HiddenHref} from "@/public/components/common/Miscellaneous";

export default function Menu({clicked, forwardRef}) {
        const name = useSelector(selectName);
        const router = useRouter();
        const handleSignOut = () => {
                router.push("/api/auth/logout");
        }
        const handleHelp = () => {
                router.push("/help");
        }
        const handleStud = () => {
                router.push("/product");
        }
        const handlePricing = () => {
                router.push("/payment");
        }
        if (clicked) {
            return (
                <MenuBox ref={forwardRef}>
                        <Image src={"./images/Profile.svg"} alt={"profile"} width={50} height={50}/>
                        <HeightSpacer height={"0.5rem"}/>
                        <GrayText size={"0.875rem"}>{name}</GrayText>
                        <HeightSpacer height={"0.25rem"}/>
                        <DefaultButton>
                                <BoldText size={"0.875rem"}>
                                        View my plan
                                </BoldText>
                        </DefaultButton>
                        <HeightSpacer height={"1.12rem"}/>
                        <BoldText size={"1.125rem"}>My Data</BoldText>
                        <HeightSpacer height={"0.5rem"}/>
                        <BoldText size={"1.125rem"}>Home</BoldText>
                        <HeightSpacer height={"0.5rem"}/>
                        <BoldText size={"1.125rem"}>Support</BoldText>
                        <HeightSpacer height={"1rem"}/>
                        <Box style={{
                            width: "3.75rem",
                            height: "0.0625rem",
                            background: "var(--50-black, rgba(28, 26, 26, 0.50))",
                        }}/>
                        <HeightSpacer height={"0.5rem"}/>
                        <HiddenHref href={'/api/auth/logout'}>
                            <StackRowBox style={{alignItems: "center"}}>
                                <GrayBoldText size={"1.125rem"}>Logout</GrayBoldText>
                                <WidthSpacer width={"0.5rem"}/>
                                <Image src={"./images/Logout.svg"} alt={"logout"} width={12.3} height={10}/>
                            </StackRowBox>
                        </HiddenHref>
                </MenuBox>
            )
        }
}