import React, { Component } from 'react';
import axios from 'axios'
const getDataProduct = () => {
    return axios.get('http://localhost:4000/selectProduct').then((res) => res.data);
}
class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAllProduct: null
        }
    }
    componentWillMount() {
        getDataProduct().then((res) => {
            this.setState({
                dataAllProduct: res
            })
        })
    }
    showAllProduct = () => {
        return this.state.dataAllProduct && this.state.dataAllProduct.map((value, index) => {
            return <div className="pro-info">
                <h4><a href="product-details.html">{value.Name}</a></h4>
                <p><span className="special-price">{value.Price}</span></p>
                <div className="product-rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span className="quantity-pro">(200+)</span>
                </div>
            </div>
        })
    }
    render() {
        return (
            <div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="mt-3">
                        {/* Single Product Start */}
                        <div className="single-ponno-product">
                            {/* Product Image Start */}
                            <div className="pro-img">
                                <a href="product-details.html">
                                    <img className="primary-img" src="img\products\p1.jpeg" alt="single-product" />
                                </a>
                            </div>
                            {/* Product Image End */}
                            {/* Product Content Start */}
                            <div className="pro-content">
                                <div className="pro-info">
                                    <h4><a href="product-details.html">{/*value.Name*/}</a></h4>
                                    <p><span className="special-price">{/*value.Price*/}</span></p>
                                    <div className="product-rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <span className="quantity-pro">(200+)</span>
                                    </div>
                                </div>
                            </div>
                            {/* Product Content End */}
                        </div>
                        {/* Single Product End */}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default AllProduct;