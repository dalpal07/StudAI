import {LoadingBox, LoadingContainer, Spinner} from "@/public/components/common/Boxes";
import {BoldText} from "@/public/components/common/Typographies";

export default function Loading(props) {
    if (props.dataProcessing) {
        return (
            <LoadingContainer>
                <LoadingBox>
                    <Spinner/>
                    <BoldText size={"1.5rem"}>Processing Your Data...</BoldText>
                </LoadingBox>
            </LoadingContainer>
        )
    }
}