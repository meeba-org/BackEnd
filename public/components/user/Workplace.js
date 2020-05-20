import {Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import React from 'react';

const Workplace = ({workplace, onDelete, onUpdate}) => {
    return (
        <Box flexDirection={"row"}>
            <Link onClick={onUpdate}>{workplace.name}</Link>
            <Button onClick={onDelete}>Delete</Button>
        </Box>
    );
};

export default Workplace;
