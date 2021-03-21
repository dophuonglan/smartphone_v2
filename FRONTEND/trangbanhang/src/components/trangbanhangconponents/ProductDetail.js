import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actAddToCart, actChangeMessage } from '../../actions/index';
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        }
    }
    currencyFormat = (num) => {
        return num && parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render() {
        let { quantity } = this.state;
        var { productDetail } = this.props;
        let image = productDetail.Image && productDetail.Image.slice(15);
        const newImage = require('./../../../../../BACKEND/newapp/public/uploads/' + image).default;
        console.log(require('./../../../../../BACKEND/newapp/public/uploads/' + image));
        console.log(newImage);
        return (
            <div>
                <div className="main-product-thumbnail ptb-80">
                    <div className="container">
                        <div className="row">
                            {/* Main Thumbnail Image Start */}
                            <div className="col-lg-5 col-md-6 mb-all-40">
                                {/* Thumbnail Large Image start */}
                                <div className="tab-content">
                                    <div id="thumb1" className="tab-pane fade show active">
                                        <a data-fancybox="images" href={productDetail && productDetail.Image}>
                                                <img alt ="" src={image &&newImage}  width="350" height="450" />
                                        </a>
                                    </div>
                                </div>
                                {/* Thumbnail Large Image End */}

                            </div>
                            {/* Main Thumbnail Image End */}
                            {/* Thumbnail Description Start */}
                            <div className="col-lg-7 col-md-6">
                                <div className="thubnail-desc ">
                                    <h3 className="product-header">{productDetail && productDetail.Name}</h3>
                                    <ul className="rating-summary">
                                        <li className="rating-pro">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </li>
                                    </ul>
                                    <div className="pro-thumb-price mt-20">
                                        <p>
                                            <span className="special-price">{this.currencyFormat(productDetail && productDetail.Price) + " VNĐ"}</span> <br />
                                        </p>
                                    </div>
                                    <p className="pro-desc-details">{productDetail && productDetail.Description}.</p>
                                    <div className="quatity-stock">
                                        <label>Số lượng</label>
                                        <ul className="d-flex flex-wrap">
                                            <li className="box-quantity">
                                                <form action="#">
                                                    <input
                                                        name="quantity"
                                                        value={quantity.toString()}
                                                        onChange={(e) => this.onChange(e)}
                                                        className="quantity"
                                                        type="number"
                                                        min={1}
                                                    />
                                                </form>
                                            </li>
                                            <li>
                                                <button className="pro-cart" onClick={() => this.onAddToCart(productDetail, quantity)}>Thêm vào giỏ hàng</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Thumbnail Description End */}
                        </div>
                        {/* Row End */}
                    </div>
                    {/* Container End */}
                </div>
                {/* Product Thumbnail End */}

            </div>
        );
    }
    onChange = (event) => {
        var target = event.target;
        var quantity = target.name;
        this.setState({
            [quantity]: target.value,
        });
    }
    onAddToCart = (product, quantity) => {
        this.props.onAddToCart(product, quantity);
        // this.props.onChangeMessage(Message.MSG_ADD_TO_CART_SUCCESS)
        alert("Thêm vào giỏ hàng thành công!");
    }
}
ProductDetail.propTypes = {
    onChangeMessage: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product, quantity) => {
            dispatch(actAddToCart(product, quantity))
        },
        onChangeMessage: (message) => {
            dispatch(actChangeMessage(message));
        }
    }
}
export default connect(null, mapDispatchToProps)(ProductDetail);