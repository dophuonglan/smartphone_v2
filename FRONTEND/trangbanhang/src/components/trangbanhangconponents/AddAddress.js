import React, { Component } from 'react';

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state= {
            txbAddress :''
        }
    }
    onChange = (event) => {
        var target = event.target;
        var txbAddress = target.name;
        this.setState({
            [txbAddress]: target.value,
        }
            , () => console.log(this.state.txbAddress)
        )
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
            + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }
    onAdd = (userID) => {
        let { txbAddress } = this.state;
        var address = {
            IDCustomerAddress: this.generateID(),
            IDCustomer: userID,
            Address: txbAddress,
        }
        if (confirm('Thêm địa chỉ này?')) {//eslint-disable-line
            this.props.onAddAddress(address);
            this.setState({txbAddress :''});
        }
    }
    render() {
        var { userID} = this.props;
        var {txbAddress} = this.state;
        return (
                <div className="col-md-12">
                    <div className="checkout-form-list mb-30">
                        <label>Địa chỉ mới<span className="required">*</span></label>
                        <input
                            type="text"
                            placeholder="Địa chỉ..."
                            name='txbAddress'
                            value={txbAddress}
                            onChange={(e) => { this.onChange(e) }}
                        ></input>
                        <button className="btn btn-primary mt-3" onClick={() => this.onAdd(userID)}>Lưu</button>
                    </div>
                </div>
        );
    }
}

export default AddAddress;