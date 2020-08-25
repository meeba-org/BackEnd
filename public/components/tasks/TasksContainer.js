import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from 'react';
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

const TasksContainer = ({openTaskModal, showDeleteTaskModal, isEditAllowed, isAddAllowed, fetchTasks, tasks, company}) => {
    const [breadcrumbTasks, setBreadcrumbTasks] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []); 

    const onCreate = () => {
        let parent = (!selectedParent) ? null : selectedParent._id;
        let newTask = {
            company,
            parent: parent,
            title: ""
        };
        openTaskModal(newTask);
    };

    const onSelectTask = (selectedTask) => {
        let breadcrumbTasks = [];
        setSelectedParent(selectedTask);

        while (selectedTask) {
            breadcrumbTasks.push(selectedTask);
            selectedTask = tasks.find(task=> task._id === selectedTask.parent); // Go up one level
        }

        setBreadcrumbTasks(breadcrumbTasks);
    };

    let processedtasks = filterTasks(tasks, selectedParent);
    let NOT_ALLOW_TO_ADD_MESSAGE = `במסלול החינמי מספר המשימות המקסימלי הוא ${MAX_FREE_TASKS_ALLOWED}`;

    return (
        <MbCard title="משימות / אירועים">
            <MbActionsControls>
                <Tooltip title={isAddAllowed ? "הוספת משימה" : NOT_ALLOW_TO_ADD_MESSAGE} placement="top">
                        <span>
                            <MbActionButton
                                disabled={!isAddAllowed}
                                onClick={onCreate}
                                iconComponent={AddIcon}
                            />
                        </span>
                </Tooltip>
            </MbActionsControls>

            <GoPremiumNotification isVisible={!isAddAllowed} text={NOT_ALLOW_TO_ADD_MESSAGE} />

            <BreadCrumb
                data={breadcrumbTasks}
                onSelectTask={onSelectTask}
            />
            {processedtasks && processedtasks.length > 0 &&
            <TasksList
                tasks={processedtasks}
                onEdit={openTaskModal}
                onDelete={showDeleteTaskModal}
                onClick={onSelectTask}
                isLimited={!isEditAllowed}
            />
            }
        </MbCard>
    );
};

const mapStateToProps = state => ({
    tasks: state.tasks,
    company: selectors.getCompany(state),
    isAddAllowed: selectors.isTasksEnable(state) && (selectors.hasPremiumFeature(state) || state.tasks?.filter(t => !t.parent && t.type === ETaskType.REGULAR).length < MAX_FREE_TASKS_ALLOWED),
    isEditAllowed: selectors.hasPremiumFeature(state) || (state.tasks?.filter(t => !t.parent && t.type === ETaskType.REGULAR).length <= MAX_FREE_TASKS_ALLOWED),
});

const mapDispatchToProps = {
    fetchTasks,
    openTaskModal,
    showDeleteTaskModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);

