import MomentUtils from "@date-io/moment";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import PropTypes from 'prop-types';
import React from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchMetaData} from "../actions/generalActions";
import {handleResize} from "../actions/index";
import "../styles/App.scss";
import ModalRoot from "./modals/ModalRoot";

class AppContainer extends React.Component {
    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", () => this.updatePredicate());

        this.props.fetchMetaData();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.updatePredicate());
    }

    updatePredicate() {
        this.props.handleResize();
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                {this.props.children}
                <ModalRoot />
            </MuiPickersUtilsProvider>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object.isRequired,
    handleResize: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    handleResize: () => dispatch(handleResize()),
    fetchMetaData: () => dispatch(fetchMetaData(true)),
});

export default connect(
    null,
    mapDispatchToProps
)(AppContainer);
