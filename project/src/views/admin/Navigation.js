import React from "react";
import "../../styles/admin.css";
import {
    Link, NavLink
} from "react-router-dom";
class Navigation extends React.Component {
    render() {
        return (
            <>
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <Link to='/admin/quanlychutro' className="sidebar-brand"><span className="align-middle">Admin</span></Link>

                        <ul className="sidebar-nav">
                            <li className="sidebar-header">
                                Pages
                            </li>
                            <li>
                                <NavLink to='/admin/quanlychutro' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Quản lý chủ trọ</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/quanlygoidangky' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Quản lý dịch vụ</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/quanlytienich' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Quản lý tiện ích</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/xacthucchutro' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Xác thực chủ trọ</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/xacthucgoidangky' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">yêu cầu đăng ký gói</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/quanlykhuvuc' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Quản lý khu vực</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/quanlybanner' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Quản lý banner</span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to='/admin/thongtintaikhoan' className={(navData) => (navData.isActive ? "sidebar-item active" : 'sidebar-item')}><span className="sidebar-link align-middle">Thông tin tài khoản</span></NavLink>
                            </li>
                        </ul>


                    </div>
                </nav>
            </>
        )
    }
}
export default Navigation;