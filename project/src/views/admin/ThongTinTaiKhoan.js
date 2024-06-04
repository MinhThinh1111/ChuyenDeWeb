import React from 'react';
import './styleNghiem.css';
import { baseURL } from '../../services/my-axios.js';
import { getProfileAdmin } from '../../services/admin/NghiemService.js';
import { NavLink } from 'react-router-dom';
class ThongTinTaiKhoan extends React.Component {
    state ={
        admin:{}
    }
    async componentDidMount(){
        let idTaiKhoan = sessionStorage.getItem("accountId");
        let res = await getProfileAdmin(idTaiKhoan);
        if (res != null) {
            this.setState({
                admin: res
            })
        }
    }
    render() {
        let{admin} = this.state;
        let isObject = Object.keys(admin).length === 0
        return (
            <>
                <div className="main">
                    <main className="content">
                    <div className="manhinhadmin">
                   <img className='avt_admin_nghiem' src={isObject===false?baseURL+admin.hinh:""} alt='anh'/>
                   <div className="bg_admin">

                    </div>
                    <div className="thongtin_content">
                    <p className="title_admin">Thông Tin Tài Khoản Admin</p>
                    <div className="noidung_content">
                    <div><b className="labeladmin">Tên:</b> {admin.ten}</div>
                    <div><b className="labeladmin">Số Điện Thoại:</b> {admin.soDienThoai}</div>
                    <div><b className="labeladmin">Số Tài Khoản Ngân Hàng:</b> {admin.soTaiKhoanNganHang}</div>
                    <div><b className="labeladmin">Tên Chủ Tài Khoản Ngân Hàng:</b> {admin.tenChuTaiKhoan}</div>
                    <div className="dieuhuong">
                    <NavLink  to={`/admin/editprofileadmin`} ><button type="button" className="btn btn-info bbt">Sửa Thông Tin</button></NavLink>
                        <NavLink  to={`/admin/editpassword`} ><button type="button" className="btn btn-warning bbt">Đổi Mật Khẩu</button></NavLink>
                        <NavLink  to={`/admin/chinhsach`} ><button type="button" className="btn btn-success bbt">Xem Chính Sách</button></NavLink>
                        <NavLink  to={`/admin/dangxuat`} ><button type="button" className="btn btn-dark bbt dangxuat_btn">Đăng Xuất</button></NavLink>
                        </div>
                        </div>
                        </div>
                    </div>
   
                    </main>
                </div>
            </>
        )
    }
}
export default ThongTinTaiKhoan;