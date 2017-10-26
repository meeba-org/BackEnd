import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadUserFromToken} from "../../actions/index";

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.loadUserFromToken();
    }

    render() {
        const {user} = this.props;

        return (
            <div>
                {!!user &&
                    <div>User: {user.firstName}</div>
                }
            </div>
        );
    }
}

UserContainer.propTypes = {
    company: PropTypes.object,
    // handleSubmit: PropTypes.func.isRequired,
    fetchCompany: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        // initialValues: {
            user: state.user
        // }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserFromToken: () => {dispatch(loadUserFromToken());},
        // updateCompany: (user) => {dispatch(updateCompany(user));},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContainer);


