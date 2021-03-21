import * as types from './../constants/ActionType';
const orderDetailInitialState = []
const orderDetail = (state = orderDetailInitialState, action) => {
    switch (action.type) {
        case types.FETCH_ORDER_DETAIL:
            state =action.orderDetail;
            return [...state]
        case types.ADD_NEW_ORDER_DETAIL:
            state.push(action.orderDetail);
            return [...state]
        default:
            return [...state]
    }
}

export default orderDetail;