import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {fetchTasks} from "../../actions/tasksActions";

class TasksContainer extends React.Component {

    componentDidMount() {

    }
    render() {
        // const {} = this.props;

        return (
            <Fragment>
                <BreadCrumb />
                <TasksTree />
            </Fragment>
        );
    }
}

TasksContainer.propTypes = {
};

function mapStateToProps(state) {
    return {
        user: state.user,
        initialValues: {
            user: state.user
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => {dispatch(fetchTasks());},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(TasksContainer));

