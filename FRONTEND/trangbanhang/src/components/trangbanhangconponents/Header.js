import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actChangeMessage, actChangeTitle, actDeleteProductInCart, actLogout, actUpdateProductInCart, actFetchProductRequest, actFetchProductFilter } from './../../actions/index';
import * as Message from './../../constants/Message';
import TitleContainer from '../../containers/TitleContainer';
import Search from './Search';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiSanPham: null,
            AllProductLocation: false,
            clickCartReview: false,
            isDel: false,
            search: ''
        }
    }
    currencyFormat = (num) => {
        return num && parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    componentWillReceiveProps(nextProps) {
        return nextProps && this.setState({
            loaiSanPham: nextProps.loaiSanPham
        })
    }
    onShowCartView = () => {
        this.setState({
            clickCartReview: !this.state.clickCartReview
        });
    }
    logout = () => {
        this.props.onLogout();
        this.props.onChangeTitle(Message.TITLE_LOGIN);
    }
    onFilter = (search) => {
        this.setState({
            search: search
        });
    }
    render() {
        var { cart, login, product, onFetchProductFilter, onFetchProduct } = this.props;
        let len = cart.length;
        var { loaiSanPham, clickCartReview, search } = this.state;
        var productFilter;
        if (search) {
            productFilter = product.filter((prd) => {
                return prd.Name.toLowerCase().indexOf(search) !== -1;
            })
        }
        var tenLoaiSanPham = loaiSanPham && this.state.loaiSanPham.map((value, index) => {
            return (<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" key={index}>
                <Link to={"/category/" + value.IDProductCategory}>{value.Name}</Link>
            </div>);
        })
        return (
            <div>
                {/* Header Area Start Here */}
                <header className="header-area">
                    <div className="header-top">
                        <div className="container">
                            <div className="row align-items-center text-center text-md-left">
                                {/* Logo Start */}
                                <div className="col-md-3 col order-1 order-md-1 mb-sm-30">
                                    <div className="logo">
                                        <Link to="/">
                                            <img src="\img\logo\logo.png" alt="logo-img" />
                                        </Link>
                                    </div>
                                </div>
                                {/* Logo End */}
                                {/* Search Box Start Here */}
                                <Search
                                    onFilter={this.onFilter}
                                    productFilter={productFilter}
                                    onFetchProductFilter={onFetchProductFilter}
                                    onFetchProduct={onFetchProduct}
                                ></Search>
                                {/* Search Box End Here */}
                                {/* Cart Box Start Here */}
                                <div className="col-md-3 col order-2 order-md-3 mb-sm-30">
                                    <div className="cart-box float-md-right">
                                        <div className="drodown-show">
                                            <span className="total-pro" onClick={this.onShowCartView}>{len} Sản phẩm
                                                <br />
                                                <span>{this.currencyFormat(this.showTotalAmount(cart))} VND</span>
                                            </span>

                                            <ul className="dropdown cart-box-width" style={clickCartReview ? { display: 'block' } : { display: 'none' }}>
                                                <li>
                                                    {this.showCartItem(cart)}
                                                    {/* Cart Footer Inner Start */}
                                                    {this.showTotalMount(cart)}
                                                    {/* Cart Footer Inner End */}
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                {/* Cart Box End Here */}
                            </div>
                        </div>
                    </div>
                    <div className="header-bottom blue-bg header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                {/* Menu Area Start Here */}
                                <div className="col-lg-10 d-none d-lg-block">
                                    <nav>
                                        <ul className="header-menu-list">
                                            <li className="active">
                                                <NavLink to="/">Trang chủ</NavLink>
                                            </li>
                                            <li>
                                                <Link to='/' className="drop-icon" onClick={() => this.setState({ AllProductLocation: true })}>Điện thoại</Link>
                                                {/*  Mega-Menu Start */}
                                                <ul className="ht-dropdown megamenu">
                                                    {/* Single Column Start */}
                                                    <li>
                                                        <div className="menu-tile"> Loại </div>
                                                        <div className="row">
                                                            {tenLoaiSanPham}
                                                        </div>
                                                    </li>
                                                    {/* Single Column End */}
                                                </ul>
                                                {/* Mega-Menu End */}
                                            </li>
                                            
                                            <li className=' float-right'
                                            >
                                                <TitleContainer></TitleContainer>
                                                <ul className="ht-dropdown" style={login === Message.TITLE_LOGIN ? { display: 'none' } : { display: 'block' }} >
                                                    <li>
                                                        <Link to='/profile'>Thông tin cá nhân</Link>
                                                    </li>
                                                    <li>
                                                        <button className='btn btn-light' onClick={this.logout}>Đăng xuất</button>
                                                    </li>

                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                {/* Menu Area End Here */}

                            </div>
                            {/* Row End */}

                        </div>
                        {/* Container End */}
                    </div>
                </header>
                {/* Header Area End Here */}
            </div>
        );
    }
    showCartItem = (cart) => {
        var result = <div key={0}>{Message.MSG_CART_EMPTY}</div>
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                let image = item.product && item.product.Image.slice(15);
                const newImage = require('./../../../../../BACKEND/newapp/public/uploads/' + image).default;
                return <div className="single-cart-box" key={index}>
                    <div className="cart-img">
                        <span className="active">
                            <img src={image && newImage} alt="cart-image" />
                        </span>
                        <span className="pro-quantity">{item.quantity}X</span>
                    </div>
                    <div className="cart-content">
                        <h6>
                            <a href="product-details.html">{item.product.Name} </a>
                        </h6>
                        <span className="cart-price">{this.currencyFormat(item.product.Price)} VND</span>
                        <span>Color: Yellow</span>
                    </div>
                    <span className="del-icone">
                        <span className="ti-close" onClick={() => this.onDelete(item.product)} />
                    </span>
                </div>
            })
        }
        return result;
    }
    onDelete = (product) => {
        this.props.onDeleteProductInCart(product);
    }
    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].product.Price * cart[i].quantity;
            }
        }
        return total;
    }
    showTotalMount = (cart) => {
        var result = null;
        if (cart.length > 0) {
            result = <div className="cart-footer">
                <ul className="price-content">
                    <li>Tổng tiền
                    <span>{this.showTotalAmount(cart)} VND</span>
                    </li>
                </ul>
                <div className="cart-actions text-center">
                    <Link to='/cart' className="cart-checkout" >
                        Đi đến giỏ hàng
                </Link>
                    <br />
                    <Link to='/checkout' className="cart-checkout">Thanh toán</Link>
                </div>
            </div>
        }
        return result;
    }
    componentDidMount() {
        this.props.onFetchProduct();
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        login: state.login,
        product: state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actDeleteProductInCart(product));
        },
        onChangeMessage: (message) => {
            dispatch(actChangeMessage(message));
        },
        onChangeTitle: (login) => {
            dispatch(actChangeTitle(login));
        },
        onLogout: () => {
            dispatch(actLogout());
        },
        onUpdateProductInCart: (product, quantity) => {
            dispatch(actUpdateProductInCart(product, quantity));
        },
        onFetchProduct: () => {
            dispatch(actFetchProductRequest());
        },
        onFetchProductFilter: (product) => {
            dispatch(actFetchProductFilter(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);