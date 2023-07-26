import {Box, Button, Input, styled} from "@mui/material";
import { BoldText, FadedBoldText} from "@/public/components/Typographies";

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

const FileButton = styled(Button) (({isDraggingOver}) => ({
    color: isDraggingOver ? '#3F3636' : 'white',
    opacity: isDraggingOver ? 0.5 : 1,
    display: "flex",
    padding: "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    backgroundColor: isDraggingOver ? '#D6D6D6' : 'var(--main-green, #53B753)',
    textTransform: "none",
    "&:hover": {
        backgroundColor: isDraggingOver ? '#D6D6D6' : "var(--main-green-hover, #4AAE4A)",
    }
}))

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
            <FileButton htmlFor="fileInput" onClick={handleButtonClick} disabled={props.dataProcessing} isDraggingOver={props.isDraggingOver}>
                Upload Messy Data
            </FileButton>
        </>
    )
}