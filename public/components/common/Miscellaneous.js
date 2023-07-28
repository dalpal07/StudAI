import {styled, TableCell} from "@mui/material";
import Image from "next/image";

export const Cell = styled(TableCell)(({rowIndex}) => ({
    padding: "0.5rem",
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: rowIndex === 0 ? "bold" : "normal",
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