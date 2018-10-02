const googleAnalyticsMiddleware = ({dispatch}) => next => action => {
    if (!action.ga) {
        return next(action);
    }

    let event = action.ga.event;

    // Call Google Analytics
    // ga()
    return next(action);
};

export default api;
