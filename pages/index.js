import {DemoBox, HomeBox, HomePage, HomeTopBox, StackColumnBox, StackRowBox,} from "@/public/components/common/Boxes";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import HomeMiddle from "@/public/components/home/HomeMiddle";
import HomeBottom from "@/public/components/home/HomeBottom";
import {BoldText, GreenBoldText, Text, WhiteBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import Image from "next/image";
import {Box, useMediaQuery} from "@mui/material";
import {DefaultButton, GreenButton, HiddenButton} from "@/public/components/common/Buttons";
import {HiddenHref} from "@/public/components/common/Miscellaneous";
import Plan from "@/public/components/home/Plan";
import {useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {checkout} from "@/public/functions/Checkout";

function Home() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const sub = useSelector(selectSub);
    const router = useRouter();

    useEffect(() => {
        const {plan} = router.query;
        if (plan && sub) {
            checkout(plan, sub)
        }
    }, [router.query, sub]);

    function scrollPage(targetPage) {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const currentPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = viewportHeight * targetPage;

        // Calculate the difference between the target and current positions
        const difference = targetPosition - currentPosition;

        // Define the duration of the scroll animation (in milliseconds)
        const duration = 750; // Adjust this value for desired animation speed

        // Keep track of the start time
        let startTime;

        // Define the scroll animation function
        function animateScroll(currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }

            // Calculate the time elapsed since the animation started
            const elapsedTime = currentTime - startTime;

            // Calculate the new scroll position using easing (e.g., easeInOutQuad)
            const easedPosition = easeInOutQuad(elapsedTime, currentPosition, difference, duration);

            // Set the scroll position
            window.scrollTo(0, easedPosition);

            // Continue the animation until the duration is reached
            if (elapsedTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        // Start the animation
        requestAnimationFrame(animateScroll);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    return (
        <HomeBox>
            <HomePage>
                <HomeTopBox/>
                <HomeMiddle/>
                <HomeBottom scrollPage={scrollPage}/>
            </HomePage>
            <HomePage>
                <DemoBox ismobile={isMobile.toString()}>
                    <BoldText size={"1.5rem"}>DEMO VIDEO</BoldText>
                    <Text size={"1.125rem"}>coming soon...</Text>
                </DemoBox>
                <StackColumnBox style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "20%",
                }}>
                    <HiddenButton onClick={() => scrollPage(2)}>
                        <StackColumnBox style={{
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}>
                        <BoldText size={"0.875rem"}>Check out pricing</BoldText>
                        <HeightSpacer height={"0.5rem"}/>
                        <Image src={"./images/DownArrow.svg"} alt={"arrow"} width={27} height={15}/>
                        </StackColumnBox>
                    </HiddenButton>
                    <HeightSpacer height={"2.5rem"}/>
                </StackColumnBox>
            </HomePage>
            <HomePage>
                <StackColumnBox style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {
                        sub ?
                            <>
                                <BoldText size={"1.5rem"}>Welcome back!</BoldText>
                                <HeightSpacer height={"1rem"}/>
                                <Text size={"1.125rem"}>View your plan to see your current pricing options</Text>
                                <HeightSpacer height={"1.5rem"}/>
                                <GreenButton onClick={() => router.push("/subscription")}>
                                    <WhiteBoldText size={"1.25rem"}>View my plan</WhiteBoldText>
                                </GreenButton>
                            </>
                            :
                            <>
                                <BoldText size={"1.5rem"}>Select a Plan</BoldText>
                                <HeightSpacer height={"1.5rem"}/>
                                <StackRowBox style={{}}>
                                    <Plan plan={"Early Access"} price={"0.00"}
                                          description={"Enjoy 25 free chat requests for signing up early! All we ask for in return is your feedback."}
                                          action={"Continue"}/>
                                    <WidthSpacer width={"1.12rem"}/>
                                    <Plan plan={"Standard"} price={"4.99"} description={"Use up to 150 requests per month."}
                                          action={"Sign up now"}/>
                                    <WidthSpacer width={"1.12rem"}/>
                                    <Plan plan={"Unlimited"} price={"9.99"} description={"Get unlimited requests each month!"}
                                          action={"Sign up now"}/>
                                </StackRowBox>
                                <HeightSpacer height={"1.5rem"}/>
                                <StackRowBox>
                                    <Text size={"0.875rem"}>Already have a plan?</Text>
                                    <WidthSpacer width={"0.75rem"}/>
                                    <HiddenHref href={"/api/auth/login?returnTo=/product"}>
                                        <GreenBoldText size={"0.875rem"}>Login</GreenBoldText>
                                    </HiddenHref>
                                </StackRowBox>
                            </>
                    }
                </StackColumnBox>
                <StackColumnBox style={{
                    minHeight: "fit-content",
                    width: "100%",
                    boxSizing: "border-box",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Box style={{
                        width: "95%",
                        height: "0.0625rem",
                        background: "var(--50-black, rgba(28, 26, 26, 0.50))",
                    }}/>
                    <HeightSpacer height={"3rem"}/>
                    <Text size={"0.75rem"}>© 2023 StudAI. All rights reserved.</Text>
                    <HeightSpacer height={"3rem"}/>
                </StackColumnBox>
            </HomePage>
        </HomeBox>
    )
}

export default PageWrapper(Home);