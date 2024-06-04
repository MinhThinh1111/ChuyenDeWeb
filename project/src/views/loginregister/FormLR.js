import React, { useState, useEffect } from 'react';
import {
    useNavigate,
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import "./main.css";
import "./util.css";
import { checkAccountAPI } from "../../services/admin/MinhService";

function LoginRegister() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false);

    const kiemTraTrangThaiDangNhap = () => {
        console.log("OKKK");
        if (sessionStorage.getItem("accountType") == 2) { navigate("/admin") }
        else if (sessionStorage.getItem("accountType") == 1) { navigate("/chutro") }
        else if (sessionStorage.getItem("accountType") == 0) { navigate("/nguoithue") }
    }

    useEffect(() => {
        kiemTraTrangThaiDangNhap();
    }, []);


    const handleOnChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const getData = async () => {
        let res = await checkAccountAPI(username, password);
        if (res != null) {
            setAccount(res);
            console.log(res);
            setLoading(true);
            if (res && res !== "") {
                sessionStorage.setItem("accountId", res.id);
                sessionStorage.setItem("accountType", res.loaiTaiKhoan);
                sessionStorage.setItem("idNguoiDung", res.nguoiDangNhap.id);
                if (res.loaiTaiKhoan == 2) { navigate("/admin") }
                else if (res.loaiTaiKhoan == 1) {
                    navigate("/chutro");
                    sessionStorage.setItem("xacThuc", res.nguoiDangNhap.xacThuc);
                }
                else if (res.loaiTaiKhoan == 0) { navigate("/nguoithue") }

            }
            else {
                navigate("/")
            }
        }
        if (res == "") {
            setFail(true);
        }
    }
    const checkLogin = () => {

    }



    return (
        loading == true && fail == false ? checkLogin() :
            <>
                <div className="limiter">
                    <div className="container-login100 my-background-lr">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-49">
                                    Đăng nhập
                                </span>

                                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                                    <span className="label-input100">Tên tài khoản</span>
                                    <input className="input100" type="text" value={username} onChange={handleOnChangeUsername} placeholder="Nhập tài khoản của bạn" />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <span className="label-input100">Mật khẩu</span>
                                    <input className="input100" type="password" value={password} onChange={handleOnChangePassword} placeholder="Nhập mật khẩu của bạn" />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                </div>

                                <div className="text-right p-t-8 p-b-31">
                                    <Link to="/forgotpassword">Quên mật khẩu?</Link>
                                </div>

                                {fail == true ? <p className='fail-login'>Tài khoản mật khẩu không chính xác</p> : <p className='fail-login'></p>}

                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" type='button' onClick={getData}>
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>

                                <div className="txt1 text-center p-t-54 p-b-20">

                                    <a href="#" className="txt2">
                                        <Link to="/chonloaitaikhoan">
                                            Đăng ký
                                        </Link>
                                    </a>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>



            </>

    )


}

export default LoginRegister;