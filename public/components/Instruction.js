import {Box, TextareaAutosize} from "@mui/material";
import {styled} from "@mui/material/styles";

const LongTextInput = styled(TextareaAutosize) ({
    width: '50em',
    resize: 'none',
    fontSize: '1.1rem',
});

export default function Instruction(props) {
    return (
        <Box>
            <LongTextInput type={"text"} placeholder={"Enter instruction here..."} onChange={(e) => props.setInstruction(e.target.value)}/>
        </Box>
    );
}
