import React, { Component } from 'react';
import CheckoutItemInfor from './CheckoutItemInfor';
import CheckoutResultPrice from './CheckoutResultPrice';
import { connect } from 'react-redux';
import * as Message from './../../../constants/Message';
import {Redirect,withRouter} from 'react-router-dom';
import { actFetchCustomerRequest, actFetchAddressRequest, actAddOrderRequest, actAddOrderDetailRequest, actClearCart } from '../../../actions/index';
class CheckoutReviewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: null,
            isload: false
        }
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
            + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }
    submitCheckout = (userAccount, majorAddress, cart) => {
        var {history} =this.props;
        var order = {
            IDOrder: this.generateID(),
            IDCustomer: userAccount.ID,
            NameShip: userAccount.Name,
            AddressShip: majorAddress,
            PhoneShip: userAccount.Phone,
            StatusOrder: Message.WAITING_FOR_CONFIRMATION,
        }
        console.log(cart);
        if(cart.length>0){
            if (confirm('Bạn có chắc chắn muốn đặt đơn hàng này?')) {//eslint-disable-line
                this.props.onAddOrderRequest(order);
                var orderDetail;
                cart && cart.map(item => {
                    orderDetail = {
                        IDOrderDetail: this.generateID(),
                        ProductID: item.product.IDProduct,
                        OrderID: order.IDOrder,
                        PriceOrder: item.product.Price,
                        QuantityOrder: item.quantity,
                    }
                    this.props.onAddOrderDetailRequest(orderDetail)
                })
                this.props.onClearCart();
                alert('Đặt hàng thành công!');
                history.push({ pathname: '/profile' })
                window.location.reload();
            }
        }
        else {
            alert("Không thành công : giỏ hàng của bạn rỗng!!")
            return;
        }
    }
    render() {
        var { cart, address, customer } = this.props;
        var username = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user_name;
        // eslint-disable-next-line array-callback-return
        var userAccount = customer && customer.find((user) => {
            if (user.Account === username) {
                return user;
            }
        })
        var value1 = JSON.parse(localStorage.getItem('user'));
        if (!value1) return <Redirect to="login" />
        if(cart ===null) return <Redirect to="/" />
        var userID = userAccount && userAccount.ID;
        var majorAddress = this.findMajorAddressUser(address, userID) && this.findMajorAddressUser(address, userID).Address;
        return (
            <div>
                <div className="checkout-area pb-80 mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="checkbox-form mb-sm-40">
                                    <h3>Chi tiết hóa đơn</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="checkout-form-list mb-30">
                                                <label>Họ và tên</label>
                                                <label>{userAccount && userAccount.Name}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list mb-30">
                                                <label>Số điện thoại</label>
                                                <label>{userAccount && userAccount.Phone}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list mb-30">
                                                <label>Địa chỉ email</label>
                                                <label>{userAccount && userAccount.Account}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list mb-30">
                                                <label>Địa chỉ</label>
                                                <label>{majorAddress}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="your-order">
                                    <h3>Đơn hàng của bạn</h3>
                                    <div className="your-order-table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product-name">Tên sản phẩm</th>
                                                    <th className="product-total">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.showCartItem(cart)}
                                            </tbody>
                                            <tfoot>
                                                {this.showTotalMount(cart)}
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary pull-right' onClick={() => this.submitCheckout(userAccount, majorAddress, cart)}>Hoàn tất</button>
                    </div>
                </div>
            </div>
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
                    index={index}
                ></CheckoutItemInfor>
            })
        }
        return result;
    }
    currencyFormat = (num) => {
        return num&&parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.Price * cart[i].quantity;
            }
        }
        return total;
    }
    componentDidMount() {
        this.props.fetchAllCustomer();
        this.props.fetchAllAddress();
    }
    findMajorAddressUser = (address, IDuserAccount) => {
        if (address.length > 0) {
            return address.find((item) => item.isMajorAddress && item.IDCustomer === IDuserAccount)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        customer: state.customer,
        address: state.address
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomer: () => {
            dispatch(actFetchCustomerRequest());
        },
        fetchAllAddress: () => {
            dispatch(actFetchAddressRequest());
        },
        onAddOrderRequest: (order) => {
            dispatch(actAddOrderRequest(order));
        },
        onAddOrderDetailRequest: (orderDetail) => {
            dispatch(actAddOrderDetailRequest(orderDetail));
        },

        onClearCart: () => {
            dispatch(actClearCart());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutReviewOrder));
