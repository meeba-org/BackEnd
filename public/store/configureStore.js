import {applyMiddleware, compose, createStore} from 'redux';
import createDebounce from 'redux-debounced';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import apiMiddleware from "../middlewares/apiMiddleware";
import gaMiddleware from "../middlewares/gaMiddleware";
import rootReducer from "../reducers";

function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        createDebounce(),
        thunk,
        apiMiddleware,
        gaMiddleware
    ];

    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        )
    );
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        createDebounce(),
        thunk,
        apiMiddleware,
        gaMiddleware
    ];

    const store = createStore(rootReducer, initialState, composeWithDevTools(
        applyMiddleware(...middlewares)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').rootReducer; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
