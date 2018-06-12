import * as types from "../actions/actionTypes";
const initialState = {
    modalType: null,
    modalProps: {}
};

export function ModalReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            return {
                ...action.payload
            };
        case types.HIDE_MODAL:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}
