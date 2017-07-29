/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */
export function addTodo(text) {
    return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

export function fetchEmployees() {
    return {
        type: 'FETCH_EMPLOYEES',
        payload: {
            request:{
                url:'/users'
            }
        }
    }
}

export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES';

function receiveEmployees(json) {
    return {
        type: RECEIVE_EMPLOYEES,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}
