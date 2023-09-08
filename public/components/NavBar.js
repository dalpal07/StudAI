import Image from "next/image";
import {LeftNavBox, NavBox} from "@/public/components/common/Boxes";
import Profile from "@/public/components/conditionals/Profile";
import {useMediaQuery} from "@mui/material";
import {HiddenHref} from "@/public/components/common/Miscellaneous";

export default function NavBar() {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <NavBox ismobile={isMobile.toString()}>
            <LeftNavBox ismobile={isMobile.toString()}>
                <HiddenHref href={"/"}>
                    <Image priority={true} src={"./images/Logo.svg"} alt={"logo"} width={isMobile ? 100 : 155} height={isMobile? 20 : 33}/>
                </HiddenHref>
            </LeftNavBox>
            <Profile/>
        </NavBox>
    );
}