import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import React from 'react';
import "../styles/ActionButton.scss";

const ActionButton = ({disabled, onClick, iconComponent: IconComponent, color = "primary"}) => {
    return (
        <Button styleName="action-button"
                variant="contained"
                color={color}
                disabled={disabled}
                onClick={onClick} >
            <IconComponent />
        </Button>
    );
};

const MbActionButton = ({tooltip, ...props}) => {
    if (tooltip)
        return (<Tooltip title={tooltip} placement="top"><span>
            <ActionButton {...props} />
        </span></Tooltip>);
    else
        return <ActionButton {...props} />;
};

export default MbActionButton;
