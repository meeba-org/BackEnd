import List from "@material-ui/core/List/List";
import React, {Component} from 'react';
import Task from "./Task";
import ETaskType from "../../../models/ETaskType";

class TasksList extends Component {

    render() {
        const {tasks, onClick, onDoubleClick, onEdit, onDelete, selectMode, isLimited} = this.props;

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
    }
}

TasksList.defaultProps = {
    onDoubleClick: () => {},
    onClick: () => {},
};

export default TasksList;
