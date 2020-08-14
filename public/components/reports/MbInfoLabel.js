import {Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from 'react';
import "../../styles/MbInfoLabel.scss";

const MbInfoLabel = ({label, value, tooltip}) => {
    return (
        <Tooltip title={tooltip} placement="top">
            <Box display="flex" flexDirection="row" styleName="container">
                <Box styleName="label" fontSize="body1.fontSize">{label}</Box>
                <Box fontWeight="bold" color={"primary.main"} fontSize="body1.fontSize">{value}</Box>
            </Box>
        </Tooltip>
    );
};

export default MbInfoLabel;
