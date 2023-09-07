import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import {BoldText, Text} from "@/public/components/common/Typographies";
import {StackColumnBox, StackRowBox} from "@/public/components/common/Boxes";
import {
    cancelSubscription,
    selectCancelAtEnd,
    selectDate, selectRequests,
    selectType
} from "@/slices/subscriptionSlice";
import {useDispatch, useSelector} from "react-redux";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {DefaultButton} from "@/public/components/common/Buttons";
import {selectSub} from "@/slices/userSlice";

function Subscription() {
    const sub = useSelector(selectSub);
    const requests = useSelector(selectRequests);
    const type = useSelector(selectType);
    const cancelAtEnd = useSelector(selectCancelAtEnd);
    const date = new Date(useSelector(selectDate));
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date ? date.toLocaleDateString('en-US', options) : "";
    const dispatch = useDispatch();
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
                    <BoldText>Requests:</BoldText>
                </StackRowBox>
                <StackRowBox style={{
                    width: "50%",
                    justifyContent: "flex-end",
                }}>
                    <Text>{requests || 0}</Text>
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