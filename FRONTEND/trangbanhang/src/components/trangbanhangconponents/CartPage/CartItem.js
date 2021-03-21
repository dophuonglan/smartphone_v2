import React, { Component } from 'react';
import * as Message from '../../../constants/Message';
import {Link} from 'react-router-dom';
class CartItem extends Component {
    render() {
        var { item } = this.props;
        var { quantity } = item;
        let image = item.product.Image && item.product.Image.slice(15);
        const newImage = require('../../../../../../BACKEND/newapp/public/uploads/' + image).default;
        var link = `product/${item.product.IDProduct}`
        return (
            <tr>
                <td className="product-thumbnail">
                <Link to ={link}><img src={Image && newImage} alt={item.product.Name} /></Link>
                </td>
                <td className="product-name"><Link to ={link}>{item.product.Name}</Link></td>
                <td className="product-price"><span className="amount">{item.product.Price}</span></td>
                <td className="product-quantity">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                </div>
                    <span className="amount">{quantity}</span>&nbsp;
                    <label className="btn btn-primary width-5" onClick ={()=> this.onUpdateQuantity(item.product, item.quantity-1)}>-</label>&nbsp;
                    <label className="btn btn-primary width-5" onClick ={()=> this.onUpdateQuantity(item.product, item.quantity+1)}>+</label>
                </td>
                <td className="product-subtotal">{this.showSubTotal(item.product.Price, item.quantity)}</td>
                <td className="product-remove">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => { this.onDelete(item.product) }}
                    ><i className="fa fa-times" aria-hidden="true" />
                    </button>
                </td>
            </tr>
        );

    }
    onUpdateQuantity = (product, quantity)=>{// quantity da giam
        var {onUpdateProductInCart,onChangeMessage} = this.props;
        if(quantity >0){
            this.setState({
                quantity : quantity
            });
            onUpdateProductInCart(product, quantity);
            onChangeMessage(Message.MSG_UPDATE_CART_SUCCESS)
        }
    }
    onDelete = (product) => {
        var { onDeleteProductInCart, onChangeMessage } = this.props;
        onDeleteProductInCart(product);
        onChangeMessage(Message.MSG_DELETE_PRODUCT_TO_CART_SUCCESS)
    }
    showSubTotal = (price, quantity) => {
        return price * quantity;
    }
}

export default CartItem;