import React, { Component } from 'react';

class Address extends Component {
    render() {
        var { showAddressItem } = this.props;
    console.log(showAddressItem);
        
        return (
            <div id="accordion" className = "mb-2">
                <div className="card">
                    <div className="card-header" id="headingone">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Địa chỉ
                                        </button>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapseOne collapse show" aria-labelledby="headingone" data-parent="#accordion">
                        <div >
                            <table className='table' >
                                <thead className ='myBackground'>
                                    <tr>
                                        <th>Chọn</th>
                                        <th>STT</th>
                                        <th>Địa Chỉ</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showAddressItem}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Address;