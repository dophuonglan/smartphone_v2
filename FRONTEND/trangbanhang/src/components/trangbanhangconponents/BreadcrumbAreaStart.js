import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class BreadcrumbAreaStart extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data : null,
            dataProduct: null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({
                data : nextProps.data,
                dataProduct : nextProps.dataProduct
            });
        }
    }
    render() {
        var path =window.location.pathname;
        var pathName;
        var name;
        if(path && path.includes('/category/')){
            pathName =path.replace('/category/', '');
            var findCategoryByID = this.state.data && this.state.data.find((value)=> value.IDProductCategory === pathName ? value : null)
            name = findCategoryByID ? findCategoryByID.Name :''
        }
        else if(path && path.includes('/product/')){
            pathName =path.replace('/product/', '');
            var findProductByID = this.state.dataProduct && this.state.dataProduct.find((value)=> value.IDProduct=== pathName ?value : null)
            name = findProductByID ? findProductByID.Name :''
            console.log(name);
        }
        else {
            pathName =path.replace('/', '');
            name = pathName;
        }
        return (
            <div>
                {/* Breadcrumb Area Start Here */}
                <div className="breadcrumb-area">
                    <div className="container">
                        <ol className="breadcrumb breadcrumb-list">
                            <li className="breadcrumb-item">
                                <Link to ="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">{name && name}</li>
                        </ol>
                    </div>
                </div>
                {/* Breadcrumb Area End Here */}    
            </div>
        );
    }
}

export default BreadcrumbAreaStart;