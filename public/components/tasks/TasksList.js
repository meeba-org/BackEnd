import List from "@material-ui/core/List/List";
import React, {Component} from 'react';
import Task from "./Task";
import {filterTasks} from "./TaskService";

class TasksList extends Component {
    state = {
        tasks: this.props.tasks
    };

    onDoubleClick = (task) => {
        const {tasks} = this.props;
        this.setState({tasks: filterTasks(tasks, task._id)});
    };

    render() {
        let {tasks} = this.state;
        const {onEdit, onDelete} = this.props;
        return (
            <List>
                {tasks && tasks.map((task, index) =>
                    (<Task
                        key={index}
                        data={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDoubleClick={this.onDoubleClick}
                    />)
                )}
            </List>
        );
    }
}

export default TasksList;
