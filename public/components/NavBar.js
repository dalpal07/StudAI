import {Box, Button, styled} from "@mui/material";
import Image from "next/image";
import React, {useEffect, useRef, useState} from 'react';

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

const SignInButton = styled(Button)({
    display: "flex",
    padding: "0.5rem 1.25rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    background: "#E3E3E3",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textTransform: "none",
    marginRight: "1.75rem",
    "&:hover": {
        background: "#D6D6D6",
    }
});

const ProfileBox = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const UserNameText = styled(Box)({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "1.125rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textTransform: "none",
    marginRight: "1.75rem",
});

const SignOutButton = styled(Button)({
    position: "absolute",
    top: 68,
    right: 0,
    background: "#F2F2F2",
    color: "var(--main-black, #3F3636)",
    textTransform: "none",
    boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 0px rgba(0, 0, 0, 0.15), 0px 10px 20px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: 0,
    width: "7rem",
    justifyContent: "left",
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
        if (clicked) return <a href="/api/auth/logout" ref={ref}><SignOutButton>Sign Out</SignOutButton></a>
    }
    const handleProfileClick = () => {
        setClicked(!clicked);
    }
    const Profile = () => {
        if (props.isLoading) return <UserNameText>Loading...</UserNameText>
        if (props.error) return <UserNameText>{props.error.message}</UserNameText>
        if (props.user) return (
            <ProfileBox>
                <UserNameText>{props.user.name}</UserNameText>
                <Button class={"profile-button svg-button"} onClick={handleProfileClick} ref={ref} disableTouchRipple></Button>
                <IsSignOutButton/>
            </ProfileBox>
        )
        return (
            <ProfileBox>
                <a href="/api/auth/login" style={{textDecoration: "none"}}><SignInButton>Sign In</SignInButton></a>
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