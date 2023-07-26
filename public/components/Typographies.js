import {styled, Typography} from "@mui/material";

const Text = styled(Typography)(({size}) => ({
    color: "var(--main-black, #3F3636)",
    fontFamily: "Inter",
    textTransform: "none",
    fontSize: size ? size : "1rem",
}));

export const BoldText = styled(Text)({
    fontWeight: "bold",
});

export const WhiteBoldText = styled(BoldText)({
    color: "#F2F2F2",
})

export const FadedBoldText = styled(BoldText)({
    opacity: 0.5,
});