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
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Payment() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [requests, setRequests] = useState(0);
    const [type, setType] = useState("");
    const [isFreeDisabled, setIsFreeDisabled] = useState(false);

    const setSubscriptionValues = async (user) => {
        const apiUrl = `/api/user/`;
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`${apiUrl}get-subscription-type?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const subscription = await response.json();
            setType(subscription.type);
        }
        const response2 = await fetch(`${apiUrl}get-subscription-requests?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response2.status === 200) {
            const data = await response2.json();
            setRequests(data.requests);
        }
        const response3 = await fetch(`${apiUrl}get-free-disabled?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response3.status === 200) {
            const data = await response3.json();
            setIsFreeDisabled(data.disabled);
        }
    }

    useEffect(() => {
        if (user) {
            setSubscriptionValues(user);
        }
    }, [user]);

    const handleFreeClick = async () => {
        const apiUrl = `/api/user/`;
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`${apiUrl}subscribe?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "free" }),
        });
        if (response.status === 200) {
            router.push("/product");
        }
    }

    if (user) {
        return (
            <OuterBox>
                <NavBar user={user} error={error} isLoading={isLoading}/>
                <InnerBox>
                    <BoldText size={"2.5rem"}>Select a plan</BoldText>
                    <HeightSpacer height={"3rem"}/>
                    <StackRowBox>
                        <PricingPlanButton onClick={handleFreeClick} disabled={isFreeDisabled}>
                            <StackColumnBox style={{height: "100%"}}>
                                <BannerBox style={{paddingBottom: "0.28rem"}}><WhiteBoldText>Start
                                    FREE</WhiteBoldText></BannerBox>
                                <BannerLeftTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}
                                                           height={24} width={24}/></BannerLeftTriangle>
                                <BannerRightTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}
                                                            height={24} width={24}/></BannerRightTriangle>
                                <HeightSpacer height={"4rem"}/>
                                <BoldText size={"1.75rem"}>Early Access</BoldText>
                                <HeightSpacer height={"2rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"2rem"}>$0.00</Text>
                                    <Text size={"1rem"}>/mo</Text>
                                </StackRowBox>
                                <HeightSpacer height={"2rem"}/>
                                <Text>Enjoy 50 free chat requests for signing up early! All we ask for in return is
                                    your feedback.</Text>
                                <HeightSpacer height={"1rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"1.25rem"}>{type === "free" && requests < 50 ? (50 - requests) : isFreeDisabled ? 0 : 50}</Text>
                                    <WidthSpacer width={"0.25rem"}/>
                                    <Text size={"1rem"}>requests remaining</Text>
                                </StackRowBox>
                                <StackColumnBox style={{marginTop: "auto"}}>
                                    <BoldText size={"1.125rem"} style={{color: "#53B753"}}>Continue</BoldText>
                                    <HeightSpacer height={"3rem"}/>
                                </StackColumnBox>
                            </StackColumnBox>
                        </PricingPlanButton>
                        <WidthSpacer width={"4rem"}/>
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
                                    <Text>Use up to 150 chat requests per month. Unused requests will not be carried
                                        over to the next month.</Text>
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
                                    <BannerLeftTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}
                                                               height={24} width={24}/></BannerLeftTriangle>
                                    <BannerRightTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}
                                                                height={24} width={24}/></BannerRightTriangle>
                                    <HeightSpacer height={"4rem"}/>
                                    <BoldText size={"1.75rem"}>Unlimited</BoldText>
                                    <HeightSpacer height={"2rem"}/>
                                    <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                        <Text size={"2rem"}>$9.99</Text>
                                        <Text size={"1rem"}>/mo</Text>
                                    </StackRowBox>
                                    <HeightSpacer height={"2rem"}/>
                                    <Text>Unlock unlimited chat requests each month! Great for anyone with regular data
                                        needs.</Text>
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
    } else {
        if (!isLoading && !error) {
            router.push("/");
        }
    }
}