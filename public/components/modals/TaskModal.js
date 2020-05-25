import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {createTask, hideTaskModal, updateTask} from "../../actions";
import TaskModalContent from "../TaskModalContent";

const TaskModal = ({orgTask, open}) => {

    const [task, setTask] = useState(orgTask);
    const dispatch = useDispatch();

    const handleCreateOrUpdateTask = () => {

        if (isNewTask())
            dispatch(createTask(task));
        else
            dispatch(updateTask(task));

        dispatch(hideTaskModal());
    };

    const isNewTask = () => {
        if (!task)
            return false;
        return !task._id;
    };

    const handleCancel = () => {
        dispatch(hideTaskModal());
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateOrUpdateTask();
        }
    };

    const handleChange = (key, value) => {
        setTask({
            ...task,
            [key]: value
        });
    };

    return (
        <TaskModalContent
            open={open}
            task={task}
            isNewTask={isNewTask()}
            onOk={handleCreateOrUpdateTask}
            onKeyPress={onKeyPress}
            onCancel={handleCancel}
            onChange={handleChange}
        />
    );
};

TaskModal.propTypes = {
    task: PropTypes.object,
    deleteTask: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(TaskModal);
