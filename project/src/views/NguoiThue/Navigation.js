import React from 'react';
import {
    Link, NavLink
} from "react-router-dom";
import logo from "../../images/logoapp3t.jpg";
class Navigation extends React.Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg nav-m">
                    <div className="container">
                        
                        <div className='logo_navi'>
                            
                        <NavLink to={`/nguoithue/trang-chu`}>
                            <img className='logo_img_navi' src={logo}/>
                            
                            </NavLink>
                            </div>
                        
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className='nav-item'>
                                    <NavLink to='/nguoithue/trang-chu' exact="true" className={(navData) => (navData.isActive ? "active nav-link m" : 'nav-link m')}>Trang chủ</NavLink>
                                </li>
                                <li className='nav-item'><NavLink to='/nguoithue/phong-cua-toi' className={(navData) => (navData.isActive ? "active nav-link m" : 'nav-link m')}>Phòng của tôi</NavLink></li>
                                <li className='nav-item'><NavLink to='/nguoithue/thongbao' className={(navData) => (navData.isActive ? "active nav-link m" : 'nav-link m')}>Thông báo</NavLink></li>
                                <li className='nav-item'><NavLink to='/nguoithue/tinnhan' className={(navData) => (navData.isActive ? "active nav-link m" : 'nav-link m')}>Tin Nhắn</NavLink></li>
                                <li className='nav-item'><NavLink to='/nguoithue/thongtin' className={(navData) => (navData.isActive ? "active nav-link m" : 'nav-link m')}>Thông Tin</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navigation;