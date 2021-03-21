import React, { Component } from 'react';
import moment from 'moment';
class OrderItem extends Component {
    showOrderProduct = (IDOrder, orderDetail) => {
        var {currencyFormat} =this.props;
        return orderDetail.filter(item => (item.OrderID === IDOrder)).map((value, index) => {
            return <div className="table-responsive" key={index}>
                <table  className="table ">
                    <tbody>
                        <tr>
                            <td >{value.Name + ' - ' + currencyFormat(value.PriceOrder) + ' x ' + value.QuantityOrder}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        })
        //tim trong tưng cai item co nhung cai chi tiet hoa don nào
    }
    onCancelOrder =  (IDOrder) =>{
        console.log(IDOrder);
        if(confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')){//eslint-disable-line
            this.props.onCancelOrderRequest(IDOrder);
            alert('Hủy đơn hàng thành công');
            this.props.onFetchOrderDetailRequest();
        }
    }
    render() {
        var { item, index, orderDetail } = this.props;
        // console.log(orderDetail);
        // console.log(this.showOrderProduct(item.IDOrder,orderDetail));
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{moment.utc(item.CreateDate).format("DD/MM/YYYY hh:mm:ss A")}</td>
                <td>{item.StatusOrder}</td>
                <td>{this.showOrderProduct(item.IDOrder, orderDetail)}</td>
                <td><button
                style={item.StatusOrder !=='Đang chờ xác nhận' ? { display: 'none' }:{ display: 'block' }  }
                // disabled ={item.Status!=='Đã hủy' ? false : true}
                 className="btn btn-danger" 
                onClick ={()=>this.onCancelOrder(item.IDOrder)}>Hủy</button></td>
            </tr>
        );
    }
}

export default OrderItem;