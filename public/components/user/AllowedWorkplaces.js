import React from 'react';
import Link from '@material-ui/core/Link';
import MbCard from "../MbCard";
import Workplace from "./Workplace";

const AllowedWorkplaces = ({workplaces, onAdd, onDelete}) => {
    return (
        <MbCard title="מקומות עבודה">
            <Link onClick={onAdd}>הוסף</Link>
            {workplaces && workplaces.map((workplace, index) => <Workplace workplace={workplace} key={index} onDelete={() => onDelete(workplace)}/>)}
        </MbCard>
    );
};

export default AllowedWorkplaces;
