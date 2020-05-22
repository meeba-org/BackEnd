import Box from "@material-ui/core/Box";
import React from 'react';
import Link from '@material-ui/core/Link';
import MbCard from "../MbCard";
import WhatIsIt from "../WhatIsIt";
import Workplace from "./Workplace";
import "../../styles/AllowedWorkplaces.scss";

const AllowedWorkplaces = ({workplaces, onAdd, onDelete, onUpdate}) => {
    return (
        <MbCard title="מקומות עבודה">
            {workplaces && workplaces.map((workplace, index) =>
                (<Workplace
                    key={index}
                    workplace={workplace}
                    onDelete={() => onDelete(workplace)}
                    onUpdate={() => onUpdate(workplace)}
                />)
            )}
            <Box styleName="add-container" display={"flex"} flexDirection={"row"} justifyItems={"center"}>
                <Link styleName="add" onClick={onAdd}>הוסף</Link>
                <WhatIsIt link={"/faq/workplaces"}/>
            </Box>
        </MbCard>
    );
};

export default AllowedWorkplaces;
