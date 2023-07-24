import {Box, Button, Input, styled, Typography} from "@mui/material";

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

const DragDropTypography = styled(Typography)({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "1.125rem",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
});

const DragDropSubTypography = styled(Typography)({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    opacity: 0.5,
});

const FileButton = styled(Button) (({isDraggingOver}) => ({
    color: "white",
    display: "flex",
    padding: "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    backgroundColor: isDraggingOver ? 'gray' : 'var(--main-green, #53B753)',
    textTransform: "none",
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
                <DragDropTypography>Drag and drop messy data here</DragDropTypography>
                <DragDropSubTypography>Make sure your files are messy</DragDropSubTypography>
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