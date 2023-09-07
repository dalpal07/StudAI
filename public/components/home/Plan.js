import {StackColumnBox} from "@/public/components/common/Boxes";
import {BoldText, GreenBoldText, Text} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {HiddenButton} from "@/public/components/common/Buttons";
import {useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";

async function checkout(type, id) {
    console.log("type", type);
    const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({type: type, id: id}),
    })
    if (response.status === 200) {
        const {link} = await response.json();
        window.location.href = link;
    }
}

export default function Plan(props) {
    const sub = useSelector(selectSub);
    const handleClick = (plan) => {
        console.log("plan", plan);
        const action = plan.toLowerCase();
        if (action === "standard") {
            checkout("standard", sub);
        }
        if (action === "unlimited") {
            checkout("unlimited", sub);
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
        }}>
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