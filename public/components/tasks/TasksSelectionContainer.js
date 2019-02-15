import FormLabel from '@material-ui/core/FormLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks} from "../../actions/tasksActions";
import BreadCrumb from "./BreadCrumb";
import {filterTasks} from "./TaskService";
import TasksList from "./TasksList";

const styles = {
    title: {
        paddingTop: "10px"
    }
};

class TasksSelectionContainer extends React.Component {

    state = {
        breadcrumbTasks: [],
        selectedParent: null,
    };

    componentDidMount() {
        this.props.fetchTasks();
    }

    onSelectTask = (selectedTask) => {
        const {onChange} = this.props;
        this.setState({selectedParent: selectedTask});

        onChange(selectedTask);
    };

    buildBreadcrumb(task, tasks) {
        let breadcrumbTasks = [];
        let currTask = !!task ? {...task} : null;

        while (currTask) {
            breadcrumbTasks.push(currTask);
            currTask = tasks.find(t => t._id === currTask.parent); // Go up one level
        }
        return breadcrumbTasks;
    }

    render() {
        const {classes, task, tasks} = this.props;
        let currentLevelTasks = filterTasks(this.props.tasks, task);
        let breadcrumbTasks = this.buildBreadcrumb(task, tasks);

        return (
            <Fragment>
                <FormLabel classes={{root: classes.title}}>משימה</FormLabel>
                <BreadCrumb
                    data={breadcrumbTasks}
                    onSelectTask={this.onSelectTask}
                />
                {currentLevelTasks && currentLevelTasks.length > 0 &&
                <TasksList
                    tasks={currentLevelTasks}
                    onClick={this.onSelectTask}
                    selectMode
                />
                }
            </Fragment>
        );
    }
}

TasksSelectionContainer.propTypes = {
};

TasksSelectionContainer.defaultProps = {
    onDoubleClick: () => {},
    onClick: () => {},
};

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'tasksForm',
    enableReinitialize: true,
})(withStyles(styles)(TasksSelectionContainer)));

