import Link from "@material-ui/core/Link";
import React from 'react';

const Workplace = ({workplace}) => {
    return (
        <div>
            <Link>{workplace.name}</Link>
        </div>
    );
};

export default Workplace;
