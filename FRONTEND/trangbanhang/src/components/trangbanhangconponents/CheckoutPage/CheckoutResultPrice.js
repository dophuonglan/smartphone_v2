import React, { Component } from 'react';

class CheckoutResultPrice extends Component {
    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.Price * cart[i].quantity;
            }
        }
        return this.props.currencyFormat(total);
    }
    render() {
        var {cart} =this.props;
        return (
            <tr className="order-total">
                <th>Tổng tiền</th>
                <td><span className=" total amount">{this.showTotalAmount(cart)} VND</span>
                </td>
            </tr>
        );
    }
}

export default CheckoutResultPrice;