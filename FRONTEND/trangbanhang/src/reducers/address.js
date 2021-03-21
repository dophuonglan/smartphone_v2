import * as types from './../constants/ActionType';
const addressInitialState = [];
var findIndex = (address, id) => {
    var result = -1;
    address.forEach((address, index) => {
        if (address.IDCustomerAddress === id) {
            result = index;
        }
    });
    return result;
}
const address = (state = addressInitialState, action) => {
    var index =-1;
    switch (action.type) {
        case types.FETCH_ADDRESS:
            state = action.address;
            return [...state];
        case types.CHANGE_MAJOR_ADDRESS:
            state = action.address;
            return [...state];
        case types.ADD_NEW_ADDRESS:
            state.push(action.address)
            return [...state];
        case types.DELETE_ADDRESS:
            index = findIndex(state, action.IDCustomerAddress);
            state.splice(index, 1);
            return [...state];
        default:
            return [...state]
    }
}
export default address;