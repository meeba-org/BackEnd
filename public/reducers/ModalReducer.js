const initialState = {
    modalType: null,
    modalProps: {}
};

export function ModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...action.payload
            };
        case 'HIDE_MODAL':
            return initialState;
        default:
            return state;
    }
}
