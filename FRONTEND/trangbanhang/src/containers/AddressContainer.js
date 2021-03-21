import React, { Component } from 'react';
import Address from '../components/trangbanhangconponents/Address';
import AddressItem from '../components/trangbanhangconponents/AddressItem';
import { connect } from 'react-redux';
import * as Message from './../constants/Message';
import { actUpdateMajorAddressRequest, actDeleteAddressRequest } from './../actions/index';
class AddressContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IDuserAccount: []
        }
    }
    render() {
        var { address, IDuserAccount } = this.props;
        return (
            <Address
                showAddressItem={this.showAddressItem(address)}
                IDuserAccount={IDuserAccount}
            ></Address>
        );
    }
    findAddressUser = (address) => {
        if (address.length > 0 && this.props.IDuserAccount) {
            return address.filter((item) => item.IDCustomer === this.props.IDuserAccount)
        }
    }
    showAddressItem = (address) => {
        var result = <tr
            key={0}>
            <td>
                {Message.MSG_ADDRESS_EMPTY}
            </td>
        </tr>
        if (address.length > 0 && this.findAddressUser(address) && this.findAddressUser(address).length>0 &&this.props.IDuserAccount) {
            result = this.findAddressUser(address).map((item, index) => {
                return <AddressItem
                    isMajorAddress={this.props.isMajorAddress}
                    onDeleteAddress={this.props.onDeleteAddress}
                    key={index}
                    item={item}
                    index={index}
                    majorAddress={this.props.majorAddress}
                    onUpdateMajorAddress={this.props.onUpdateMajorAddress}
                    fetchAllAddress={this.props.fetchAllAddress}
                ></AddressItem>
            })
        }
        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.address
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateMajorAddress: (IDCustomer, IDCustomerAddress) => {
            dispatch(actUpdateMajorAddressRequest(IDCustomer, IDCustomerAddress));
        },
        onDeleteAddress: (IDCustomerAddress) => {
            dispatch(actDeleteAddressRequest(IDCustomerAddress));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer);