import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import {TableContainer} from "@/public/components/common/Boxes";
import {Cell} from "@/public/components/common/Miscellaneous";
import {useSelector} from "react-redux";
import {selectCurrentFileEntries, selectCurrentFileHeaders} from "@/slices/fileSlice";

export default function FileContent() {
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {currentFileHeaders.map((header, index) => (
                            <Cell key={index} rowIndex={0}>
                                {header}
                            </Cell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentFileEntries.map((entry, rowIndex) => (
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