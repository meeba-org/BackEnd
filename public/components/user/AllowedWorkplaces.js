import React from 'react';
import Link from '@material-ui/core/Link';
import MbCard from "../MbCard";
import Workplace from "./Workplace";

const AllowedWorkplaces = ({workplaces, onAdd, onDelete, onUpdate}) => {
    return (
        <MbCard title="מקומות עבודה">
            <Link onClick={onAdd}>הוסף</Link>
            {workplaces && workplaces.map((workplace, index) =>
                <Workplace key={index} workplace={workplace} onDelete={() => onDelete(workplace)}
                           onUpdate={() => onUpdate(workplace)}/>
            )}
        </MbCard>
    );
};

export default AllowedWorkplaces;
