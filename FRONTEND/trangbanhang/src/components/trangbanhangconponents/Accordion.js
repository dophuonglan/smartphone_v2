import React, { Component } from 'react';

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state= {
            onShow :false
        }
    }
    render() {
        let {onShow} =this.state;
        return (
            <div>
                <h3>Bạn có mã khuyến mãi ? <span id="showcoupon" onClick ={()=>this.setState({onShow:!onShow})}>Nhấp vào đây để nhập mã khuyến mãi</span></h3>
                <div id="checkout_coupon" className="coupon-checkout-content" style={onShow?{ display: 'block' } : { display: 'none' }} >
                    <div className="coupon-info">
                        <form action="#">
                            <p className="checkout-coupon">
                                <input type="text" className="code"/>
                                <input type="submit" defaultValue="Apply Coupon" />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accordion;