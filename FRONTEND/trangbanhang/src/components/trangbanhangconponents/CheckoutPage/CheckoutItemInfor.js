import React, { Component } from 'react';

class CheckoutItemInfor extends Component {
    render() {
        var {item , currencyFormat} =this.props;
        return (
            <tr className="cart_item">
                <td className="product-name">
                    {item.product.Name} <span className="product-quantity"> × {item.quantity}</span>
                </td>
                <td className="product-total">
                    <span className="amount">{currencyFormat(item.product.Price)} VND</span>
                </td>
            </tr>
        );
    }
}

export default CheckoutItemInfor;