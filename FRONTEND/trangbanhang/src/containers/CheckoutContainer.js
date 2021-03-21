import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkout from '../components/trangbanhangconponents/CheckoutPage/Checkout';
import CheckoutItemInfor from '../components/trangbanhangconponents/CheckoutPage/CheckoutItemInfor';
import CheckoutResultPrice from '../components/trangbanhangconponents/CheckoutPage/CheckoutResultPrice';
import { actFetchCustomerRequest ,actAddAddressRequest} from './../actions/index';
class CheckoutContainer extends Component {
    currencyFormat = (num) => {
        return num &&parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render() {
        var {cart , customer,onAddAddress}= this.props;
        return (
            <Checkout
            onAddAddress ={onAddAddress}
            customer = {customer}
            showCartItem ={this.showCartItem(cart)}
            showTotalMount ={this.showTotalMount(cart)}
            ></Checkout>
        );
    }
    showCartItem = (cart) => {
        var result;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return <CheckoutItemInfor
                currencyFormat={this.currencyFormat}
                    key={index}
                    item={item}
                    index={index}>
                </CheckoutItemInfor>
            })
        }
        return result;
    }
    showTotalMount = (cart) => {
        var result = null;
        if (cart.length > 0) {
            result = <CheckoutResultPrice
            currencyFormat={this.currencyFormat}
            cart={cart}></CheckoutResultPrice>
        }
        return result;
    }
    componentDidMount() {
        this.props.fetchAllCustomer();
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        customer :state.customer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCustomer: () => {
            dispatch(actFetchCustomerRequest());
        },
        onAddAddress: (address) => {
            dispatch(actAddAddressRequest(address));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);