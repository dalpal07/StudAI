import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import {BoldText, Text} from "@/public/components/common/Typographies";
import {StackColumnBox, StackRowBox} from "@/public/components/common/Boxes";
import {
    cancelSubscription,
    selectCancelAtEnd,
    selectDate, selectProductAccess, selectRequests,
    selectType
} from "@/slices/subscriptionSlice";
import {useDispatch, useSelector} from "react-redux";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {DefaultButton} from "@/public/components/common/Buttons";
import {selectSub} from "@/slices/userSlice";
import {Button} from "@mui/material";
import {checkout} from "@/public/functions/Checkout";

function Subscription() {
    const sub = useSelector(selectSub);
    const productAccess = useSelector(selectProductAccess);
    const requests = useSelector(selectRequests);
    const type = useSelector(selectType);
    const cancelAtEnd = useSelector(selectCancelAtEnd);
    const date = new Date(useSelector(selectDate));
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date ? date.toLocaleDateString('en-US', options) : "";
    const dispatch = useDispatch();
    const red = (type === "free" && requests === 25) || (type === "standard" && requests === 150)
    if (!productAccess) return (
        <StackColumnBox style={{
            width: "100wh",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <HeightSpacer height={"1rem"}/>
            <StackRowBox style={{
                width: "15rem"
            }}>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-start",
                }}>
                    <BoldText size={"1.125rem"}>Select Plan:</BoldText>
                </StackRowBox>
            </StackRowBox>
            <StackColumnBox style={{
                width: "15rem"
            }}>
                <HeightSpacer height={"0.5rem"}/>
                <Button style={{
                    width: "100%",
                    justifyContent: "flex-start",
                    border: "1px solid black",
                    padding: "0.5rem",
                }}>
                    <StackRowBox style={{
                        width: "67%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <BoldText size={"1.125rem"}>Early Access</BoldText>
                    </StackRowBox>
                    <StackRowBox style={{
                        width: "33%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        <Text size={"1.125rem"}>$0.00</Text>
                    </StackRowBox>
                </Button>
                <HeightSpacer height={"0.25rem"}/>
                <Button style={{
                    width: "100%",
                    justifyContent: "flex-start",
                    border: "1px solid black",
                    padding: "0.5rem",
                }} onClick={() => checkout("standard", sub)}>
                    <StackRowBox style={{
                        width: "50%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                    <BoldText size={"1.125rem"}>Standard</BoldText>
                    </StackRowBox>
                    <StackRowBox style={{
                        width: "50%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        <Text size={"1.125rem"}>$4.99</Text>
                    </StackRowBox>
                </Button>
                <HeightSpacer height={"0.25rem"}/>
                <Button style={{
                    width: "100%",
                    justifyContent: "flex-start",
                    border: "1px solid black",
                    padding: "0.5rem",
                }} onClick={() => checkout("unlimited", sub)}>
                    <StackRowBox style={{
                        width: "50%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <BoldText size={"1.125rem"}>Unlimited</BoldText>
                    </StackRowBox>
                    <StackRowBox style={{
                        width: "50%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        <Text size={"1.125rem"}>$9.99</Text>
                    </StackRowBox>
                </Button>
            </StackColumnBox>
        </StackColumnBox>
    )
    return (
        <StackColumnBox style={{
            width: "100wh",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <BoldText size={"1.5rem"}>Subscription</BoldText>
            <HeightSpacer height={"1rem"}/>
            <StackRowBox style={{
                width: "15rem"
            }}>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-start",
                }}>
                    <BoldText>Plan:</BoldText>
                </StackRowBox>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-end",
                }}>
                    <Text>{type}</Text>
                </StackRowBox>
            </StackRowBox>
            <HeightSpacer height={"0.5rem"}/>
            <StackRowBox style={{
                width: "15rem"
            }}>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-start",
                }}>
                    {
                        cancelAtEnd ?
                            <BoldText>End Date:</BoldText>
                            :
                            <BoldText>Next Payment:</BoldText>
                    }
                </StackRowBox>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-end",
                }}>
                    <Text>{formattedDate}</Text>
                </StackRowBox>
            </StackRowBox>
            <HeightSpacer height={"0.5rem"}/>
            <StackRowBox style={{
                width: "15rem"
            }}>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-start",
                }}>
                    <BoldText style={{color: red ? "red" : "#1C1A1A"}}>Requests:</BoldText>
                </StackRowBox>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-end",
                }}>
                    <Text style={{color: red ? "red" : "#1C1A1A"}}>{requests || 0}</Text>
                </StackRowBox>
            </StackRowBox>
            {
                !cancelAtEnd &&
                    <StackColumnBox>
                        <HeightSpacer height={"1rem"}/>
                        <DefaultButton onClick={() => dispatch(cancelSubscription({id: sub}))}>
                            <BoldText size={"0.875rem"}>Cancel Subscription</BoldText>
                        </DefaultButton>
                    </StackColumnBox>
            }
        </StackColumnBox>
    )
}
export default PageWrapper(Subscription, true);