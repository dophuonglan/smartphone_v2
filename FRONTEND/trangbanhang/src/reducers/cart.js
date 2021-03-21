import * as types from './../constants/ActionType';
var data = JSON.parse(localStorage.getItem('CART'));
const cartInitialState = data ? data : [];
const cart = (state = cartInitialState, action) => {
    var { product, quantity } = action;
    var index = -1;
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findProductInCart(state, product); //state la danh sach cac san pham trong gio hang,
            // product la san pham vua bam vao them
            if (index !== -1) {
                state[index].quantity += quantity;
            }
            else {
                state.push({
                    product,
                    quantity
                });
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state]
        case types.DELETE_PRODUCT_IN_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state]
        case types.UPDATE_PRODUCT_IN_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].quantity =quantity;
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state]
        case types.CLEAR_CART:
            localStorage.removeItem('CART');
            state=[];
            return [...state]
        default:
            return [...state]
    }

}
var findProductInCart = (cart, product) => {
    let index = -1;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.IDProduct === product.IDProduct) {
                index = i;
                break;
            }
        }
    }
    return index; // index=-1 la ko tim thay
}
export default cart;