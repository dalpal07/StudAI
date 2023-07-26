import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import {TableContainer} from "@/public/components/common/Boxes";
import {Cell} from "@/public/components/common/Miscellaneous";

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