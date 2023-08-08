import {useUser} from "@auth0/nextjs-auth0/client";
import {
    BannerBox,
    BannerLeftTriangle, BannerRightTriangle,
    InnerBox,
    OuterBox,
    StackColumnBox,
    StackRowBox
} from "../public/components/common/Boxes";
import NavBar from "../public/components/NavBar";
import {BoldText, Text, WhiteBoldText} from "../public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "../public/components/common/Spacers";
import {PricingPlanButton} from "../public/components/common/Buttons";
import Image from "next/image";

export default function Pricing() {
    const { user, error, isLoading } = useUser();
    return (
        <OuterBox>
            <NavBar user={user} error={error} isLoading={isLoading}/>
            <InnerBox>
                <BoldText size={"2.5rem"}>Select a plan</BoldText>
                <HeightSpacer height={"3rem"}/>
                <StackRowBox>
                    <a href={"https://buy.stripe.com/test_6oE9D40G581xfwk5kl"}>
                        <PricingPlanButton>
                            <StackColumnBox style={{height: "100%"}}>
                                <HeightSpacer height={"4rem"}/>
                                <BoldText size={"1.75rem"}>Standard</BoldText>
                                <HeightSpacer height={"2rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"2rem"}>$4.99</Text>
                                    <Text size={"1rem"}>/mo</Text>
                                </StackRowBox>
                                <HeightSpacer height={"2rem"}/>
                                <Text>Good for 150 chat requests per month. Unused requests will not be carried over to the next month.</Text>
                                <StackColumnBox style={{marginTop: "auto"}}>
                                    <BoldText size={"1.125rem"} style={{color: "#53B753"}}>Sign Up Now</BoldText>
                                    <HeightSpacer height={"3rem"}/>
                                </StackColumnBox>
                            </StackColumnBox>
                        </PricingPlanButton>
                    </a>
                    <WidthSpacer width={"4rem"}/>
                    <a href={"https://buy.stripe.com/test_cN28z0ewV4Plac0144"}>
                        <PricingPlanButton>
                            <StackColumnBox style={{height: "100%"}}>
                                <BannerBox><WhiteBoldText>Best Value</WhiteBoldText></BannerBox>
                                <BannerLeftTriangle><Image src={"./images/triangle.svg"} alt={"triangle"} height={24} width={24}/></BannerLeftTriangle>
                                <BannerRightTriangle><Image src={"./images/triangle.svg"} alt={"triangle"} height={24} width={24}/></BannerRightTriangle>
                                <HeightSpacer height={"4rem"}/>
                                <BoldText size={"1.75rem"}>Unlimited</BoldText>
                                <HeightSpacer height={"2rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"2rem"}>$9.99</Text>
                                    <Text size={"1rem"}>/mo</Text>
                                </StackRowBox>
                                <HeightSpacer height={"2rem"}/>
                                <Text>Good for unlimited chat requests each month.</Text>
                                <StackColumnBox style={{marginTop: "auto"}}>
                                    <BoldText size={"1.125rem"} style={{color: "#53B753"}}>Sign Up Now</BoldText>
                                    <HeightSpacer height={"3rem"}/>
                                </StackColumnBox>
                            </StackColumnBox>
                        </PricingPlanButton>
                    </a>
                </StackRowBox>
            </InnerBox>
        </OuterBox>
    )
}