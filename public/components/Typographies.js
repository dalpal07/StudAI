import {styled, Typography} from "@mui/material";

const Text = styled(Typography)({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    textTransform: "none",
});

const BoldText = styled(Text)({
    fontWeight: "bold",
});

export const LargeBoldText = styled(BoldText)({
    fontSize: "1.125rem",
});

export const LargerBoldText = styled(BoldText)({
    fontSize: "1.75rem",
});

export const WhiteLargeBoldText = styled(LargeBoldText)({
    color: "#F2F2F2",
})

export const TitleText = styled(BoldText) ({
    fontSize: "1.5rem",
});

export const SmallBoldText = styled(BoldText)({
    fontSize: "0.875rem",
});

export const FadedSmallBoldText = styled(SmallBoldText)({
    opacity: 0.5,
});