import Image from "next/image";
import {LeftNavBox, NavBox} from "@/public/components/common/Boxes";
import Profile from "@/public/components/conditionals/Profile";

export default function NavBar() {
    return (
        <NavBox>
            <LeftNavBox>
                <Image src={"./images/Logo.svg"} alt={"logo"} width={155} height={33}/>
            </LeftNavBox>
            <Profile/>
        </NavBox>
    );
}