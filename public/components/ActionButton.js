import Button from "@material-ui/core/Button";
import React from 'react';
import "../styles/ActionButton.scss";

const ActionButton = ({disabled, onClick, iconComponent: IconComponent, color = "primary"}) => {
    return (
        <Button styleName="action-button"
                variant="contained"
                color={color}
                disabled={disabled}
                onClick={onClick}>
            <IconComponent />
        </Button>
    );
};

export default ActionButton;
