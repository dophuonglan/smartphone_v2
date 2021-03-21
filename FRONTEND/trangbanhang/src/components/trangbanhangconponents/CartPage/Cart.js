import React, { Component } from 'react';
import MessageContainer from '../../../containers/MessageContainer';
import {Link} from 'react-router-dom';
class Cart extends Component {
    render() {
        var { showTotalMount, children } = this.props;
        return (
            <div>
                {/* Cart Main Area Start */}
                <div className="cart-main-area mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                            <MessageContainer></MessageContainer>
                                {/* Form Start */}
                                <form action="#">
                                    {/* Table Content Start */}
                                    <div className="table-content table-responsive mb-45">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product-thumbnail">Hình ảnh</th>
                                                    <th className="product-name">Sản phẩm</th>
                                                    <th className="product-price">Giá</th>
                                                    <th className="product-quantity">Số lượng</th>
                                                    <th className="product-subtotal">Thành tiền</th>
                                                    <th className="product-remove">Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {children}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Table Content Start */}
                                    <div className="row">
                                        {/* Cart Button Start */}
                                        <div className="col-md-8 col-sm-12">
                                            <div className="buttons-cart">
                                                <Link to ="/">Tiếp tục mua sắm</Link>
                                            </div>
                                        </div>
                                        {/* Cart Button Start */}
                                        {/* Cart Totals Start */}
                                        {showTotalMount}
                                        {/* Cart Totals End */}
                                    </div>
                                    {/* Row End */}
                                </form>
                                {/* Form End */}
                            </div>
                        </div>
                        {/* Row End */}
                    </div>
                </div>
                {/* Cart Main Area End */}

            </div>
        );
    }
}

export default Cart;