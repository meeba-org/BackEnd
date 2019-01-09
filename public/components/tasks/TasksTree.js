import React, {Fragment} from "react";

export const TasksTree = ({tasks}) => {
    return (
        <Fragment>
            {tasks.map(task => {
                <div>{task.name}</div>;
            })}
        </Fragment>
    );
};
