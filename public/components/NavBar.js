import Image from "next/image";
import {WidthFlexSpacer} from "@/public/components/common/Spacers";
import {NavBox} from "@/public/components/common/Boxes";
import Profile from "@/public/components/conditionals/Profile";

export default function NavBar() {
    return (
        <NavBox>
            <Image src={"./images/Logo.svg"} alt={"StudAI Logo"} width={129.3} height={27.5}/>
            <WidthFlexSpacer/>
            <Profile/>
        </NavBox>
    );
}