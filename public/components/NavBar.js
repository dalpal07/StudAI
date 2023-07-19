import {Box, styled} from "@mui/material";
import Image from "next/image";
import React from 'react';

const NavBox = styled(Box) ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "flex",
    padding: "1.125rem 1.75rem",
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

export default function NavBar(props) {
    const Profile = () => {
        if (props.isLoading) return <Box>Loading...</Box>
        if (props.error) return <Box>{error.message}</Box>
        if (props.user) return (
            <Box>
                <a href="/api/auth/logout">Logout</a>
                {props.user.name}
            </Box>
        )
        return (
            <Box>
                <a href="/api/auth/login">Login</a>
                <Image src={"./images/Profile.svg"} alt={"Profile"} width={30} height={30}/>
            </Box>
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