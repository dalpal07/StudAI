import {StackColumnBox} from "@/public/components/common/Boxes";
import {BoldText, GreenBoldText, Text} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {HiddenButton} from "@/public/components/common/Buttons";
import {useRouter} from "next/router";
import Image from "next/image";

export default function Plan(props) {
    const router = useRouter();
    const handleClick = (plan) => {
        console.log("plan", plan);
        const action = plan.toLowerCase();
        if (action === "standard") {
            const returnTo = encodeURIComponent("/?plan=standard")
            router.push(`/api/auth/signup?returnTo=${returnTo}`)
        }
        if (action === "unlimited") {
            const returnTo = encodeURIComponent("/?plan=unlimited")
            router.push(`/api/auth/signup?returnTo=${returnTo}`)
        }
        else {
            // handle free plan
        }
    }

    return (
        <StackColumnBox style={{
            padding: "2.625rem",
            alignItems: "center",
            borderRadius: "0.3125rem",
            border: "1px solid var(--Main-green, #53B753)",
            background: "var(--UI-white, #F9F9F9)",
            width: "10rem",
            position: "relative",
        }}>
            {
                props.plan === "Unlimited" &&
                <Image style={{
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                }} src={"./images/free.svg"} alt={"free"} width={120} height={120}/>
            }
            <BoldText size={"1.5rem"}>{props.plan}</BoldText>
            <HeightSpacer height={"1.12rem"}/>
            <Text size={"1.125rem"}>${props.price}/mo</Text>
            <HeightSpacer height={"1.12rem"}/>
            <Text style={{
                textAlign: "center",
                justifyContent: "flex-start",
                height: "9.5rem",
                wrap: "break-word",
            }} size={"1.125rem"}>
                {props.description}
            </Text>
            <HeightSpacer height={"1.12rem"}/>
            <HiddenButton onClick={() => handleClick(props.plan)}>
                <GreenBoldText size={"1.125rem"}>{props.action}</GreenBoldText>
            </HiddenButton>
        </StackColumnBox>
    )
}