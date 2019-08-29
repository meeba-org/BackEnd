import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {MAX_FREE_EMPLOYEES_ALLOWED, MAX_FREE_TASKS_ALLOWED} from "../../../constants";
import {fetchTasks, openTaskModal, showDeleteTaskModal} from "../../actions/tasksActions";
import * as selectors from "../../selectors";
import styles from "../../styles/EmployeesList.scss";
import GoPremiumNotification from "../go-premium/GoPremiumNotification";
import MbCard from "../MbCard";
import BreadCrumb from "./BreadCrumb";
import {filterTasks} from "./TaskService";
import TasksList from "./TasksList";

class TasksContainer extends React.Component {

    state = {
        breadcrumbTasks: [],
        selectedParent: null,
    };

    componentDidMount() {
        this.props.fetchTasks();
    }

    onCreate = () => {
        let parent = (!this.state.selectedParent) ? null : this.state.selectedParent._id;
        let newTask = {
            company: this.props.company,
            parent: parent,
            title: ""
        };
        this.props.openTaskModal(newTask);
    };

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
        const {openTaskModal, showDeleteTaskModal, isEditAllowed, isAddAllowed} = this.props;
        let {breadcrumbTasks, selectedParent} = this.state;
        let tasks = filterTasks(this.props.tasks, selectedParent);
        let NOT_ALLOW_TO_ADD_MESSAGE = `במסלול החינמי מספר העובדים המקסימלי הוא ${MAX_FREE_EMPLOYEES_ALLOWED}`;

        return (
            <MbCard title="משימות / אירועים">
                <div className={styles["controls-line"]}>
                    <Tooltip title={isAddAllowed ? "הוספת משימה" : NOT_ALLOW_TO_ADD_MESSAGE} placement="top">
                        <span>
                        <Button className={styles["action-button"]}
                                variant="contained" color="primary"
                                disabled={!isAddAllowed}
                                onClick={this.onCreate}><AddIcon/>
                        </Button>
                        </span>
                    </Tooltip>
                </div>

                <Divider className={styles["divider"]}/>

                <GoPremiumNotification isVisible={!isAddAllowed} text={NOT_ALLOW_TO_ADD_MESSAGE} />

                <BreadCrumb
                    data={breadcrumbTasks}
                    onSelectTask={this.onSelectTask}
                />
                {tasks && tasks.length > 0 &&
                <TasksList
                    tasks={tasks}
                    onEdit={openTaskModal}
                    onDelete={showDeleteTaskModal}
                    onClick={this.onSelectTask}
                    isLimited={!isEditAllowed}
                />
                }
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
        isAddAllowed: selectors.hasPremiumFeature(state) || (state.tasks && state.tasks.filter(t => !t.parent).length < MAX_FREE_TASKS_ALLOWED),
        isEditAllowed: selectors.hasPremiumFeature(state) || (state.tasks && state.tasks.filter(t => !t.parent).length <= MAX_FREE_TASKS_ALLOWED),
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
})(TasksContainer));

