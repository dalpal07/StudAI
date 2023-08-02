import Image from "next/image";
import React, {useEffect, useRef, useState} from 'react';
import {WidthFlexSpacer} from "../../public/components/common/Spacers";
import {NavBox} from "../../public/components/common/Boxes";
import Profile from "../../public/components/conditionals/Profile";

export default function NavBar(props) {
    return (
        <NavBox>
            <Image src={"./images/Logo.svg"} alt={"StudAI Logo"} width={151.9} height={27.5}/>
            <WidthFlexSpacer/>
            <Profile isLoading={props.isLoading} error={props.error} user={props.user}/>
        </NavBox>
    );
}