import {combineReducers} from 'redux';
import cart from './cart';  
import message from './message';
import customer from './customer';
import login from './login';
import address from './address';
import order from './order';
import orderDetail from './orderDetail';
import product from './product';
import productCategory from './productCategory';
import itemEditing from './itemEditing';
const appReducers = combineReducers({
    cart,
    message,
    customer,
    login,
    address,
    order,
    orderDetail,
    product,
    productCategory,
    itemEditing
})

export default appReducers;