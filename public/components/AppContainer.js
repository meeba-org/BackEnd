import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React from 'react';
import connect from "react-redux/es/connect/connect";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {handleResize} from "../actions";
import {fetchMetaData} from "../actions/generalActions";
import "../styles/App.scss";
import Dashboard from "./Dashboard";
import FAQContainer from "./faq/FAQContainer";
import PaymentSuccessRedirectContainer from "./go-premium/PaymentSuccessRedirectContainer";
import Home from "./home/Home";
import ModalRoot from "./modals/ModalRoot";
import PrivateRoute from "./PrivateRoute";

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

                <BrowserRouter>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Route path="/faq/:name?" component={FAQContainer} />
                        <Route path="/paymentSuccess" component={PaymentSuccessRedirectContainer} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                    <ModalRoot />
                </BrowserRouter>
            </MuiPickersUtilsProvider>
        );
    }
}

AppContainer.propTypes = {
    handleResize: PropTypes.func,
};

const mapDispatchToProps = {
    handleResize,
    fetchMetaData,
};

export default connect(
    null,
    mapDispatchToProps
)(AppContainer);
