import {Box, Typography} from "@mui/material";

function Warnings(props) {
    return (
        <Box>
            {props.warnings.map((warning, index) => (
                <Typography key={index} color="error">
                    {warning.msg}
                </Typography>
            ))}
        </Box>
    );
}

export default Warnings;
