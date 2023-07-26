import {MenuButton} from "@/public/components/common/Buttons";
import React from "react";

export default function SignOutButton({clicked, forwardRef}) {
        if (clicked) {
                return (
                    <a href="/api/auth/logout" ref={forwardRef}>
                            <MenuButton top={68}>Sign Out</MenuButton>
                    </a>
                )
        }
}