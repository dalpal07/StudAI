import {Button, styled} from "@mui/material";

export const DefaultButton = styled(Button)(({size, padding}) => ({
    display: "flex",
    padding: padding ? padding : "0.5rem 1.5rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    textTransform: "none",
    background: "#E9E9E9",
    color: "var(--main-black, #1C1A1A)",
    fontFamily: "Inter",
    fontSize: size ? size : "0.875rem",
    fontWeight: "bold",
    "&:hover": {
        background: "#D6D6D6",
    },
    "&:disabled": {
        // backgroundColor: "#D6D6D6",
        // color: "#3F3636",
        // opacity: 0.5,
    },
}));

export const WhiteButton = styled(DefaultButton)({
    background: "var(--ui-white, #F9F9F9)",
});
export const GreenButton = styled(DefaultButton)({
    background: "var(--main-green, #53B753)",
    color: "var(--main-white, #F2F2F2)",
    "&:hover": {
        background: "var(--main-green-hover, #4AAE4A)",
    },
    "&:disabled": {
        opacity: 0.5,
    }
});
export const UploadDataSetButton = styled(GreenButton)({
    width: "100%",
    padding: "1.125rem 1.75rem",
    borderRadius: "0.625rem",
});
export const ArrowButton = styled("button")({
    display: "flex",
    width: 44,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.625rem",
    alignSelf: "stretch",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.3125rem",
    background: "#E9E9E9",
    border: "none",
    cursor: "pointer",
    "&:disabled": {
        cursor: "default",
    }
});
export const IconButton = styled(Button)({
    border: "none",
    width: "fit-content",
    height: "fit-content",
    padding: "0",
    display: "flex",
});
export const HiddenButton = styled("button")({
    border: "none",
    width: "fit-content",
    height: "fit-content",
    padding: "0",
    display: "flex",
    background: "transparent",
    cursor: "pointer",
    "&:hover": {
        background: "transparent",
    }
});
export const UploadBoxButton = styled(Button) (({isDraggingOver}) => ({
    width: "100%",
    display: "flex",
    height: "100%",
    maxHeight: "22rem",
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
export const MenuButton = styled(Button)({
    textTransform: "none",
    color: "var(--main-black, #3F3636)",
    width: "fit-content",
    minWidth: "7rem",
    justifyContent: "flex-start",
    borderBottom: "1px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    borderRadius: "0",
    fontWeight: "bold",
    "&:hover": {
        background: "#D6D6D6",
    }
});
export const HelpMenuButton = styled(MenuButton)({
    width: "100%",
});
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