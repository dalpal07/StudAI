import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import {StackColumnBox} from "@/public/components/common/Boxes";
import {BoldText, Text} from "@/public/components/common/Typographies";
import {HiddenHref} from "@/public/components/common/Miscellaneous";
import {HeightSpacer} from "@/public/components/common/Spacers";

function Support() {
    return (
        <StackColumnBox style={{
            width: "100wh",
            height: "100vh",
            background: "var(--ui-white, #F9F9F9)",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <BoldText size={"1.25rem"}>Contact Support:</BoldText>
            <HeightSpacer height={"0.5rem"}/>
            <HiddenHref href={"mailto:dallinjburningham@gmail.com"}>
                <Text size={"1.25rem"}>dallinjburningham@gmail.com</Text>
            </HiddenHref>
        </StackColumnBox>
    )
}

export default PageWrapper(Support);