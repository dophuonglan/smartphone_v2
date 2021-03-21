import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddToCart } from '../../actions/index';
import { connect } from 'react-redux';
class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isload: false
        }
    }
    currencyFormat = (num) => {
        return num && parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    onAddToCart = (product, quantity) => {
        this.props.onAddToCart(product, quantity);
        alert("Thêm vào giỏ hàng thành công!");
    }
    render() {
        var { value, valueAllProduct } = this.props;
        var productDetail = valueAllProduct ? valueAllProduct.Image : value.Image;
        let image = productDetail && productDetail.slice(15);
        const newImage = require('./../../../../../BACKEND/newapp/public/uploads/' + image).default;
        return (
            <div className="mt-3 mb-4">
                {/* Single Product Start */}
                <div className="single-ponno-product">
                    {/* Product Image Start */}
                    <div className="pro-img">
                        <Link to={valueAllProduct ? ("/product/" + valueAllProduct.IDProduct) : ("/product/" + value.IDProduct)}>
                            <img className="primary-img" src={image &&newImage} alt="single-product" width='170' height="160" />
                        </Link>
                    </div>
                    {/* Product Image End */}
                    {/* Product Content Start */}
                    <div className="pro-content">
                        <div className="pro-info">
                            <h4><Link to={valueAllProduct ? ("/product/" + valueAllProduct.IDProduct) : ("/product/" + value.IDProduct)} >{valueAllProduct ? valueAllProduct.Name : value.Name}</Link></h4>
                            <p><span className="special-price">{valueAllProduct ? this.currencyFormat(valueAllProduct.Price) : this.currencyFormat(value.Price)}</span></p>
                            <br></br>
                            <div className="pro-add-cart">
                                <button className='btn btn-info' title="Thêm vào giỏ hàng" onClick={() => this.onAddToCart(valueAllProduct ? valueAllProduct : value, 1)}>THÊM VÀO GIỎ HÀNG</button>
                            </div>
                            <div className="product-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="quantity-pro">(99+)</span>
                            </div>
                        </div>
                    </div>
                    {/* Product Content End */}
                </div>
                {/* Single Product End */}
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product, quantity) => {
            dispatch(actAddToCart(product, quantity))
        },
        // onChangeMessage: (message) => {
        //     dispatch(actChangeMessage(message));
        // }
    }
}
export default connect(null, mapDispatchToProps)(ListProduct);