import React from "react";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import App from "./components/App";
import Status from "./components/Status";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/LoginContainer";

export default class Root extends React.Component {

    render() {

        const store = createStore();
        const history = syncHistoryWithStore(browserHistory, store);

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/" component={App}>
                        <Route path="/status" component={Status}/>
                        <Route path="/employees" component={EmployeesContainer}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}
