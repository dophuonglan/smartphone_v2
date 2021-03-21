import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import * as Message from './../../constants/Message';
import { connect } from 'react-redux';
import {actChangeTitle} from './../../actions/index';
import {Link} from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: false,
            onClickShowPass :false,
            isDel  :false
        }
    }
    onChange = (event) => {
        var target = event.target;
        var email = target.name;
        var password = target.name;
        var value = target.value;
        this.setState({
            [email]: value,
            [password]: value,
        },()=>{
            console.log(this.state.email)
            console.log(this.state.password);
        })
    }
    singIn = () => {
        var { email, password } = this.state;
        let component = this;
        axios.post('http://localhost:4000/signin', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                if (response.data===true) {
                    localStorage.setItem('user', JSON.stringify({
                        user_name: email,
                    }))
                }
                else alert("Đăng nhập thất bại!");
                component.setState({
                    isLogin: true
                })
            })
            .catch(function (error) {
                console.log(error);
            });
            this.props.onChangeTitle(Message.TITLE_LOGINED);
    }
    onSubmit =(event)=>{
        event.preventDefault();
    }
    componentDidUpdate(){
        if (localStorage.getItem('user')!==null) {
            if (this.state.isDel===false) {
                this.setState({
                    isDel : true
                });
            }
            
        }
    }
    render() {
        var loginedUser =null;
        localStorage.getItem('user') ? loginedUser = localStorage.getItem('user') : loginedUser = null;
        if (loginedUser !== null) {
            return <div>
                <Redirect to="/" />
                </div>
        }
        var {email,password,onClickShowPass} =this.state;
        return (
            <div>
                {/* Login Page Start Here */}
                <div className="login ptb-80">
                    <div className="container">
                        <h3 className="login-header">Đăng nhập tài khoản của bạn</h3>
                        <div className="row">
                            <div className="col-xl-6 col-lg-8 offset-xl-3 offset-lg-2">
                                <div className="login-form">
                                    <form  onSubmit={this.onSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-7">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="email" 
                                                placeholder="Email" 
                                                name="email"
                                                onChange={(e)=>this.onChange(e)}
                                                value={email}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Mật khẩu</label>
                                            <div className="col-sm-7">
                                                <input 
                                                type={onClickShowPass ? 'text' :'password'} 
                                                className="form-control" 
                                                id="inputPassword" 
                                                placeholder="Mật khẩu" 
                                                autoComplete="off"
                                                name="password"
                                                value={password}
                                                onChange={(e)=>this.onChange(e)}
                                                />
                                                <button type ='submit' className="btn show-btn" onClick={()=>{this.setState({onClickShowPass : !onClickShowPass})}}>{onClickShowPass?'Ẩn' : 'Hiển thị'}</button>
                                            </div>
                                        </div>

                                        <div className="login-details text-center mb-25">
                                            <a href="admin">Quên mật khẩu? </a>
                                            <button className='login-btn' onClick ={this.singIn}>Đăng nhập</button>
                                        </div>
                                        <div className="login-footer text-center">
                                            <p>Không có tài khoản? <Link to= 'createaccount' className ="font-weight-bold text-primary">Tạo tài khoản mới</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Login Page End Here */}
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeTitle :(login) => {
            dispatch(actChangeTitle(login));
        },
    }
}
export default connect(null, mapDispatchToProps)(Login);