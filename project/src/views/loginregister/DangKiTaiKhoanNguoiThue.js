import React from 'react';
import {
    useNavigate,
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import "./main.css";
import "./util.css";
import { getChinhSach,layTatCataiKhoan, dangKiTaiKhoanNguoiThue } from '../../services/admin/NghiemService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DangKiTaiKhoanNguoiThue extends React.Component {
    state = {
        tatCataiKhoan:[],
        chinhSach:"",
        ten:"",
        email:"",
        matKhau:"",
        gioiTinh:1,
        checkBox: false
    }

    thayDoiTen(event){
        this.setState({
            ten:event.target.value
        })
    }
    thayDoiEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    thayDoiMatKhau(event){
        this.setState({
            matKhau:event.target.value
        })
    }
    thayDoiGioiTinh(event){
        this.setState({
            gioiTinh:event.target.value
        })
    }
    thayDoiCheckBox(event){
        this.setState({
            checkBox:event.target.checked
        })
    }

    kiemTraRong(){
        if(this.state.ten===""){
            return false;
        }
        if(this.state.email===""){
            return false;
        }
        if(this.state.matKhau==""){
            return false;
        }
        return true;
    }
    kiemTraDoDaiMatKhau(){
        if(this.state.matKhau.length<6){
            return false;
        }
        return true;
    }

    kiemTraCheckBox(){
        if(this.state.checkBox===false){
            return false;
        }
        return true;
    }
    kiemTraEmailDaCo(){
        for (let index = 0; index < this.state.tatCataiKhoan.length; index++) {
            if(this.state.tatCataiKhoan[index].email===this.state.email){
                return false;
            }
        }
        return true;
    }

   

    async componentDidMount(){
        let res = await getChinhSach(1);
        if(res!=null){
            this.setState({
                chinhSach:res.noiDungChinhSach
            })
        }
        let resTK = await layTatCataiKhoan();
        if(resTK!=null){
            this.setState({
                tatCataiKhoan:resTK
            })
        }
    }
    openChinhSach(){
        let modal = document.querySelector(".modal");
        modal.style.display = "block"
    }
    dongModal(){
        let modal = document.querySelector(".modal");
        modal.style.display = "none"
      }



    async dangKiTaiKhoanChuTro(){
        if(this.kiemTraRong()){
            if(this.kiemTraDoDaiMatKhau()){
                if(this.kiemTraCheckBox()){
                    if(this.kiemTraEmailDaCo()){
                        let res = await dangKiTaiKhoanNguoiThue(this.state.ten,this.state.email,this.state.matKhau,this.state.email,this.state.gioiTinh);
                        if(res!=null){
                            toast.success("Đăng Kí Tài Khoản Thành Công!");
                            this.setState({
                                ten:"",
                                email:"",
                                matKhau:"",
                                checkBox:false,
                                gioiTinh:1
                            })
                            

                        }else{
                            toast.error("Đăng Kí Tài Khoản Thất Bại!")
                        }
                    }else{
                        toast.warning("Email Đã Tồn Tại!")
                    }
                    
                }else{
                    toast.warning("Bạn chưa đồng ý với chính sách!")
                }
            }else{
                toast.warning("Mật khẩu tối thiểu 6 kí tự!")
            }
        }else{
            toast.warning("Không Được Để Rỗng!")
        }
    }

    render() {
        let {chinhSach,ten,email,matKhau,checkBox} = this.state;
        let isObjectChinhSach = Object.keys(chinhSach).length === 0
        return (
                <>
                 
                    <div className="limiter">
                    
                        <div className="container-login100 my-background-lr">
                        
                            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                           
                                <form className="login100-form validate-form">
                                                <ToastContainer
                                        position="top-right"
                                        autoClose={1000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="dark"
                                    />
                                    <span className="login100-form-title p-b-49">
                                        Đăng Kí Tài Khoản Người Thuê
                                    </span>

                                    <div className="wrap-input100 validate-input m-b-23" data-validate="Tên là bắt buộc">
                                        <span className="label-input100">Tên Người Dùng</span>
                                        <input className="input100" type="text" placeholder="Nhập Tên của bạn" value={ten}onChange={(e)=>this.thayDoiTen(e)}/>
                                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Email là bắt buộc">
                                        <span className="label-input100">Email</span>
                                        <input className="input100" type="text"  placeholder="Nhập Email của bạn" value={email} onChange={(e)=>this.thayDoiEmail(e)}/>
                                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Mật khẩu là bắt buộc">
                                        <span className="label-input100">Mật khẩu</span>
                                        <input className="input100" type="password"  placeholder="Nhập Mật Khẩu của bạn" value={matKhau} onChange={(e)=>this.thayDoiMatKhau(e)} />
                                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                                    </div>
                                        <span className="label-input100">Giới Tính</span>
                                        <select className="form-select" value={this.state.gioiTinh} onChange={(e)=>this.thayDoiGioiTinh(e)}>
                                            <option value={1}  >Nam</option>
                                            <option value={2} >Nữ</option>
                                            <option value={0} >Khác</option>
                                        </select>
                                    <input type="checkbox" className='chinhSach' defaultChecked={checkBox} onClick={(event=>this.thayDoiCheckBox(event))}/>
                                    <label > Bạn Có Đồng Ý Với <b onClick={()=>this.openChinhSach()}> Chính Sách?  </b></label><br></br>
                                    <div className="text-right p-t-8 p-b-31">
                                    
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"></div>
                                            <button className="login100-form-btn" type='button' onClick={()=>this.dangKiTaiKhoanChuTro()}>
                                            Đăng ký
                                            </button>
                                        </div>
                                    </div>
                                    <div className="txt1 text-center p-t-54 p-b-20">

                                       
                                            <Link to="/">
                                            Quay Lại
                                            </Link>
                                           
                                        
                                    </div>
                                </form>
                               
                            </div>
                            
                        </div>
                        
                        <div className="modal">
                        
                        <div className="modal-content">
                            <p className='tieudechinhsach'>Thông Tin Chính Sách</p>
                            <textarea className="form_edit_chinh_sach" defaultValue={isObjectChinhSach===true?"":chinhSach}>
                            </textarea>
                            <button className='btn btn-danger bbt' onClick={()=>this.dongModal()}>Đóng</button>
                        </div>
                    </div>



                   
                    </div>
                    
                </>
        )
    }

}
export default DangKiTaiKhoanNguoiThue;