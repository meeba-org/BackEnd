import List from "@material-ui/core/List/List";
import React from 'react';
import ETaskType from "../../../models/ETaskType";
import Task from "./Task";

const TasksList = ({tasks, onClick, onDoubleClick, onEdit, onDelete, selectMode, isLimited}) => {
    return (
        <List>
            {tasks && tasks.map((task, index) =>
                (<Task
                    key={index}
                    data={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onClick={(task) => onClick(task)}
                    onDoubleClick={(task) => onDoubleClick(task)}
                    selectMode={selectMode}
                    isLimited={isLimited || (!selectMode && task.type !== ETaskType.REGULAR)}
                />)
            )}
        </List>
    );
};

TasksList.defaultProps = {
    onDoubleClick: () => {},
    onClick: () => {},
};

export default TasksList;
