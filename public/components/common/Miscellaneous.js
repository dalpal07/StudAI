import {styled, TableCell} from "@mui/material";
import Image from "next/image";

export const Cell = styled(TableCell)(({rowindex}) => ({
    padding: "0.5rem",
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: rowindex === 0 ? "bold" : "normal",
    lineHeight: "normal",
    textTransform: "none",
}));

const ChatBubbleTail = styled(Image)({
    paddingBottom: "11px",
});

export const ChatBubbleTailLeft = styled(ChatBubbleTail)({
    marginRight: "-10px"
});

export const ChatBubbleTailRight = styled(ChatBubbleTail)({
    marginLeft: "-10px"
});

export const HiddenHref = styled("a")({
    textDecoration: "none",
})

export const FooterHref = styled("a")({
    color: "var(--main-black, #3F3636)",
});