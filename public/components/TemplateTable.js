import React, { useState } from 'react';
import {
    Table, TableBody, TableRow, TableCell,
    TableContainer, TableHead, TextField, Checkbox, Select,
    MenuItem, Button, styled
} from "@mui/material";

const TableCellHeader = styled(TableCell) ({
    fontWeight: 'bold',
    fontSize: '1.2rem'
});

const TemplateTableContainer = styled(TableContainer) ({
    marginTop: '2rem',
    marginBottom: '7em',
});

export default function TemplateTable(props) {
    const [newRow, setNewRow] = useState({ header: '', type: 'string', required: false, acceptableInput: '', specifyInput: false, id: 0 });

    const handleAddRow = () => {
        props.setRows([...props.rows, newRow]);
        setNewRow({ header: '', type: 'string', required: false, id: (newRow.id + 1) });
    };

    const handleInputChange = (rowID) => (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        if (rowID === undefined) {
            setNewRow({ ...newRow, [name]: inputValue });
        }
        else {
            const updatedRows = props.rows.map((row) => {
                if (row.id === rowID) {
                    return { ...row, [name]: inputValue };
                }
                return row;
            });
            props.setRows(updatedRows);
        }

    };

    const handleDeleteRow = (rowId) => (event) => {
        const updatedRows = props.rows.filter((row) => row.id !== rowId);
        props.setRows(updatedRows);
    };

    return (
        <div>
            <TemplateTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCellHeader>Header</TableCellHeader>
                            <TableCellHeader>Type</TableCellHeader>
                            <TableCellHeader>Required</TableCellHeader>
                            <TableCellHeader>Specify Input</TableCellHeader>
                            <TableCellHeader>Acceptable Input</TableCellHeader>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={handleAddRow}>Add Row</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField name="header" value={row.header} onChange={handleInputChange(row.id)}/>
                                </TableCell>
                                <TableCell>
                                    <Select name="type" value={row.type} onChange={handleInputChange(row.id)}>
                                        <MenuItem value="string">String</MenuItem>
                                        <MenuItem value="number">Number</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Checkbox name="required" checked={row.required} onChange={handleInputChange(row.id)}/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox name="specifyInput" checked={row.specifyInput} onChange={handleInputChange(row.id)}/>
                                </TableCell>
                                {(row.specifyInput &&
                                        <TableCell>
                                            <TextField name="acceptableInput" value={row.acceptableInput} onChange={handleInputChange(row.id)}/>
                                        </TableCell>)
                                || <TableCell></TableCell>
                                }
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={handleDeleteRow(row.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TemplateTableContainer>
        </div>
    );
}
