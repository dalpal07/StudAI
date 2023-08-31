import {useUser} from "@auth0/nextjs-auth0/client";
import {
    BannerBox,
    BannerLeftTriangle, BannerRightTriangle,
    InnerBox3,
    OuterBox,
    StackColumnBox,
    StackRowBox
} from "@/public/components/common/Boxes";
import NavBar from "@/public/components/NavBar";
import {BoldText, Text, WhiteBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import {PricingPlanButton} from "@/public/components/common/Buttons";
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Footer from "@/public/components/Footer";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
function Payment() {
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

    const handleStandardClick = async () => {
        const response = await fetch("/api/stripe/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "standard" }),
        });
        if (response.status === 200) {
            const {link} = await response.json();
            router.push(link)
        }
    }

    const handleUnlimitedClick = async () => {
        const response = await fetch("/api/stripe/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "unlimited" }),
        });
        if (response.status === 200) {
            const {link} = await response.json();
            router.push(link)
        }
    }

    if (user) {
        return (
            <OuterBox>
                <InnerBox3>
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
                        <PricingPlanButton onClick={handleStandardClick} disabled={!isFreeDisabled}>
                            <StackColumnBox style={{height: "100%"}}>
                                <HeightSpacer height={"4rem"}/>
                                <BoldText size={"1.75rem"}>Standard</BoldText>
                                <HeightSpacer height={"2rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"2rem"}>TBD</Text>
                                    <Text size={"1rem"}>/mo</Text>
                                </StackRowBox>
                                <HeightSpacer height={"2rem"}/>
                                <Text>Coming Soon! Use up to a certain amount chat requests per month. Great for anyone with semi-regular data needs.</Text>
                                <StackColumnBox style={{marginTop: "auto"}}>
                                    <BoldText size={"1.125rem"} style={{color: "#53B753"}}>Sign Up Now</BoldText>
                                    <HeightSpacer height={"3rem"}/>
                                </StackColumnBox>
                            </StackColumnBox>
                        </PricingPlanButton>
                        <WidthSpacer width={"4rem"}/>
                        <PricingPlanButton onClick={handleUnlimitedClick} disabled={!isFreeDisabled}>
                            <StackColumnBox style={{height: "100%"}}>
                                {/*<BannerBox><WhiteBoldText>Best Value</WhiteBoldText></BannerBox>*/}
                                {/*<BannerLeftTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}*/}
                                {/*                           height={24} width={24}/></BannerLeftTriangle>*/}
                                {/*<BannerRightTriangle><Image src={"./images/triangle.svg"} alt={"triangle"}*/}
                                {/*                            height={24} width={24}/></BannerRightTriangle>*/}
                                <HeightSpacer height={"4rem"}/>
                                <BoldText size={"1.75rem"}>Unlimited</BoldText>
                                <HeightSpacer height={"2rem"}/>
                                <StackRowBox style={{alignItems: "end", width: "100%", justifyContent: "center"}}>
                                    <Text size={"2rem"}>TBD</Text>
                                    <Text size={"1rem"}>/mo</Text>
                                </StackRowBox>
                                <HeightSpacer height={"2rem"}/>
                                <Text>Coming Soon! Unlock unlimited chat requests each month! Great for anyone with regular data
                                    needs.</Text>
                                <StackColumnBox style={{marginTop: "auto"}}>
                                    <BoldText size={"1.125rem"} style={{color: "#53B753"}}>Sign Up Now</BoldText>
                                    <HeightSpacer height={"3rem"}/>
                                </StackColumnBox>
                            </StackColumnBox>
                        </PricingPlanButton>
                    </StackRowBox>
                </InnerBox3>
                <Footer absolute={true}/>
            </OuterBox>
        )
    } else {
        if (!isLoading && !error) {
            router.push("/");
        }
    }
}

export default PageWrapper(Payment);