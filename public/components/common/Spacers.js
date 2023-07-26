import {Box, styled} from "@mui/material";

export const WidthSpacer = styled(Box)(({width}) => ({
    width: width,
}));

export const HeightSpacer = styled(Box)(({height}) => ({
    height: height,
}));

export const WidthHeightSpacer = styled(Box)(({width, height}) => ({
    width: width,
    height: height,
}));

export const WidthFlexSpacer = styled(Box)({
    width: "100%",
    flex: "1 0 0",
});

export const HeightFlexSpacer = styled(Box)({
    height: "100%",
});