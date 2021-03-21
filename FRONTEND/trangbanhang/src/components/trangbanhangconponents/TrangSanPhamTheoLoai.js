import React, { Component } from 'react';
import ListProduct from './ListProduct';
import { connect } from 'react-redux';
import { actFetchProductRequest, actFetchProductCategoryRequest } from './../../actions/index';
class TrangSanPhamTheoLoai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: 'Price',
                value: 1
            }
        }
    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
    }
    findCategoryByID = (ID) => {
        var { productCategory } = this.props;
        return productCategory && productCategory.find((value) => {
            if (value.IDProductCategory === ID) {
                return value;
            }
        })
    }
    listProductByCategoryName = (ID, product) => {
        return product && product.filter((value) => {
            return value.IDProductCategory === ID;
        })
    }
    checkParentCategory = (IDProductCategory)=>{
        return this.props.productCategory.filter((pc)=>pc.ParentID===IDProductCategory)
    }
    showListProduct = (idproductct) => {
        var {product}=this.props;
        var listProductByCategoryName = this.listProductByCategoryName(idproductct, product);
        if(listProductByCategoryName.length >0){
            return listProductByCategoryName && listProductByCategoryName.filter(value1 => value1.Status === true).map((value, index) => {
                return (<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" key={index}>
                    <ListProduct
                        value={value}
                    ></ListProduct>
                </div>)
            })
        }
    }
    showList = (productCategoryList)=>{
        return productCategoryList.map((prdc)=>this.showListProduct(prdc.IDProductCategory))
    }
    render() {
        var { product } = this.props;
        var { sort } = this.state;
        if (sort.by === 'Price') {
            product.sort((a, b) => {
                if (a.Price < b.Price) return sort.value;
                else if (a.Price > b.Price) return -sort.value;
                else return 0;
            });
        }
        
        var location = this.props.location.pathname;
        var idproductct;
        var id = location.includes('/category/') && location.replace('/category/', '');
        if (id && this.findCategoryByID(id)) {
            idproductct = this.findCategoryByID(id).IDProductCategory;
        }
        if(this.showListProduct(idproductct) === undefined && this.showList(this.checkParentCategory(idproductct)).length ===0){
            var result =<div className =" mt-5 mb-5 text-warning">Rất tiếc, không tìm thấy!</div>
        }
        return (
            <div className="container">
                {/* Computer Product Start Here */}
                <div id="computer" className="tab-pane fade show active e-header">
                    <div className="e-tabs-list">
                        {/* Nav tabs */}
                        <button className="btn btn-primary dropdown-toggle mt-3 " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sắp xếp
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                            <button
                                className="dropdown-item btn btn-light"
                                onClick={() => this.onSort('Price', 1)}
                            >Giá cao đến thấp</button>
                            <button
                                className="dropdown-item btn btn-light"
                                onClick={() => this.onSort('Price', -1)}
                            >Giá thấp đến cao</button>
                        </div>
                        {/* Tab Contetn Start */}
                    </div>
                    <div className="row">
                        {this.showListProduct(idproductct)}
                        {this.showList(this.checkParentCategory(idproductct))}
                        {result}
                    </div>
                </div>
                {/* Computer Product End Here */}
            </div>
        );
    }
    componentDidMount() {
        this.props.fetchAllProduct();
        this.props.fetchAllProductCategory();
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product,
        productCategory: state.productCategory
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProduct: () => {
            dispatch(actFetchProductRequest());
        },
        fetchAllProductCategory: () => {
            dispatch(actFetchProductCategoryRequest());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrangSanPhamTheoLoai);