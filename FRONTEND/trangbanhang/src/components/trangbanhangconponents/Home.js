import React, { Component } from 'react';
import ListProduct from './ListProduct';
import { actFetchProductRequest } from './../../actions/index';
import { connect } from 'react-redux';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            sort : {
                by :'Price',
                value : 1
            }
        }
    }
    loadAllProduct = (product) =>{
        var result = <div className =" mt-5 mb-5 text-warning">Rất tiếc, không tìm thấy!</div>
        if(product.length>0){
            result = product && product.filter(value => value.Status === true).map((valueAllProduct, key) => {
                return (<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" key={key} >
                    <ListProduct valueAllProduct={valueAllProduct}
                    ></ListProduct>
                </div>)
            })
        }
        return result;
    }
    render() {
        var { product } = this.props;
        var {sort} =this.state;
        if (sort.by === 'Price') {
            product.sort((a, b) => {
                if (a.Price < b.Price) return sort.value;
                else if (a.Price > b.Price) return -sort.value;
                else return 0;
            });
        }
        return (
            <div>
                {/* Main Wrapper Start Here */}
                <div className="wrapper container-fluid">
                    {/* Slide Start Here */}
                    <div id="carouselExampleIndicators" className="carousel slide ml-5 mr-5 mt-3" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner container">
                            <div className="carousel-item active">

                                <img className="d-block w-100" src="https://cdn.tgdd.vn/2020/09/banner/reno4-chung-800-300-800x300-1.png" alt="First slide" height="460" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.tgdd.vn/2020/10/banner/Normal-Note20-800-300-800x300.png" alt="Second slide" height="460" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.tgdd.vn/2020/10/banner/iphone-12-800-300-800x300-3.png" alt="Third slide" height="460" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    {/* Slide End Here */}
                    {/* Laptop & Computer Products Start Here */}
                    <div className="laptop-computers pb-80 mt-5">
                        <div className="container">
                            <div className="electronics-list-area d-flex flex-wrap align-items-center justify-content-between mb-40">
                                <h5 className="e-header mb-sm-15">Sản phẩm</h5>
                                <div className="e-tabs-list">
                                    {/* Nav tabs */}
                                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sắp xếp
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                                <button 
                                                className="dropdown-item btn btn-light" 
                                                onClick ={()=>this.onSort('Price',1)}
                                                >Giá cao đến thấp</button>
                                                <button 
                                                className="dropdown-item btn btn-light"
                                                onClick ={()=>this.onSort('Price',-1)}
                                                >Giá thấp đến cao</button>
                                            </div>
                                    {/* Tab Contetn Start */}
                                </div>
                            </div>
                            {/* Categorie Tab Contetn Start Here */}
                            <div>
                                {/* Computer Product Start Here */}
                                <div id="computer" className="tab-pane fade show active">
                                    <div className="row">
                                        {this.loadAllProduct(product)}
                                    </div>
                                </div>
                                {/* Computer Product End Here */}
                            </div>
                            {/* Categorie Tab Contetn End Here */}
                        </div>
                    </div>
                    {/* Laptop & Computer Products End Here */}

                </div>


            </div>
        );
    }
    onSort = (sortBy , sortValue) =>{
        this.setState({
            sort :{
                by : sortBy,
                value : sortValue
            }
        });
    }
    componentDidMount() {
        this.props.onFetchProduct()
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProduct: () => {
            dispatch(actFetchProductRequest());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);