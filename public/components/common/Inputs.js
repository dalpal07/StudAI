import {Input, styled, TextareaAutosize} from "@mui/material";

export const ChatInput = styled(Input)(({ hasvalue }) => ({
    width: "100%",
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: hasvalue === "true" ? "normal" : "italic",
    fontWeight: "500",
    lineHeight: "normal",
}));
export const HiddenInput = styled(Input) ({
    display: 'none'
});
export const RequestInput = styled(TextareaAutosize)(({noInput}) => ({
    width: "100%",
    minHeight: "4.25rem",
    boxSizing: "border-box",
    padding: "1.125rem",
    borderRadius: "0.625rem",
    border: "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
    background: "#FEFEFE",
    resize: "none",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: noInput ? "italic" : "normal",
    fontWeight: "500",
    lineHeight: "normal",
    color: noInput ? "rgba(28, 26, 26, 0.5)" : "var(--main-black, #1C1A1A)",
    overflowY: "auto",
}));