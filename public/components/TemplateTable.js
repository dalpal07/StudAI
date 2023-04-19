import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell,
    TableContainer, TableHead, TextField, Checkbox, Select,
    MenuItem, Button } from "@mui/material";

export default function TemplateTable(props) {
    const [newRow, setNewRow] = useState({ header: '', type: 'string', required: false });

    const handleAddRow = () => {
        props.setRows([...props.rows, newRow]);
        setNewRow({ header: '', type: 'string', required: false });
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setNewRow({ ...newRow, [name]: inputValue });
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Header</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Required</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField name="header" value={row.header} onChange={handleInputChange} />
                                </TableCell>
                                <TableCell>
                                    <Select name="type" value={row.type} onChange={handleInputChange}>
                                        <MenuItem value="string">String</MenuItem>
                                        <MenuItem value="number">Number</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Checkbox name="required" checked={row.required} onChange={handleInputChange} />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField name="header" value={newRow.header} onChange={handleInputChange} />
                            </TableCell>
                            <TableCell>
                                <Select name="type" value={newRow.type} onChange={handleInputChange}>
                                    <MenuItem value="string">String</MenuItem>
                                    <MenuItem value="number">Number</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Checkbox name="required" checked={newRow.required} onChange={handleInputChange} />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={handleAddRow}>
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
