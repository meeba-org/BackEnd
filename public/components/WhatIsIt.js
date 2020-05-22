import Typography from "@material-ui/core/Typography";
import React from 'react';
import {Link} from "react-router-dom";

const WhatIsIt = ({link}) => {
    if (!link)
        return null;

    return (
        <Typography variant={"caption"}>
            <Link to={link} target="_blank">מה זה?</Link>
        </Typography>
    );
};

export default WhatIsIt;
