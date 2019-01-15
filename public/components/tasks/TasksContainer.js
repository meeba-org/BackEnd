import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks, openTaskModal, showDeleteTaskModal} from "../../actions/tasksActions";
import * as selectors from "../../selectors";
import styles from "../../styles/EmployeesList.scss";
import MbCard from "../MbCard";
import {BreadCrumb} from "./BreadCrumb";
import {filterTasks} from "./TaskService";
import TasksList from "./TasksList";

class TasksContainer extends React.Component {

    state = {
        breadcrumbTasks: []
    };

    componentDidMount() {
        this.props.fetchTasks();
    }

    onCreate = () => {
         let newTask = {
             company: this.props.company,
             parent: this.state.parent,
         };
        this.props.openTaskModal(newTask);
    };

    onSelectTask = (selectedTask) => {
        let breadcrumbTasks = [];
        const {tasks} = this.props;

        while (!!selectedTask) {
            breadcrumbTasks.push(selectedTask);
            selectedTask = tasks.find(task=> task._id === selectedTask.parent); // Go up one level
        }

        this.setState({breadcrumbTasks});
    };

    render() {
        const {tasks, openTaskModal, showDeleteTaskModal} = this.props;
        let {breadcrumbTasks} = this.state;

        return (
            <MbCard title="משימות / אירועים">
                <div className={styles["controls-line"]}>
                    <Tooltip title="הוספת משימה" placement="top">
                        <Button className={styles["action-button"]}
                                variant="raised" color="primary"
                                onClick={this.onCreate}><AddIcon/>
                        </Button>
                    </Tooltip>
                </div>

                <Divider className={styles["divider"]}/>


                <BreadCrumb data={breadcrumbTasks}/>
                <TasksList
                    tasks={tasks}
                    onEdit={openTaskModal}
                    onDelete={showDeleteTaskModal}
                    onDoubleClick={this.onSelectTask}
                />
            </MbCard>
        );
    }
}

TasksContainer.propTypes = {
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
        filterTasks: (parent) => dispatch(filterTasks(parent)),
        openTaskModal: (task) => dispatch(openTaskModal(task)),
        showDeleteTaskModal: (task) => dispatch(showDeleteTaskModal(task)),

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(TasksContainer));

