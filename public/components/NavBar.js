import Image from "next/image";
import {LeftNavBox, NavBox} from "@/public/components/common/Boxes";
import Profile from "@/public/components/conditionals/Profile";
import {useMediaQuery} from "@mui/material";

export default function NavBar() {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <NavBox>
            <LeftNavBox isMobile={isMobile}>
                <Image src={"./images/Logo.svg"} alt={"logo"} width={isMobile ? 100 : 155} height={isMobile? 20 : 33}/>
            </LeftNavBox>
            <Profile/>
        </NavBox>
    );
}