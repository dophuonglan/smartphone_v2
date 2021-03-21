import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class CartResult extends Component {
    currencyFormat = (num) => {
        return num && parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render() {
        var { cart } = this.props;
        return (
            <div className="col-md-4 col-sm-12">
                <div className="cart_totals float-md-right text-md-right">
                    <h2>Tổng giỏ hàng</h2>
                    <br />
                    <table className="float-md-right">
                        <tbody>
                           { /*<tr className="order-total">
                                <th>Phí ship</th>
                                <td>
                                    <strong><span className="amount">0 VND</span></strong>
                                </td>
                                </tr>*/}
                            <tr className="order-total">
                                <th>Tổng tiền</th>
                                <td>
                                    <strong><span className="amount">{this.currencyFormat(this.showTotalAmount(cart))} VND</span></strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="wc-proceed-to-checkout">
                        <Link to ='/checkout'>Tiến hành thanh toán</Link>
                    </div>
                </div>
            </div>

        );
    }
    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.Price * parseInt(cart[i].quantity);
            }
        }
        return total;
    }
}

export default CartResult;