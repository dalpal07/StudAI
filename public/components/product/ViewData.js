import {BoldText, GrayBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer} from "@/public/components/common/Spacers";
import {WhiteButton} from "@/public/components/common/Buttons";
import {TableContainer, ViewDataBox, ViewDataContainer} from "@/public/components/common/Boxes";
import {useSelector} from "react-redux";
import {selectCurrentFileEntries, selectCurrentFileHeaders, selectCurrentFileName} from "@/slices/fileSlice";
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import {Cell} from "@/public/components/common/Miscellaneous";

export default function ViewData() {
    const currentFileName = useSelector(selectCurrentFileName);
    const currentFileHeaders = useSelector(selectCurrentFileHeaders);
    const currentFileEntries = useSelector(selectCurrentFileEntries);
    return (
        <ViewDataContainer>
            <ViewDataBox>
                {
                    currentFileName ?
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {currentFileHeaders.map((header, index) => (
                                                <Cell key={index} rowindex={0}>
                                                    {header}
                                                </Cell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentFileEntries.map((entry, rowindex) => (
                                            <TableRow key={rowindex}>
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
                        </>
                        :
                        <>
                            <BoldText size={"1.125rem"}>View data set here</BoldText>
                            <HeightSpacer height={"0.5rem"}/>
                            <GrayBoldText size={"0.875rem"}>Drag and drop from ‘My data sets’ or</GrayBoldText>
                            <HeightSpacer height={"1.5rem"}/>
                            <WhiteButton>
                                <BoldText size={"0.875rem"}>Select from my data sets</BoldText>
                            </WhiteButton>
                        </>
                }
            </ViewDataBox>
        </ViewDataContainer>
    )
}