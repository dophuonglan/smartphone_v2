import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                {/* Footer Area Start Here */}
                <footer className="footer-area black-bg pt-60">
                    <div className="container">
                        <div className="footer-top">
                            <div className="footer-logo text-center">
                                <a href="index.html">
                                    <img src="\img\logo\logo2.png" alt="footer-logo" />
                                </a>
                            </div>
                            {/* Support Area Start Here */}
                            <div className="support-area d-flex flex-wrap justify-content-between">
                                {/* Single Support Area Start Here */}
                                <div className="single-support mb-all-40">
                                    <div className="support-icon">
                                        <img src="\img\support\s1.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Miễn phí giao hàng</h6>
                                        <p>Hầu hết các sản phẩm đều miễn phí
                                    <br /> vận chuyển.</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                                {/* Single Support Area Start Here */}
                                <div className="single-support mb-all-40">
                                    <div className="support-icon">
                                        <img src="\img\support\s2.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Hổ trợ khách hàng</h6>
                                        <p>24x7 Hổ trợ khách hàng</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                                {/* Single Support Area Start Here */}
                                <div className="single-support">
                                    <div className="support-icon">
                                        <img src="\img\support\s3.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Thanh toán an toàn</h6>
                                        <p>Thanh toán an toàn nhất
                                    <br /> 
                                    cho khách hàng.</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                            </div>
                            {/* Support Area End Here */}
                        </div>
                        <div className="footer-middle ptb-60">
                            <div className="row">
                                {/* Single Footer Start */}
                                <div className="col-lg-6 col-md-6 mb-sm-40">
                                    <div className="single-footer">
                                        <h4 className="footer-title e-header">Thông tin liên lạc</h4>
                                        <div className="footer-content">
                                            <ul className="footer-list contact-info">
                                                <li className="location">
                                                    <p>Trường Đại học GTVT HCM</p>
                                                    <p>Tô Ký, Q.12 TPHCM</p>
                                                </li>
                                                <li className="mail">
                                                    <p>dophuonglan0299@gmail.com</p>
                                                    <p>1751120087@sv.ut.edu.vn</p>
                                                </li>
                                                <li className="phone">
                                                    <p>+ 0987665555</p>
                                                    <p>+ 0977776666</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Single Footer End */}
                                {/* Single Footer Start */}
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-footer">
                                        <h4 className="footer-title e-header">newsletter</h4>
                                        <div className="footer-content">
                                            <ul className="footer-list newsletter-text">
                                                <li className="footer-search mb-30">
                                                    <form action="#">
                                                        <input type="text" placeholder="Email" name="footer-mail" id="footer-mail" />
                                                        <button>
                                                            <i className="zmdi zmdi-mail-send" />
                                                        </button>
                                                    </form>
                                                </li>
                                                <li>
                                                    <h5 className="e-header">Social Icon</h5>
                                                    <ul className="footer-social d-inline-flex mt-30">
                                                        <li>
                                                            <a href="#">
                                                                <i className="zmdi zmdi-twitter" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="zmdi zmdi-vimeo" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="zmdi zmdi-pinterest" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="zmdi zmdi-dribbble" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Single Footer End */}
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Footer Area End Here */}
            </div>
        );
    }
}

export default Footer;