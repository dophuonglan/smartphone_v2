import React, { Component } from 'react';
import OrderItem from './OrderItem';
import { connect } from 'react-redux';
import *as Message from './../../../constants/Message';
import { actFetchOrderRequest, actFetchOrderDetailRequest ,actCancelOrderRequest} from './../../../actions/index';
class Order extends Component {
    render() {
        var { order, userID, orderDetail } = this.props;
        return (
            <div id="orders" className="tab-pane fade show active">
                <h3>Đơn hàng của bạn</h3>
                <div>
                    <table className="table">
                        <thead className='myBackground'>
                            <tr>
                                <th>STT</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
                                <th>Sản phẩm</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showOrderItem(order, userID)}
                        </tbody>
                    </table>
                    <div className='mt-3 float-right myTotal'>
                        <label>Tổng tiền:</label> &nbsp;
                        <label>{this.showTotalOrder(orderDetail, userID)} VNĐ</label>
                    </div>
                </div>
            </div>
        );
    }
    currencyFormat = (num) => {
        return num && parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    showTotalOrder = (orderDetail, userID) => {
        var a = 0;
        if (orderDetail) {
            orderDetail.filter((item) => (item.IDCustomer === userID) && item.StatusOrder !=='Đã hủy').map((value) => {
                a += value.PriceOrder;
            })
            return this.currencyFormat(a);
        }
    }
    showOrderItem = (order, userID) => {
        var result = <tr
            key={0}>
            <td>
                {Message.MSG_ADDRESS_EMPTY}
            </td>
        </tr>
        var { orderDetail ,onCancelOrderRequest,onFetchOrderDetailRequest } = this.props;
        if (order && order.filter((item) => item.IDCustomer === userID).length >0) {
            return order.filter((item) => item.IDCustomer === userID).map((item, index) => {
                return <OrderItem item={item}
                    onCancelOrderRequest ={onCancelOrderRequest}
                    orderDetail={orderDetail}
                    key={index}
                    index={index}
                    currencyFormat={this.currencyFormat}
                    reload = {this.reload}
                    onFetchOrderDetailRequest ={onFetchOrderDetailRequest}
                ></OrderItem>
            })
        }
        return result;
    }
    componentDidMount() {
        this.props.onFetchOrder();
        this.props.onFetchOrderDetailRequest();
    }
}
const mapStateToProps = (state) => {
    return {
        order: state.order,
        orderDetail: state.orderDetail,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: () => {
            dispatch(actFetchOrderRequest());
        },
        onFetchOrderDetailRequest: () => {
            dispatch(actFetchOrderDetailRequest());
        },
        onCancelOrderRequest: (IDOrder) => {
            dispatch(actCancelOrderRequest(IDOrder));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);