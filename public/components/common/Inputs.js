import {Input, styled} from "@mui/material";

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