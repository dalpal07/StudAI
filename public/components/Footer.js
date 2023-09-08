import {Line, StackColumnBox, StackRowBox} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthFlexSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {FooterHref} from "@/public/components/common/Miscellaneous";
import {Text} from "@/public/components/common/Typographies";

export default function Footer(props) {
    return (
        <StackColumnBox style={{alignItems: "center", position: props.absolute ? "absolute" : "", bottom: props.absolute ? 0 : "", width: "100%"}}>
            <Line width={props.absolute ? "97%" : "100%"} height={"0"}/>
            <HeightSpacer height={"2rem"}/>
            <StackRowBox style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <WidthSpacer width={props.absolute? "2rem" : 0}/>
                <StackColumnBox style={{width: "15rem"}}>
                    <Text><b>Contact Support:</b></Text>
                    <HeightSpacer height={"0.5rem"}/>
                    <FooterHref href={"mailto:dallinjburningham@gmail.com"}><Text>dallinjburningham@gmail.com</Text></FooterHref>
                </StackColumnBox>
                <WidthFlexSpacer/>
                <StackColumnBox style={{width: "20rem", alignItems: "center"}}>
                    <Text>&copy; 2023 StudAI. All rights reserved.</Text>
                </StackColumnBox>
                <WidthFlexSpacer/>
                <StackColumnBox style={{width: "15rem", alignItems: "flex-end"}}>
                    <Text><b>Follow Us:</b></Text>
                    <HeightSpacer height={"0.5rem"}/>
                    <FooterHref href={"https://www.linkedin.com/company/studaio/"}><Text>LinkedIn</Text></FooterHref>
                </StackColumnBox>
                <WidthSpacer width={props.absolute? "2rem" : 0}/>
            </StackRowBox>
            <HeightSpacer height={"2rem"}/>
        </StackColumnBox>
    )
}