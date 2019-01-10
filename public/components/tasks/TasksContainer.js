import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks} from "../../actions/tasksActions";
import {TasksTree} from "./TasksTree";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import styles from "../../styles/EmployeesList.scss";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "../../../node_modules/@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import MbCard from "../MbCard";

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    onCreate = () => {
        this.props.openCreateTaskModal({});
    };

    onDoubleClickTask = (task) => {
        this.props.openTask();
    };

    render() {
        const {tasks} = this.props;

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

                {/*<BreadCrumb />*/}
                {tasks && tasks.map(task =>
                    <div>{task.name}</div>
                )}
                <TasksTree tasks={tasks}/>
            </MbCard>
        );
    }
}

TasksContainer.propTypes = {
};

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        initialValues: {
            user: state.user
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        openCreateTaskModal: () => dispatch(openCreateTaskModal())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(TasksContainer));

