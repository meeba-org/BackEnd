import HomeIcon from "@material-ui/icons/Home";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import React, {Fragment} from "react";

export const BreadCrumb = ({data, onSelectTask}) => {
    return (
        <Fragment>
            <HomeIcon style={{color: "grey"}} onClick={() => onSelectTask()}/>
            {data && data.map((task) => (
                <Fragment>
                    <KeyboardArrowLeftIcon style={{color: "grey"}}/>
                    <span onClick={() => onSelectTask(task)}>{task.title}</span>
                </Fragment>
            ))}
        </Fragment>
    );
};
