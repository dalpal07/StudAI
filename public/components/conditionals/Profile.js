import {BoldText} from "../../../public/components/common/Typographies";
import {ProfileBox} from "../../../public/components/common/Boxes";
import {WidthSpacer} from "../../../public/components/common/Spacers";
import {Button} from "@mui/material";
import SignOutButton from "../../../public/components/conditionals/SignOutButton";
import {DefaultButton} from "../../../public/components/common/Buttons";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/router";

export default function Profile(props) {
    const { user, error, isLoading } = useUser();
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
    const handleLoginClick = () => {
        router.push("/api/auth/login");
    }
    if (isLoading) return <BoldText size={"1.125rem"}>Loading...</BoldText>
    if (error) return <BoldText size={"1.125rem"}>{error.message}</BoldText>
    if (user) return (
        <ProfileBox>
            <BoldText size={"1.125rem"}>{user.name}</BoldText>
            <WidthSpacer width={"1.75rem"}/>
            <Button class={"profile-button svg-button"} onClick={handleProfileClick} ref={profileRef} disableTouchRipple></Button>
            <SignOutButton forwardRef={signOutRef} clicked={clicked}/>
        </ProfileBox>
    )
    return (
        <ProfileBox>
            <DefaultButton size={"1rem"} padding={"0.25rem 1.25rem"} onClick={handleLoginClick}>Sign In</DefaultButton>
            <WidthSpacer width={"1.75rem"}/>
            <Image src={"./images/Profile.svg"} alt={"Profile"} width={35.5} height={35.5}/>
        </ProfileBox>
    )
}