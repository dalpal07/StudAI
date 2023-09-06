import {BoldText, GreenBoldText} from "@/public/components/common/Typographies";
import {RightNavBox} from "@/public/components/common/Boxes";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {useMediaQuery} from "@mui/material";
import Menu from "./Menu";
import {DefaultButton, HiddenButton} from "@/public/components/common/Buttons";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectName} from "@/slices/userSlice";
import {HiddenHref} from "@/public/components/common/Miscellaneous";
import Image from "next/image";

export default function Profile() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const name = useSelector(selectName);
    const [clicked, setClicked] = useState(false);
    const profileRef = useRef(null);
    const signOutRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (!signOutRef.current?.contains(event.target) && !profileRef.current?.contains(event.target)) {
                setClicked(false);
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [signOutRef, profileRef]);
    const handleProfileClick = () => {
        setClicked(!clicked);
    }
    if (name) return (
        <RightNavBox ismobile={isMobile.toString()}>
            <BoldText>{name}</BoldText>
            <WidthSpacer width={"0.5rem"}/>
            <HiddenButton onClick={handleProfileClick} ref={profileRef}>
                <Image src={"./images/Profile.svg"} alt={"profile"} height={33} width={33}/>
            </HiddenButton>
            <Menu forwardRef={signOutRef} clicked={clicked}/>
        </RightNavBox>
    )
    return (
        <RightNavBox ismobile={isMobile.toString()}>
            <HiddenHref href={'/api/auth/login'}>
                <GreenBoldText size={"0.875rem"}>
                    Login
                </GreenBoldText>
            </HiddenHref>
            <WidthSpacer width={"1.75rem"}/>
            <DefaultButton onClick={() => router.push("/api/auth/signup")}>
                <BoldText size={"0.875rem"}>
                    Sign Up
                </BoldText>
            </DefaultButton>
        </RightNavBox>
    )
}