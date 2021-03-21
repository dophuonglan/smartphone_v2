import React, { Component } from 'react';
class AccountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            Name: '',
            Account: '',
            Password: '',
            confirmPassword: '',
            presentPassword: '',
            Phone: 0,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.userAccount) {
            this.setState({
                Name: nextProps.userAccount.Name,
                Account: nextProps.userAccount.Account,
                Phone: nextProps.userAccount.Phone,
            });
        }
    }
    onChange = (event) => {
        var target = event.target;
        var Name = target.name;
        var Account = target.name;
        var Phone = target.name;
        var presentPassword = target.name;
        var Password = target.name;
        var confirmPassword = target.name;

        this.setState({
            [Name]: target.value,
            [Account]: target.value,
            [Phone]: target.value,
            [presentPassword]: target.value,
            [Password]: target.value,
            [confirmPassword]: target.value,
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
    }
    onUpdateProfile = (userAccount) => {
        var { Name, Account, Phone, isChecked, Password, confirmPassword, presentPassword } = this.state;
        if (isNaN(Phone)) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }
        if (Name === '') {
            alert("Tên không hợp lệ!");
            return;
        }
        if (Account === '') {
            alert("Tên không hợp lệ!");
            return;
        }
        var customer = {
            ID: userAccount.ID,
            Account: Account,
            Name: Name,
        }
        if (isChecked) {
            if (confirmPassword === Password) { // mat khâu moi = nhap lai
                /////check pass cu dung khong
                if (presentPassword === userAccount.Password) { // mat khâu cu bang mat khau cu
                    if (Password.length >= 8) {
                        customer = {
                            ID: userAccount.ID,
                            Account: Account,
                            Name: Name,
                            Password: Password,
                        }
                    }
                    else {
                        alert("Mật khẩu phải lớn hơn hoặc bằng 8 kí tự")
                    }
                }
                else {
                    alert("Mật khẩu cũ không hợp lệ!");
                }
                /////neu k dung thi log mat khau cu khong hop le
            }
            else {
                alert("Nhập lại mật khẩu không đúng")
            }
        }
        this.props.onUpdateCustomer(customer);
        window.location.reload();
    }
    render() {
        var { isChecked, Name, Phone, Account, Password, confirmPassword, presentPassword } = this.state;
        var { userAccount } = this.props;
        return (
            <div className="register-form login-form clearfix">
                <form action="#" onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label htmlFor="f-name" className="col-lg-3 col-md-4 col-form-label">Họ và tên</label>
                        <div className="col-lg-6 col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                name='Name'
                                value={Name}
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-lg-3 col-md-4 col-form-label">Email</label>
                        <div className="col-lg-6 col-md-8">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name='Account'
                                value={Account}
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-lg-3 col-md-4 col-form-label">Số điện thoại</label>
                        <div className="col-lg-6 col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                name='Phone'
                                value={Phone}
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                    </div>
                    <div className='center-text'>
                        <input type="checkbox"
                            onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                            value={isChecked}
                        ></input>
                        <label className="col-sm-2">Đổi mật khẩu</label>
                    </div>
                    <div style={isChecked ? { display: 'block' } : { display: 'none' }}>
                        <div className="form-group row">
                            <label htmlFor="inputpassword" className="col-lg-3 col-md-4 col-form-label">Mật khẩu hiện tại</label>
                            <div className="col-lg-6 col-md-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputpassword"
                                    name='presentPassword'
                                    value={presentPassword}
                                    onChange={(e) => this.onChange(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="newpassword" className="col-lg-3 col-md-4 col-form-label">Mật khẩu mới</label>
                            <div className="col-lg-6 col-md-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newpassword"
                                    name='Password'
                                    value={Password}
                                    onChange={(e) => this.onChange(e)}
                                />
                                <button className="btn show-btn" type="button">Hiển thị</button>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="c-password" className="col-lg-3 col-md-4 col-form-label">Nhập lại</label>
                            <div className="col-lg-6 col-md-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="c-password"
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => this.onChange(e)}
                                />
                                <button className="btn show-btn" type="button">Hiển thị</button>
                            </div>
                        </div>
                    </div>
                    <div className="register-box mt-40">
                        <button type="submit" className="return-customer-btn float-right" onClick={() => this.onUpdateProfile(userAccount)}>Lưu</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default (AccountDetail);