import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import List from "../../../node_modules/@material-ui/core/List/List";
import {fetchTasks, openTaskModal} from "../../actions/tasksActions";
import * as selectors from "../../selectors";
import styles from "../../styles/EmployeesList.scss";
import MbCard from "../MbCard";
import Task from "./Task";

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
        const {tasks, openTaskModal} = this.props;

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
                <List>
                {tasks && tasks.map((task, index) =>
                    (<Task
                        key={index}
                        data={task}
                        openTaskModal={openTaskModal}
                        onDelete={() => {}}
                    />)
                )}
                </List>
                {/*<TasksTree tasks={tasks}/>*/}
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

