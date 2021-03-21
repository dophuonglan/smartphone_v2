import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actRegisteredRequest, actFetchCustomerRequest } from './../../actions/index';
class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            lableName: true,
            lableEmail: true,
            lablePass: true,
            lablePhone: true,
            lableComfirmPass: true,
            lableCheckDuplicateEmail: true,
            lableCheckLenPhone: true,
            lableCheckLenPass: true,
            lableCheckConfirmPass: true
        }
    }
    componentDidMount() {
        this.props.onFetchCustomerRequest();
    }
    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var email = target.name;
        var password = target.name;
        var phone = target.name;
        var confirmPassword = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
            [email]: value,
            [password]: value,
            [phone]: value,
            [confirmPassword]: value,
        }, () => {
            if (this.checkForDuplicateAccount(this.state.email).length !== 0) this.setState({ lableCheckDuplicateEmail: false }); else { this.setState({ lableCheckDuplicateEmail: true }); };
            if (this.state.phone.length !== 10) this.setState({ lableCheckLenPhone: false }); else { this.setState({ lableCheckLenPhone: true }); };
            if (this.state.password.length < 8) this.setState({ lableCheckLenPass: false }); else { this.setState({ lableCheckLenPass: true }); };
            if (this.state.password.trim() !== this.state.confirmPassword.trim()) this.setState({ lableCheckConfirmPass: false }); else { this.setState({ lableCheckConfirmPass: true }); };
            if (this.state.name.trim() === '') this.setState({ lableName: false }); else { this.setState({ lableName: true }); };
            if (this.state.email.trim() === '') this.setState({ lableEmail: false }); else { this.setState({ lableEmail: true }); };
            if (this.state.password.trim() === '') this.setState({ lablePass: false }); else { this.setState({ lablePass: true }); };
            if (this.state.phone.trim() === '') this.setState({ lablePhone: false }); else { this.setState({ lablePhone: true }); };
            if (this.state.confirmPassword.trim() === '') this.setState({ lableComfirmPass: false }); else { this.setState({ lableComfirmPass: true }); };
        })
    }
    onHandleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
            + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }
    checkForDuplicateAccount = (email) => {
        return this.props.customer && this.props.customer.filter((ac) => ac.Account.toLowerCase().trim() === email.toLowerCase().trim())
    }
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    onRegistration = () => {
        var { name, email, password, confirmPassword, phone } = this.state;
        var customer;
        if (name.trim() === '') this.setState({ lableName: false });
        if (email.trim() === '') this.setState({ lableEmail: false });
        if (password.trim() === '') this.setState({ lablePass: false });
        if (phone.trim() === '') this.setState({ lablePhone: false });
        if (confirmPassword.trim() === '') this.setState({ lableComfirmPass: false });
        if (!this.validateEmail(email)) return;
        if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && phone !== "" && phone.length === 10 &&
            password === confirmPassword && confirmPassword.trim() !== "") {
            customer = {
                ID: this.generateID(),
                Name: name,
                Account: email,
                Password: password,
                Phone: phone,
                Decentralization: 'customer'
            }
            this.props.onRegisteredRequest(customer);
            alert("Đăng ký thành công!");
            this.setState({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
            });
        }
        else {
            alert("Không thành công");
        }
    }
    render() {
        console.log(this.props.customer);
        var loginedUser = null;
        localStorage.getItem('user') ? loginedUser = localStorage.getItem('user') : loginedUser = null;
        if (loginedUser !== null) {
            return <div>
                <Redirect to="/" />
            </div>
        }
        var { name,
            email,
            phone,
            password,
            confirmPassword,
            lableName,
            lableEmail, lableCheckConfirmPass,
            lablePass, lableCheckLenPass,
            lablePhone, lableCheckLenPhone,
            lableComfirmPass, lableCheckDuplicateEmail } = this.state;
        return (
            <div>
                <div className="register-area ptb-80">
                    <div className="container">
                        <h3 className="login-header">Tạo tài khoản </h3>
                        <div className="row">
                            <div className="offset-xl-1 col-xl-10">
                                <div className="register-form login-form clearfix">
                                    <form onSubmit={this.onHandleSubmit} action="#">
                                        <p>Bạn đã có tài khoản?<Link to='/login' className="font-weight-bold text-primary"> Đăng nhập</Link></p>
                                        <div className="form-group row">
                                            <label htmlFor="l-name" className="col-lg-3 col-md-3 col-form-label">Họ và tên
                                            <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="text"
                                                    autoComplete="off"
                                                    className={lableName ? "form-control" : "form-control is-invalid"}
                                                    name="name"
                                                    onChange={this.onHandleChange}
                                                    value={name}
                                                />
                                            </div>
                                            <span className="text-danger" style={lableName ? { display: 'none' } : { display: 'block' }}> Tên không được bỏ trống</span>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-lg-3 col-md-3 col-form-label">Email
                                            <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="email"
                                                    className={lableEmail ? "form-control" : "form-control is-invalid"}
                                                    autoComplete="off"
                                                    name="email"
                                                    onChange={this.onHandleChange}
                                                    value={email}
                                                />
                                            </div>
                                            <span className="text-danger" style={lableEmail ? { display: 'none' } : { display: 'block' }}> Email không được bỏ trống</span>
                                            <span className="text-danger" style={lableCheckDuplicateEmail ? { display: 'none' } : { display: 'block' }}> Email đã tồn tại</span>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="l-name" className="col-lg-3 col-md-3 col-form-label ">Số điện thoại
                                            <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="number"
                                                    className={lablePhone ? "form-control" : "form-control is-invalid"}
                                                    autoComplete="off"
                                                    name="phone"
                                                    onChange={this.onHandleChange}
                                                    value={phone}
                                                />
                                            </div>
                                            <span className="text-danger center-text" style={lablePhone ? { display: 'none' } : { display: 'block' }}> SĐT không được bỏ trống</span>
                                            <span className="text-danger center-text" style={lableCheckLenPhone ? { display: 'none' } : { display: 'block' }}> SĐT không hợp lệ</span>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-lg-3 col-md-3 col-form-label">Mật khẩu
                                            <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="password"
                                                    className={lablePass ? "form-control" : "form-control is-invalid"}
                                                    autoComplete="off"
                                                    name="password"
                                                    onChange={this.onHandleChange}
                                                    value={password}
                                                />
                                            </div>
                                            <span className="text-danger" style={lablePass ? { display: 'none' } : { display: 'block' }}> Mật khẩu không được bỏ trống</span>
                                            <span className="text-danger" style={lableCheckLenPass ? { display: 'none' } : { display: 'block' }}> Mật khẩu phải ít nhất 8 ký tự</span>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-lg-3 col-md-3 col-form-label">Xác nhận mật khẩu
                                            <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="password"
                                                    className={lableComfirmPass ? "form-control" : "form-control is-invalid"}
                                                    autoComplete="off"
                                                    name="confirmPassword"
                                                    onChange={this.onHandleChange}
                                                    value={confirmPassword}
                                                />
                                            </div>
                                            <span className="text-danger" style={lableComfirmPass ? { display: 'none' } : { display: 'block' }}> Xác nhận không được bỏ trống</span>
                                            <span className="text-danger" style={lableCheckConfirmPass ? { display: 'none' } : { display: 'block' }}> Xác nhận không đúng</span>
                                        </div>
                                        <div className="register-box mt-40">
                                            <button type="submit" className="login-btn float-right" onClick={this.onRegistration}>Đăng ký</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Register Page End Here */}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.customer
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onRegisteredRequest: (customer) => {
            dispatch(actRegisteredRequest(customer));
        },
        onFetchCustomerRequest: () => {
            dispatch(actFetchCustomerRequest());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);