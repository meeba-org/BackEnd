import List from "@material-ui/core/List/List";
import React, {Component} from 'react';
import Task from "./Task";

class TasksList extends Component {

    render() {
        const {tasks, onDoubleClick, onEdit, onDelete} = this.props;

        return (
            <List>
                {tasks && tasks.map((task, index) =>
                    (<Task
                        key={index}
                        data={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDoubleClick={(task) => onDoubleClick(task)}
                    />)
                )}
            </List>
        );
    }
}

export default TasksList;
