import FormLabel from '@material-ui/core/FormLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks, openTaskModal, showDeleteTaskModal} from "../../actions/tasksActions";
import * as selectors from "../../selectors";
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
        let breadcrumbTasks = [];
        const {tasks} = this.props;
        this.setState({selectedParent: selectedTask});

        while (selectedTask) {
            breadcrumbTasks.push(selectedTask);
            selectedTask = tasks.find(task=> task._id === selectedTask.parent); // Go up one level
        }

        this.setState({breadcrumbTasks});
    };

    render() {
        let {breadcrumbTasks, selectedParent} = this.state;
        const {classes} = this.props;
        let tasks = filterTasks(this.props.tasks, selectedParent);

        return (
            <Fragment>
                <FormLabel classes={{root: classes.title}}>משימה</FormLabel>
                <BreadCrumb
                    data={breadcrumbTasks}
                    onSelectTask={this.onSelectTask}
                />
                {tasks && tasks.length > 0 && 
                <TasksList
                    tasks={tasks}
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
        company: selectors.getCompany(state),
        initialValues: {
            user: state.user
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        openTaskModal: (task) => dispatch(openTaskModal(task)),
        showDeleteTaskModal: (task) => dispatch(showDeleteTaskModal(task)),

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'tasksForm',
    enableReinitialize: true,
})(withStyles(styles)(TasksSelectionContainer)));

