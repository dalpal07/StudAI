import Image from "next/image";
import { BoldText } from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {GreenButton} from "@/public/components/common/Buttons";
import {InnerBox, OuterBox} from "@/public/components/common/Boxes";
import NavBar from "@/public/components/NavBar";
import {useRouter} from "next/router";
import Footer from "@/public/components/Footer";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function Welcome() {
    const router = useRouter();
    const {user} = useUser();
    const handleClick = async () => {
        if (user) {
            router.push("/product");
        }
        else {
            router.push("/api/auth/login");
        }
    }
    return (
        <OuterBox>
            <NavBar/>
            <InnerBox>
                <BoldText size={"1.125rem"}>Welcome to</BoldText>
                <HeightSpacer height={"0.85rem"}/>
                <Image src={"./images/FullLogo.svg"} alt={"StudAI Logo"} width={361.9} height={77}/>
                <HeightSpacer height={"1.35rem"}/>
                <BoldText size={"1.75rem"}>Your Personal Data Maid</BoldText>
                <HeightSpacer height={"4.125rem"}/>
                <GreenButton size={"1.125rem"} padding={"0.25rem 1.5rem"} onClick={handleClick}>
                    See what Stud can do
                </GreenButton>
            </InnerBox>
            <Footer absolute={true}/>
        </OuterBox>
    )
}