import React from 'react';
import Link from '@material-ui/core/Link';
import MbCard from "../MbCard";
import Workplace from "./Workplace";

const AllowedWorkplaces = ({workplaces, onAdd}) => {
    return (
        <MbCard title="מקומות עבודה">
            <Link onClick={onAdd}>הוסף</Link>
            {workplaces && workplaces.map(workplace => <Workplace workplace={workplace}/>)}
        </MbCard>
    );
};

export default AllowedWorkplaces;
