import React from "react";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import Login from "./components/Login";
import App from "./components/App";
import {combineReducers, createStore} from "redux";
import reducers from "./reducers/reducers";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import Status from "./components/Status";
import Employees from "./components/Employees";

export default class Root extends React.Component {
    configureStore() {
        const store = createStore(reducers);

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers/reducers', () => {
                const nextReducer = require('./reducers/reducers').default; // eslint-disable-line global-require
                store.replaceReducer(nextReducer);
            });
        }

        return store;
    }


    render() {
        const reducer = combineReducers({
            ...reducers,
            routing: routerReducer
        });

        const store = createStore(reducer);
        const history = syncHistoryWithStore(browserHistory, store);

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <Route path="/login" component={Login}/>
                        <Route path="/status" component={Status}/>
                        <Route path="/employees" component={Employees}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}
