import * as types from './../constants/ActionType';
const itemEditingInitialState = {}
const itemEditing = (state = itemEditingInitialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT_EDIT:
            return action.customer;
        default:
            return state
    }
}

export default itemEditing;