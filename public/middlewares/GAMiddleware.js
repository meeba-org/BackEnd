const GAMiddleware = ({dispatch}) => next => action => {
    if (!action.ga) {
        return next(action);
    }

    let gaCategory = action.ga.category;
    let gaAction = action.ga.action;
    let gaLabel = action.ga.label;

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel);

    return next(action);
};

export default GAMiddleware;
