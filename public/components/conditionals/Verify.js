import {OverlayBox, OverlayContainer, StackRowBox} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";
import {DefaultButton, GreenButton} from "@/public/components/common/Buttons";
import {HeightFlexSpacer, WidthFlexSpacer} from "@/public/components/common/Spacers";

export default function Verify(props) {
    if (props.verify) {
        return (
            <OverlayContainer>
                <OverlayBox>
                    <HeightFlexSpacer/>
                    <BoldText>{props.message}</BoldText>
                    <HeightFlexSpacer/>
                    <StackRowBox>
                        <DefaultButton onClick={() => props.setVerified(false)}>
                            No
                        </DefaultButton>
                        <WidthFlexSpacer/>
                        <GreenButton onClick={() => props.setVerified(true)}>
                            Yes
                        </GreenButton>
                    </StackRowBox>
                </OverlayBox>
            </OverlayContainer>
        )
    }
}