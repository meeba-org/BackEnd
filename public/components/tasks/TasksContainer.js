import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks, openTaskModal} from "../../actions/tasksActions";
import {TasksTree} from "./TasksTree";
import styles from "../../styles/EmployeesList.scss";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import MbCard from "../MbCard";
import * as selectors from "../../selectors";

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    onCreate = () => {
         let newTask = {
             company: this.props.company
         };
        this.props.openTaskModal(newTask);
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
                    <div>{task.title}</div>
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
        company: selectors.getCompany(state),
        initialValues: {
            user: state.user
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        openTaskModal: (task) => dispatch(openTaskModal(task))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(TasksContainer));

