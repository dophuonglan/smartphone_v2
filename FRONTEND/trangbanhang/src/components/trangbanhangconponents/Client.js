import React, { Component } from 'react';
import BreadcrumbAreaStart from './BreadcrumbAreaStart';
import Footer from './Footer';
import Header from './Header';
import {
    Route,
    Redirect
} from "react-router-dom";
import Home from './Home';
import axios from 'axios';
import TrangSanPhamTheoLoai from './TrangSanPhamTheoLoai';
import ProductDetail from './ProductDetail';
import Login from './Login'
import CartContainer from '../../containers/CartContainer';
import CheckoutReviewOrder from '../trangbanhangconponents/CheckoutPage/CheckoutReviewOrder';
import CheckoutContainer from '../../containers/CheckoutContainer';
import Profile from './ProfileAccountPage/Profile';
import RegisterComponent from '../Register/RegisterComponent';
const getDataProductCategory = () => {
    return axios.get('http://localhost:4000/selectProductCategory').then((res) => res.data);
}
const getDataProduct = () => {
    return axios.get('http://localhost:4000/selectProduct').then((res) => res.data);
}
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (sessionStorage.getItem('user') || localStorage.getItem('user')) && (localStorage.getItem('CART')) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
function PrivateRoute2({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (sessionStorage.getItem('user') || localStorage.getItem('user')) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            dataProduct: null,
            isDel: false
        }
    }
    del = () => {
        localStorage.getItem('user') ? this.setState({ isDel: true }) : this.setState({ isDel: false });
    }
    componentWillMount() {
        getDataProductCategory().then((res) => {
            !this.state.data && this.setState({
                data: res
            })
        })
        getDataProduct().then((res) => {
            !this.state.dataProduct && this.setState({
                dataProduct: res
            })
        })
    }
    render() {
        return (
            <div>
                {/* Main Wrapper Start Here */}
                <div className="wrapper">
                    <Header loaiSanPham={this.state.data} ></Header>
                    <BreadcrumbAreaStart
                        data={this.state.data}
                        dataProduct={this.state.dataProduct} />
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <PrivateRoute path="/checkout">
                        <CheckoutContainer></CheckoutContainer>
                    </PrivateRoute>
                    <PrivateRoute path="/revieworder">
                        <CheckoutReviewOrder></CheckoutReviewOrder>
                    </PrivateRoute>
                    <Route exact path="/cart">
                        <CartContainer></CartContainer>
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <PrivateRoute2 path="/profile">
                        <Profile></Profile>
                    </PrivateRoute2>
                    <Route exact path="/createaccount">
                        <RegisterComponent></RegisterComponent>
                    </Route>
                    {
                        this.state.data && this.state.data.map((value, index) => {
                            return <Route key={index} component={TrangSanPhamTheoLoai} exact path={"/category/" + value.IDProductCategory} />
                        })}
                    {
                        this.state.dataProduct && this.state.dataProduct.map((value, index) => {
                            return <Route key={index} exact path={"/product/" + value.IDProduct}>
                                <ProductDetail productDetail={value}></ProductDetail>
                            </Route>
                        })}
                    <Footer />
                </div>
                {/* Main Wrapper End Here */}
            </div>
        );
    }
}

export default (Client)