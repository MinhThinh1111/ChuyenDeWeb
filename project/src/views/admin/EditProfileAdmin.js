import React, { version } from 'react';
import './styleNghiem.css';
import {  baseURL } from '../../services/my-axios.js';
import { getProfileAdmin, updateProfileAdmin2,updateProfileAdmin1 } from '../../services/admin/NghiemService.js';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class EditProfileAdmin extends React.Component {
    state ={
        admin:{},
        idTaiKhoan:"",
        ten:"",
        hinh:null,
        soDienThoai:"",
        soTaiKhoanNganHang:"",
        tenChuTaiKhoanNganHang:""
    }
    async componentDidMount(){
        let idTaiKhoanSession = sessionStorage.getItem("accountId");
        let res = await getProfileAdmin(idTaiKhoanSession);
        if (res != null) {
            this.setState({
                admin: res,
                idTaiKhoan:idTaiKhoanSession,
                ten:res.ten,
                soDienThoai:res.soDienThoai,
                soTaiKhoanNganHang:res.soTaiKhoanNganHang,
                tenChuTaiKhoanNganHang:res.tenChuTaiKhoan
            })
        }
    }

    thayDoiTen(event){
        this.setState({
            ten:event.target.value
        })

    }
    thayDoiSoDienThoai(event){
        this.setState({
            soDienThoai:event.target.value
        })
    }
    thayDoiSoTaiKhoanNganHang(event){
        this.setState({
            soTaiKhoanNganHang:event.target.value
        })
    }
    thayDoiTenChuTaiKhoanNganHang(event){
        this.setState({
            tenChuTaiKhoanNganHang:event.target.value
        })
    }
    thayDoiHinh(event){
        this.setState({
            hinh:event.target.files[0]
        })
        
    }
    kiemTraHinh(){
        if(this.state.hinh===""){

        }else{

        }
    }
    kiemTraRong(){
        if(this.state.ten!==""){
            if(this.state.soDienThoai!==""){
                if(this.state.soTaiKhoanNganHang!==""){
                    if(this.state.tenChuTaiKhoanNganHang!==""){
                      this.capNhat()
                           
                        
                       
                    }else{
                        toast.warning("Không Được Bỏ Trống Tên Chủ Tài Khoản Ngân Hàng!");
                    }
                }else{
                    toast.warning("Không Được Bỏ Trống Số Tài Khoản Ngân Hàng!");
                }
            }else{
                toast.warning("Không Được Bỏ Trống Số Điện Thoại!");
            }
        }
        else{
            toast.warning("Không Được Bỏ Trống Tên!");
        }
        
    }

   
   
    async capNhat(){
        console.log(this.state.hinh);
        // let isObject = Object.keys(this.state.hinh).length === 0;
        if(this.state.hinh!=null){
            let res = await updateProfileAdmin1(this.state.idTaiKhoan,this.state.ten,this.state.soDienThoai,this.state.soTaiKhoanNganHang,this.state.tenChuTaiKhoanNganHang,this.state.hinh);
            if (res != null) {
                toast.success("Cập Nhật Thông Tin Thành Công!");
            }else{
                toast.error("Cập Nhật Thất Bại!");
            }
        }else{
            let res = await updateProfileAdmin2(this.state.idTaiKhoan,this.state.ten,this.state.soDienThoai,this.state.soTaiKhoanNganHang,this.state.tenChuTaiKhoanNganHang);
            if (res != null) {
                toast.success("Cập Nhật Thông Tin Thành Công!");
            }else{
                toast.error("Cập Nhật Thất Bại!");
            }
        }
       
    }
    render() {
        let {admin, ten, hinh, soDienThoai,soTaiKhoanNganHang,tenChuTaiKhoanNganHang} = this.state;
        let isObject = Object.keys(admin).length === 0
        return (
            <>
                <div className="main">
                    <main className="content">
                    <div className="manhinhadmin">

                    <img src={isObject===false?baseURL+admin.hinh:""} className="avt_admin_nghiem"/>
                    <div className="bg_admin">
                    
                    </div>
                    <div className="thongtin_content">
                    <p className="title_admin">Cập Nhật Thông Tin Admin</p>
                    <div className="noidung_content">
                    <form action="#" className="form-control" encType="multipart/form-data" method="post">
                        <div className="mb-3">
                            <label htmlFor="ten" className="form-label">Tên Của Admin</label>
                            <input value={ten}  onChange={(event)=>this.thayDoiTen(event)} type="text" id="ten" name="ten" placeholder="Nhập Tên Của Admin Vào Đây..." className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="soDienThoai" className="form-label">Số Điện Thoại</label>
                            <input value={soDienThoai} onChange={(event)=>this.thayDoiSoDienThoai(event)} type="text" id="soDienThoai" name="soDienThoai" placeholder="Nhập Số Điện Thoại Của Admin Vào Đây..." className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="soTaiKhoanNganHang" className="form-label">Số Tài Khoản Ngân Hàng</label>
                            <input value={soTaiKhoanNganHang} onChange={(event)=>this.thayDoiSoTaiKhoanNganHang(event)} type="text" id="soTaiKhoanNganHang" name="soTaiKhoanNganHang" placeholder="Nhập Số Tài Khoản Ngân Hàng Của Admin Vào Đây..." className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tenChuTaiKhoanNganHang" className="form-label">Tên Chủ Tài Khoản Ngân Hàng</label>
                            <input value={tenChuTaiKhoanNganHang} onChange={(event)=>this.thayDoiTenChuTaiKhoanNganHang(event)} type="text" id="tenChuTaiKhoanNganHang" name="tenChuTaiKhoanNganHang" placeholder="Nhập Tên Chủ Tài Khoản Ngân Hàng Vào Đây..." className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hinh" className="form-label">Ảnh Admin</label>
                            <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" placeholder="Chọn Hình Đại Diện" className="form-control"/>
                        </div>
                        <button type="button" className="btn btn-info bbt" onClick={()=>this.kiemTraRong()}>Đồng Ý</button>
                        <NavLink to="/admin/thongtintaikhoan">
                        <button type="button" className="btn btn-warning bbt" >Quay lại</button>
                        </NavLink>
                      </form>
                    </div>
                    </div>
                    </div>
   
                    </main>
                </div>
            </>
        )
    }
}
export default EditProfileAdmin;