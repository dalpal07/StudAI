import {Box, Input, styled} from "@mui/material";
import {BoldText, FadedBoldText, WhiteBoldText} from "@/public/components/Typographies";
import {GreenButton} from "@/public/components/Buttons";

const FileInput = styled(Input) ({
    display: 'none'
})

const TextBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
});

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
            <FileInput
                id="fileInput"
                type={"file"}
                onChange={handleUpload}
            />
            <GreenButton htmlFor="fileInput" onClick={handleButtonClick} disabled={props.dataProcessing || props.isDraggingOver}>
                Upload Messy Data
            </GreenButton>
        </>
    )
}