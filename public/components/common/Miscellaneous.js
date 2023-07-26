import {styled, TableCell} from "@mui/material";

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