import {OverlayContainer, StackRowBox, VerifyOverlayBox} from "../../../public/components/common/Boxes";
import {BoldText} from "../../../public/components/common/Typographies";
import {DefaultButton, GreenButton} from "../../../public/components/common/Buttons";
import {HeightFlexSpacer, WidthSpacer} from "../../../public/components/common/Spacers";

export default function Verify(props) {
    if (props.verify) {
        return (
            <OverlayContainer>
                <VerifyOverlayBox>
                    <HeightFlexSpacer/>
                    <BoldText>{props.message}</BoldText>
                    <HeightFlexSpacer/>
                    <StackRowBox>
                        <DefaultButton onClick={() => props.setVerified(false)}>
                            No
                        </DefaultButton>
                        <WidthSpacer width={"5rem"}/>
                        <GreenButton onClick={() => props.setVerified(true)}>
                            Yes
                        </GreenButton>
                    </StackRowBox>
                </VerifyOverlayBox>
            </OverlayContainer>
        )
    }
}