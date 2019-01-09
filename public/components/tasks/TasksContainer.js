import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks} from "../../actions/tasksActions";
import {TasksTree} from "./TasksTree";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        const {tasks} = this.props;

        return (
            <Card>
                <CardHeader title="משימות / אירועים"/>

                <CardContent>
                    {/*<BreadCrumb />*/}
                    {tasks && tasks.map(task =>
                        <div>{task.name}</div>
                    )}
                    <TasksTree tasks={tasks} />
                </CardContent>
            </Card>
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
        fetchTasks: () => dispatch(fetchTasks())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(TasksContainer));

