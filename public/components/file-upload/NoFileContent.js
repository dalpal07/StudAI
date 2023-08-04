import {BoldText, FadedBoldText} from "../../../public/components/common/Typographies";
import {GreenButton} from "../../../public/components/common/Buttons";
import {TextBox} from "../../../public/components/common/Boxes";
import {HiddenInput} from "../../../public/components/common/Inputs";

export default function NoFileContent(props) {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        props.handleFileChange(file)
    }
    const handleButtonClick = () => {
        // Trigger the click event on the hidden file input
        document.getElementById("fileInput").click();
    };
    return (
        <>
            <TextBox>
                <BoldText size={"1.125rem"}>Drag and drop messy data here</BoldText>
                <FadedBoldText size={"0.875rem"}>Make sure your files are messy</FadedBoldText>
            </TextBox>
            <HiddenInput
                id="fileInput"
                type={"file"}
                onChange={handleUpload}
            />
            <GreenButton htmlFor="fileInput" onClick={handleButtonClick} disabled={props.disabled || props.isDraggingOver}>
                Upload Messy Data
            </GreenButton>
        </>
    )
}