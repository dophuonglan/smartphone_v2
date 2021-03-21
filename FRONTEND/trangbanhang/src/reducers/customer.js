import * as types from './../constants/ActionType';
const customerInitialState = [];
const customer = (state = customerInitialState, action) => {
    switch (action.type) {
        case types.FETCH_CUSTOMER:
            state = action.customer;
            return [...state];
        case types.REGISTERED:
            return state;
        case types.UPDATE_CUSTOMER:
            return [...state];
        default:
            return [...state];
    }
}

export default customer;