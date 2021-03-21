import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutClientInfor from '../components/trangbanhangconponents/CheckoutPage/CheckoutClientInfor';
import { actFetchCustomerRequest} from './../actions/index';
class CustomerContainer extends Component {
    componentDidMount() {
        this.props.fetchAllCustomer();
    }
    render() {
        var { customer } = this.props;
        console.log(customer);
        return (
            <div>
                <CheckoutClientInfor customer = {customer && customer}></CheckoutClientInfor>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        customer : state.customer
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomer: () => {
            dispatch(actFetchCustomerRequest());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);