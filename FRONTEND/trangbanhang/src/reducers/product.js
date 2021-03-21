import * as types from './../constants/ActionType';
const productInitialState = [];

var findIndex = (product, id) => {
    var result = -1;
    product.forEach((product, index) => {
        if (product.IDProduct === id) {
            result = index;
        }
    });
    return result;
}
const product = (state = productInitialState, action) => {
    var index = -1;
    var { IDProduct, product } = action;
    switch (action.type) {
        case types.FETCH_PRODUCT:
            state = product && product;
            return [...state];
        // case types.ADD_PRODUCT:
        //     state.push(action.product)
        // return [...state];
        case types.DELETE_PRODUCT:
            index = findIndex(state, IDProduct);
            state.splice(index, 1);
            return [...state];
        case types.UPDATE_PRODUCT:
            index = findIndex(state, product.IDProduct);
            state[index] = product;
            console.log(state);
            return [...state];
        case types.FETCH_PRODUCT_FILTER:
            state =action.product
            return state;
        default:
            return [...state]
    }
}
export default product