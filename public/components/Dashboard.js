import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Dashboard.scss";
import {connect} from "react-redux";
import {loadUserFromToken} from "../actions/index";
import * as selectors from "../selectors";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

class Dashboard extends React.Component {

    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        let {router, userRole} = this.props;

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker />
            </MuiPickersUtilsProvider>
        );
    }
}

const MyDashboard = () => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker />
    </MuiPickersUtilsProvider>
);

Dashboard.propTypes = {
    loadUserFromToken: PropTypes.func.isRequired,
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    userRole: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        userRole: selectors.getUserRole(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            dispatch(loadUserFromToken());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MyDashboard, styles));

