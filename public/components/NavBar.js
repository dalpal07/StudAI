import {Box, Button, styled} from "@mui/material";
import Image from "next/image";
import React, {useEffect, useRef, useState} from 'react';
import {BoldText, Text} from "./Typographies";
import {WidthSpacer} from "@/public/components/Spacers";
import {DefaultButton, MenuButton} from "@/public/components/Buttons";

const NavBox = styled(Box) ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "flex",
    padding: "1rem 1.5rem",
    alignItems: "center",
    gap: "1.75rem",
    alignSelf: "stretch",
    backgroundColor: "#F2F2F2",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.30), 0px 0px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.05)"
});

const Spacer = styled(Box) ({
    height: "1.0625rem",
    flex: "1 0 0"
});

const ProfileBox = styled(Box)({
    display: "flex",
    alignItems: "center",
});

export default function NavBar(props) {
    const [clicked, setClicked] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setClicked(false);
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);
    const IsSignOutButton = () => {
        if (clicked) return <a href="/api/auth/logout" ref={ref}><MenuButton top={68}>Sign Out</MenuButton></a>
    }
    const handleProfileClick = () => {
        setClicked(!clicked);
    }
    const Profile = () => {
        if (props.isLoading) return <BoldText size={"1.125rem"}>Loading...</BoldText>
        if (props.error) return <BoldText size={"1.125rem"}>{props.error.message}</BoldText>
        if (props.user) return (
            <ProfileBox>
                <BoldText size={"1.125rem"}>{props.user.name}</BoldText>
                <WidthSpacer width={"1.75rem"}/>
                <Button class={"profile-button svg-button"} onClick={handleProfileClick} ref={ref} disableTouchRipple></Button>
                <IsSignOutButton/>
            </ProfileBox>
        )
        return (
            <ProfileBox>
                <a href="/api/auth/login" style={{textDecoration: "none"}}>
                    <DefaultButton size={"1rem"} padding={"0.25rem 1.25rem"}>Sign In</DefaultButton>
                </a>
                <WidthSpacer width={"1.75rem"}/>
                <Image src={"./images/Profile.svg"} alt={"Profile"} width={35.5} height={35.5}/>
            </ProfileBox>
        )
    }

    return (
        <NavBox>
            <Image src={"./images/Logo.svg"} alt={"StudAI Logo"} width={151.9} height={27.5}/>
            <Spacer/>
            <Profile/>
        </NavBox>
    );
}