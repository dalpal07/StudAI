import {Button, styled} from "@mui/material";

export const DefaultButton = styled(Button)(({size, padding}) => ({
    display: "flex",
    padding: padding ? padding : "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    textTransform: "none",
    background: "#E3E3E3",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: size ? size : "0.875rem",
    fontWeight: "bold",
    "&:hover": {
        background: "#D6D6D6",
    },
    "&:disabled": {
        backgroundColor: "#D6D6D6",
        color: "#3F3636",
        opacity: 0.5,
    },
}));
export const GreenButton = styled(DefaultButton)({
    background: "var(--main-green, #53B753)",
    color: "var(--main-white, #F2F2F2)",
    "&:hover": {
        background: "var(--main-green-hover, #4AAE4A)",
    },
});
export const IconButton = styled(Button)({
    border: "none",
    width: "fit-content",
    height: "fit-content",
    padding: "0",
});
export const UploadBoxButton = styled(Button) (({isDraggingOver}) => ({
    width: "100%",
    display: "flex",
    height: "100%",
    maxHeight: "25rem",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
    alignSelf: "stretch",
    borderRadius: "1.25rem",
    border: "2px dashed var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    background: "#E3E3E3",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10) inset",
    backgroundColor: isDraggingOver ? '#F5F5F5' : 'transparent'
}))
export const MenuButton = styled(Button)(({top}) => ({
    position: "absolute",
    top: top,
    right: 0,
    background: "#F2F2F2",
    color: "var(--main-black, #3F3636)",
    textTransform: "none",
    fontFamily: "Inter",
    boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 0px rgba(0, 0, 0, 0.15), 0px 10px 20px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: 0,
    width: "7rem",
    justifyContent: "left",
}));
export const UndoRedoButton = styled(Button)({
    padding: "0.5rem 1.5rem",
    backgroundColor: "var(--main-gray, #E5E5E5)",
    color: "var(--main-black, #3F3636)",
    "&:hover": {
        background: "#D6D6D6",
    }
});
export const PricingPlanButton = styled(Button)({
    backgroundColor: "#F2F2F2",
    borderColor: "var(--main-green, #53B753)",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "1.25rem",
    color: "var(--main-black, #3F3636)",
    opacity: 1,
    width: "15rem",
    height: "25rem",
    textTransform: "none",
    overflow: "wrap",
    overflowWrap: "break-word",
    alignItems: "flex-start",
    "&:disabled": {
        opacity: 0.5,
    }
});