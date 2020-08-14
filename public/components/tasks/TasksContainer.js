import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React from 'react';
import {connect} from 'react-redux';
import {MAX_FREE_TASKS_ALLOWED} from "../../../constants";
import * as ETaskType from "../../../models/ETaskType";
import {fetchTasks, openTaskModal, showDeleteTaskModal} from "../../actions/tasksActions";
import * as selectors from "../../selectors";
import MbActionButton from "../MbActionButton";
import GoPremiumNotification from "../go-premium/GoPremiumNotification";
import MbActionsControls from "../MbActionsControls";
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
        let NOT_ALLOW_TO_ADD_MESSAGE = `במסלול החינמי מספר המשימות המקסימלי הוא ${MAX_FREE_TASKS_ALLOWED}`;

        return (
            <MbCard title="משימות / אירועים">
                <MbActionsControls>
                    <Tooltip title={isAddAllowed ? "הוספת משימה" : NOT_ALLOW_TO_ADD_MESSAGE} placement="top">
                        <span>
                            <MbActionButton
                                disabled={!isAddAllowed}
                                onClick={this.onCreate}
                                iconComponent={AddIcon}
                            />
                        </span>
                    </Tooltip>
                </MbActionsControls>

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
        isAddAllowed: selectors.isTasksEnable(state) && (selectors.hasPremiumFeature(state) || state.tasks?.filter(t => !t.parent && t.type === ETaskType.REGULAR).length < MAX_FREE_TASKS_ALLOWED),
        isEditAllowed: selectors.hasPremiumFeature(state) || (state.tasks?.filter(t => !t.parent && t.type === ETaskType.REGULAR).length <= MAX_FREE_TASKS_ALLOWED),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        openTaskModal: (task) => dispatch(openTaskModal(task)),
        showDeleteTaskModal: (task) => dispatch(showDeleteTaskModal(task)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);

