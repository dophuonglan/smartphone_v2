import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Message from './../../../constants/Message';
import { actChangeTitle, actLogout, actFetchCustomerRequest, actFetchAddressRequest, actAddAddressRequest ,actUpdateCustomerRequest} from './../../../actions/index';
import { Link } from 'react-router-dom';
import AddressContainer from '../../../containers/AddressContainer';
import AddAddress from '../AddAddress';
import Order from './Order';
import AccountDetail from './AccountDetail';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userAccount : null
        }
    }
    logout = () => {
        this.props.onLogout();
        this.props.onChangeTitle(Message.TITLE_LOGIN);
    }
    findMajorAddressUser = (address, IDuserAccount) => {
        if (address.length > 0) {
            return address.find((item) => item.isMajorAddress && item.IDCustomer === IDuserAccount)
        }
    }
    
    render() {
        var { address, customer, onAddAddress,onUpdateCustomer} = this.props;
        var a = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user_name;
        var userAccount = customer && customer.find((user) => {
            return user.Account === a ? user : null
        })
        var userID = userAccount && userAccount.ID;
        var majorAddress = this.findMajorAddressUser(address, userID) && this.findMajorAddressUser(address, userID).Address;
        return (
            <div>
                {/* My Account Page Start Here */}
                <div className="my-account white-bg ptb-80">
                    <div className="container">
                        <div className="account-dashboard">
                            <div className="row">
                                <div className="col-lg-2">
                                    {/* Nav tabs */}
                                    <ul className="nav flex-column dashboard-list" role="tablist">
                                        <li> <a className="nav-link" data-toggle="tab" href="#orders">Đơn hàng</a></li>
                                        <li><a className="nav-link" data-toggle="tab" href="#address">Địa chỉ</a></li>
                                        <li><a className="nav-link" data-toggle="tab" href="#account-details">Thông tin tài khoản</a></li>
                                        <li><Link to='login' className="nav-link" onClick={this.logout}>Đăng xuất</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-10">
                                    {/* Tab panes */}
                                    <div className="tab-content dashboard-content mt-all-40">
                                            <Order userID={userID}></Order>
                                        <div id="address" className="tab-pane">
                                            <h3>Địa chỉ của bạn</h3>
                                            <AddressContainer
                                                IDuserAccount={userID}//id Customer
                                                majorAddress={majorAddress} //address Customer_address
                                            ></AddressContainer>
                                            <AddAddress
                                                userID={userID}
                                                onAddAddress={onAddAddress}>
                                            </AddAddress>
                                        </div>
                                        <div id="account-details" className="tab-pane fade">
                                            <h3>Thông tin tài khoản </h3>
                                            <AccountDetail userAccount ={userAccount}
                                            onUpdateCustomer={onUpdateCustomer}
                                            ></AccountDetail>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* My Account Page End Here */}

            </div>
        );
    }
    componentDidMount() {
        this.props.fetchAllCustomer();
        this.props.fetchAllAddress();
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        login: state.login,
        customer: state.customer,
        address: state.address
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeTitle: (login) => {
            dispatch(actChangeTitle(login));
        },
        onLogout: () => {
            dispatch(actLogout());
        },
        fetchAllCustomer: () => {
            dispatch(actFetchCustomerRequest());
        },
        fetchAllAddress: () => {
            dispatch(actFetchAddressRequest());
        },
        onAddAddress: (address) => {
            dispatch(actAddAddressRequest(address));
        },
        onUpdateCustomer: (address) => {
            dispatch(actUpdateCustomerRequest(address));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);