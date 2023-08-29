import {MenuButton} from "@/public/components/common/Buttons";
import React from "react";
import {MenuBox} from "@/public/components/common/Boxes";
import {useRouter} from "next/router";

export default function Menu({clicked, forwardRef}) {
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
                            <MenuButton onClick={handleStud}>Stud</MenuButton>
                            <MenuButton onClick={handlePricing}>Pricing</MenuButton>
                            <MenuButton onClick={handleHelp}>Help</MenuButton>
                            <MenuButton onClick={handleSignOut}>Sign Out</MenuButton>
                    </MenuBox>
                )
        }
}