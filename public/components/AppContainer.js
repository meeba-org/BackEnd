import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ModalRoot from "./modals/ModalRoot";
import "../styles/App.scss";
import {handleResize} from "../actions/index";
import connect from "react-redux/es/connect/connect";
import {fetchMetaData} from "../actions/generalActions";

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
            <Fragment>
                {this.props.children}
                <ModalRoot />
            </Fragment>
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
