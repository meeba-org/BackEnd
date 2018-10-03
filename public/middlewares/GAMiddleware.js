const GAMiddleware = ({dispatch}) => next => action => {
    if (!action.ga) {
        return next(action);
    }

    let gaCategory = action.ga.category;
    let gaAction = action.ga.action;
    let gaLabel = action.ga.label || getUser();

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel);

    return next(action);
};

const getUser = () => {
    let activeUser = localStorage.getItem('activeUser');
    if (!activeUser || !activeUser.username)
        return "UNKNOWN_USER";

    return activeUser.username;
};

export default GAMiddleware;
