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
import { getChinhSach,dangKiTaiKhoanChuTro,layTatCataiKhoan } from '../../services/admin/NghiemService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ChonLoaiTaiKhoan extends React.Component {
    
    render() {
       
        return (
                <>
                 
                    <div className="limiter">
                    
                        <div className="container-login100 my-background-lr">
                        
                            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                           
                                <form className="login100-form validate-form">
                                               
                                    <span className="login100-form-title p-b-49">
                                        Chọn Loại Tài Khoản Đăng Ký
                                    </span>
                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"></div>
                                            <Link to="/dangkitaikhoanchutro"><button className="login100-form-btn" type='button' >
                                            Tài Khoản Chủ Trọ
                                            </button></Link>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"></div>
                                            <Link to="/dangkitaikhoannguoithue"><button className="login100-form-btn" type='button' >
                                            Tài Khoản Người Thuê
                                            </button></Link>
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
                    </div>
                    
                </>
        )
    }

}

export default ChonLoaiTaiKhoan;