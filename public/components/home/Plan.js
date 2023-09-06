import {StackColumnBox} from "@/public/components/common/Boxes";
import {BoldText, GreenBoldText, Text} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {HiddenHref} from "@/public/components/common/Miscellaneous";

export default function Plan(props) {
    return (
        <StackColumnBox style={{
            padding: "2.625rem",
            alignItems: "center",
            borderRadius: "0.3125rem",
            border: "1px solid var(--Main-green, #53B753)",
            background: "var(--UI-white, #F9F9F9)",
            width: "10rem",
        }}>
            <BoldText size={"1.5rem"}>{props.title}</BoldText>
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
            <HiddenHref href={props.href}>
                <GreenBoldText size={"1.125rem"}>{props.action}</GreenBoldText>
            </HiddenHref>
        </StackColumnBox>
    )
}