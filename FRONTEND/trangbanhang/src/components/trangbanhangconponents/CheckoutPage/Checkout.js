import React, { Component } from 'react';
import Accordion from '../Accordion';
import CheckoutClientInfor from './CheckoutClientInfor';
import { withRouter,Redirect } from 'react-router-dom';
import AddAddress from '../AddAddress';
import {connect} from 'react-redux';
import {actFetchAddressRequest} from './../../../actions/index';
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            isMajorAddress :null
        }
    }
    toReviewOrder = (address,userID) => {
        var {isMajorAddress} = this.state;
        var {history} = this.props;
        var findMajorAddress = (address && address.filter(ad => ad.isMajorAddress && ad.IDCustomer ===userID))[0]
        console.log(findMajorAddress);
        this.setState({
            isMajorAddress : findMajorAddress
        },()=>console.log(this.state.isMajorAddress));
        
        if(address){
            if(isMajorAddress|| findMajorAddress){
                console.log(isMajorAddress);
                history.push({ pathname: '/revieworder' })
            }
            else{
                alert("Bạn chưa chọn địa chỉ giao hàng!");
                return;
            }
        }
        else{
            alert("Bạn chưa thêm địa chỉ nào!");
            return;
        }
        this.props.fetchAllAddress();
    }
    isMajorAddress = (address)=>{
        console.log(address);
        this.setState({
            isMajorAddress : address
        },()=>console.log(this.state.isMajorAddress));
    }
    render() {
        let { isChecked} = this.state;
        var { showCartItem, showTotalMount, onAddAddress } = this.props;
        var { customer ,address } = this.props;
        var a = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user_name;
        var userAccount = customer && customer.find((user) => {
            return user.Account === a ? user : null
        })
        var userID = userAccount && userAccount.ID;
        var value1 = JSON.parse(localStorage.getItem('user'));
        if (!value1) return <Redirect to="login" />
        return (
            <div>
                <div>
                    {/* coupon-area start */}
                    <div className="coupon-area pt-80 pb-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="coupon-accordion">
                                        {/* Accordion Start */}
                                        <Accordion></Accordion>
                                        {/* ACCORDION END */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* coupon-area end */}
                    {/* checkout-area start */}
                    <div className="checkout-area pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="checkbox-form mb-sm-40">
                                        <h3>Chi tiết hóa đơn</h3>
                                        <CheckoutClientInfor
                                            type={1}
                                            isMajorAddress ={this.isMajorAddress}
                                            customer={this.props.customer}></CheckoutClientInfor>

                                        <div className="different-address">
                                            <div className="ship-different-title">
                                                <h3>
                                                    <label>Thêm một địa chỉ mới</label>
                                                    <input
                                                        id="ship-box"
                                                        type="checkbox"
                                                        onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                                                        value={isChecked}
                                                    />
                                                </h3>
                                            </div>
                                            <div id="ship-box-info" style={isChecked ? { display: 'block' } : { display: 'none' }}>
                                                <AddAddress userID={userID}
                                                    onAddAddress={onAddAddress}
                                                ></AddAddress>
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
                                                    {showCartItem}
                                                </tbody>
                                                <tfoot>
                                                    {showTotalMount}
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-success mt-4 pull-right' onClick={()=>this.toReviewOrder(address,userID)}>Tiếp tục đặt hàng</button>
                        </div>
                    </div>
                    {/* checkout-area end */}
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.props.fetchAllAddress();
    }
}
const mapStateToProps = (state) => {
    return {
        address: state.address
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllAddress: () => {
            dispatch(actFetchAddressRequest());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));