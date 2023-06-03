import {Box, Input} from "@mui/material";

export default function Instruction(props) {
    return (
        <Box>
            <Input type={"text"} placeholder={"Enter instruction here..."} onChange={(e) => props.setInstruction(e.target.value)}/>
        </Box>
    );
}
