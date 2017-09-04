import React from 'react';
import { connect } from 'react-redux';
import {loadUserFromToken, resetMe} from '../actions/actions';
import App from "./App";
import PropTypes from 'prop-types';

class AppContainer extends React.Component {
    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <App>
                {this.props.children}
            </App>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {dispatch(loadUserFromToken());},
        resetMe: () => {dispatch(resetMe());},
    };
};

AppContainer.propTypes = {
    loadUserFromToken: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
};

export default connect(null, mapDispatchToProps)(AppContainer);
