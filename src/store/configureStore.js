import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import {routerReducer} from "react-router-redux";
import reducers from '../reducers/reducers';

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const axiosClient = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'http://localhost:3000', // todo move baseUrl to config
    responseType: 'json',
});


function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ];

    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
        )
    );
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),
        axiosMiddleware(axiosClient),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers/reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
