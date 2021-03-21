import React, { Component } from 'react';
import AddressContainer from '../../../containers/AddressContainer';
import { connect } from 'react-redux';
import { actFetchAddressRequest } from './../../../actions/index';
class CheckoutClientInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInfomationCustomer: true,
            txaNote: ''
        }
    }
    onChange = (event) => {
        var target = event.target;
        var txaNote = target.name;
        var value = target.value;
        this.setState({
            checkChooseInfomationCustomer: event.currentTarget.value,
            [txaNote]: value,
        }, () => {
        })
    }
    findMajorAddressUser = (address, IDuserAccount) => {
        if (address.length > 0) {
            return address.find((item) => item.isMajorAddress && item.IDCustomer === IDuserAccount)
        }
    }
    render() {
        var { address ,customer} = this.props;
        var a = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user_name;
        var userAccount = customer &&customer.find((user) => {
            return user.Account === a ? user : null
        })
        var userID = userAccount && userAccount.ID;
        var majorAddress = this.findMajorAddressUser(address, userID) && this.findMajorAddressUser(address, userID).Address;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="checkout-form-list mb-30">
                            <label>Họ và tên:</label>
                            <span>{userAccount && userAccount.Name}</span>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="checkout-form-list mb-30">
                            <label>Số điện thoại:</label>
                            <span>{userAccount && userAccount.Phone}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="checkout-form-list mb-30">
                            <label>Địa chỉ email:</label>
                            <span>{userAccount && userAccount.Account}</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                            <AddressContainer
                                IDuserAccount={userAccount ? userAccount.ID : ''}
                                majorAddress={majorAddress}
                                isMajorAddress ={this.props.isMajorAddress}
                                fetchAllAddress ={this.props.fetchAllAddress}
                            ></AddressContainer>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
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
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutClientInfor);