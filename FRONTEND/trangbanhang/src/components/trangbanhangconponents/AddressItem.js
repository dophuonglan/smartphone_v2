import React, { Component } from 'react';
class AddressItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChooseAddress: {}
        }
    }
    onChange = (event) => {
        this.setState({
            checkChooseAddress: event.currentTarget.value,
        },
            () => {
                let IDCustomer = JSON.parse(this.state.checkChooseAddress).IDCustomer;
                let IDCustomerAddress = JSON.parse(this.state.checkChooseAddress).IDCustomerAddress;
                this.props.onUpdateMajorAddress(IDCustomer, IDCustomerAddress);
                this.props.fetchAllAddress();
                this.props.isMajorAddress(JSON.parse(this.state.checkChooseAddress))

            }, () => console.log(this.state.checkChooseAddress))
    }
    onDelete = (IDCustomerAddress) => {
        if (confirm('Xóa địa chỉ này?')) {//eslint-disable-line
            this.props.onDeleteAddress(IDCustomerAddress);
        }
    }
    render() {
        var { item, index, majorAddress } = this.props
        return (
            <tr>
                <td>
                    <div className="radio">
                        <label><input
                            type="radio"
                            name="checkChooseAddress"
                            value={JSON.stringify(item)}
                            defaultChecked={item.Address === majorAddress ? true : false}
                            onChange={(e) => this.onChange(e)}
                        /></label>
                    </div>
                </td>
                <td>{index + 1}</td>
                <td>{item.Address}</td>
                <td><button className='btn btn-danger' onClick={() => this.onDelete(item.IDCustomerAddress)}>Xóa</button></td>
            </tr>
        );
    }
}

export default AddressItem;