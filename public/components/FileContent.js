import {Box, styled, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";

const TableContainer = styled(Box)({
    width: "100%",
    height: "100%",
    overflow: "scroll",
});

const Cell = styled(TableCell)(({rowIndex}) => ({
    padding: "0.5rem",
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: rowIndex === 0 ? "bold" : "normal",
    lineHeight: "normal",
    textTransform: "none",
}));
export default function FileContent(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.headers.map((header, index) => (
                            <Cell key={index} rowIndex={0}>
                                {header}
                            </Cell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.entries.map((entry, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {entry.map((cell, cellIndex) => (
                                <Cell key={cellIndex}>
                                    {cell}
                                </Cell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}