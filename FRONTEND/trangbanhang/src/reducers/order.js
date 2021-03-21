import * as types from './../constants/ActionType';
const orderInitialState = []
var findIndex =(order,id)=>{
    var result =-1;
    order.forEach((order,index) => {
        if(order.IDOrder ===id){
            result =index;
        }
    });
    return result;
}
const order = (state = orderInitialState, action) => {
    var {order} = action;
    var index =-1;
    switch (action.type) {
        case types.ADD_ORDER:
            state.push(action.order)
           return [...state];
        case types.FETCH_ORDER:
            state = action.order
           return [...state];
        case types.CANCEL_ORDER:
            index =findIndex(state,order.IDOrder);
            state[index] = order;
           return [...state];
        default:
            return [...state]
    }
}

export default order;