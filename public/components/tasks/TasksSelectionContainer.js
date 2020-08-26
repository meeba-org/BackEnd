import FormLabel from '@material-ui/core/FormLabel';
import {withStyles} from '@material-ui/core/styles';
import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from "../../actions/tasksActions";
import {getTasks} from "../../selectors";
import BreadCrumb from "./BreadCrumb";
import {filterTasks} from "./TaskService";
import TasksList from "./TasksList";

const styles = {
    title: {
        paddingTop: "10px"
    }
};

const TasksSelectionContainer = ({classes, task, tasks, fetchTasks, onChange}) => {
    useEffect(() => {
        fetchTasks();
    }, []);
    
    const buildBreadcrumb = (task, tasks) => {
        let breadcrumbTasks = [];
        let currTask = task ? {...task} : null;

        while (currTask) {
            breadcrumbTasks.push(currTask);
            currTask = tasks.find(t => t._id === currTask.parent); // Go up one level
        }
        return breadcrumbTasks;
    };

    let currentLevelTasks = filterTasks(tasks, task);
    let breadcrumbTasks = buildBreadcrumb(task, tasks);
    
    return (
        <Fragment>
            <FormLabel classes={{root: classes.title}}>משימה</FormLabel>
            <BreadCrumb
                data={breadcrumbTasks}
                onSelectTask={onChange}
            />
            {currentLevelTasks && currentLevelTasks.length > 0 &&
            <TasksList
                tasks={currentLevelTasks}
                onClick={onChange}
                selectMode
            />
            }
        </Fragment>
    );
};

TasksSelectionContainer.defaultProps = {
    onDoubleClick: () => {},
    onClick: () => {},
};

const mapStateToProps = state => ({
    tasks: getTasks(state),
});

const mapDispatchToProps = {
    fetchTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TasksSelectionContainer));

