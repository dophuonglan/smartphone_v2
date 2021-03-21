import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cart from '../components/trangbanhangconponents/CartPage/Cart';
import * as Message from './../constants/Message';
import CartItem from '../components/trangbanhangconponents/CartPage/CartItem';
import CartResult from '../components/trangbanhangconponents/CartPage/CartResult';
import {actChangeMessage, actDeleteProductInCart,actUpdateProductInCart} from './../actions/index';
class CartContainer extends Component {
    render() {
        var { cart } = this.props;
        return (
            <Cart
                showTotalMount={this.showTotalMount(cart)}>
                {this.showCartItem(cart)}
            </Cart>
        );
    }
    showCartItem = (cart) => {
        var {onDeleteProductInCart, onChangeMessage,onUpdateProductInCart} = this.props;
        var result = <tr
            key={0}>
            <td>
                {Message.MSG_CART_EMPTY}
            </td>
        </tr>
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return <CartItem
                    key={index}
                    item={item}
                    index={index}
                    onDeleteProductInCart = {onDeleteProductInCart}
                    onChangeMessage ={onChangeMessage}
                    onUpdateProductInCart ={onUpdateProductInCart}
                ></CartItem>
            })
        }
        return result;
    }
    showTotalMount = (cart) => {
        var result = null;
        if (cart.length > 0) {
            result = <CartResult cart={cart}></CartResult>
        }
        return result;
    }
}
CartContainer.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        product: PropTypes.shape({
            IDProduct: PropTypes.string.isRequired,
            Name: PropTypes.string.isRequired,
            Image: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Quantity: PropTypes.number.isRequired,
            // rating : PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired
    })
    ).isRequired,
    onUpdateProductInCart :PropTypes.func.isRequired,
    onDeleteProductInCart :PropTypes.func.isRequired,
    onChangeMessage :PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actDeleteProductInCart(product));
        },
        onChangeMessage : (message) =>{
            dispatch(actChangeMessage(message));
        },
        onUpdateProductInCart: (product,quantity) => {
            dispatch(actUpdateProductInCart(product,quantity));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);