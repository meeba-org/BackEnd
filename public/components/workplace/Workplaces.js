import {Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import React from 'react';
import "../../styles/AllowedWorkplaces.scss";
import MbCard from "../MbCard";
import WhatIsIt from "../WhatIsIt";
import Workplace from "./Workplace";

const Workplaces = ({workplaces, onAdd, onDelete, onUpdate, isAddAllowed}) => {
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
                <AddWorkplaceButton color="primary" styleName="add" tooltip={isAddAllowed ? "" : "מוגבל ל-2 מקומות עבודה עפ\" הרשות לחדשנות"} disabled={!isAddAllowed} onClick={onAdd}>הוסף</AddWorkplaceButton>
                <WhatIsIt link={"/faq/workplaces"}/>
            </Box>
        </MbCard>
    );
};

const AddWorkplaceButton = ({tooltip, ...props}) => {
    if (tooltip)
        return (<Tooltip title={tooltip} placement="top"><span>
            <Button {...props} />
        </span></Tooltip>);
    else
        return <Button {...props} />;
};

export default Workplaces;
