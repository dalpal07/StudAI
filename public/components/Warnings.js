import {Box, styled, Typography} from "@mui/material";

const WarningBox = styled(Box) ({
   marginBottom: '5rem'
});

function Warnings(props) {
    return (
        <WarningBox>
            {props.warnings.map((warning, index) => (
                <Typography key={index} color="error">
                    {warning.msg}
                </Typography>
            ))}
        </WarningBox>
    );
}

export default Warnings;
