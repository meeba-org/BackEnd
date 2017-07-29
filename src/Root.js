import React from "react";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import Login from "./components/Login";
import App from "./components/App";
import Status from "./components/Status";
import createStore from "./store/configureStore";
import EmployeesContainer from "./components/EmployeesContainer";
import {syncHistoryWithStore} from "react-router-redux";

export default class Root extends React.Component {
    render() {

        const store = createStore();
        const history = syncHistoryWithStore(browserHistory, store);

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <Route path="/login" component={Login}/>
                        <Route path="/status" component={Status}/>
                        <Route path="/employees" component={EmployeesContainer}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}
