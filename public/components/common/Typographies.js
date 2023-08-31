import {styled, Typography} from "@mui/material";

export const Text = styled(Typography)(({size}) => ({
    color: "var(--main-black, #1C1A1A)",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: size ? size : "1rem",
    lineHeight: "normal",
    textTransform: "none",
}));

export const GrayText = styled(Text)({
    color: "var(--50-black, rgba(28, 26, 26, 0.50))",
});

export const GrayBoldText = styled(GrayText)({
    fontWeight: "bold",
});

export const BoldText = styled(Text)({
    fontWeight: "bold",
});

export const GreenBoldText = styled(BoldText)({
    color: "var(--main-green, #53B753)",
});

export const WhiteBoldText = styled(BoldText)({
    color: "#F2F2F2",
})

export const FadedBoldText = styled(BoldText)({
    opacity: 0.5,
});