import Box from "@material-ui/core/Box";
import React from 'react';
import "../../styles/MbInfoLabel.scss";

const MbInfoLabel = ({label, value}) => {
    return (
        <Box display="flex" flexDirection="row" styleName="container">
            <Box styleName="label" fontSize="body1.fontSize">{label}</Box>
            <Box fontWeight="bold" color={"primary.main"} fontSize="body1.fontSize">{value}</Box>
        </Box>
    );
};

export default MbInfoLabel;
