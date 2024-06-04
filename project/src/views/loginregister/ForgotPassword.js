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
import { checkUsernameAPI } from "../../services/admin/MinhService";
import { guiCodeLayLaiMatKhau } from "../../services/admin/MinhService";

function ForgotPassword() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();


    useEffect(() => {
    }, []);


    const handleOnChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const getData = async () => {
        let res = await checkUsernameAPI(username);
        if (res !== null && res !== -1) {
            if (res.email != "") {
                sessionStorage.setItem("accountForgotId", res.id);
                guiCodeLayLaiMatKhau(res.email, res.id);
                navigate("/codeforgot");
            }
            else {
                alert("Tài khoản này không có email khôi phục");
            }
        }
        if (res === -1) {
            alert("Tên tài khoản sai");
        }
    }



    return (
            <>
                <div className="limiter">
                    <div className="container-login100 my-background-lr">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-49">
                                    Lấy lại mật khẩu
                                </span>

                                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                                    <span className="label-input100">Tên tài khoản</span>
                                    <input className="input100" type="text" value={username} onChange={handleOnChangeUsername} placeholder="Nhập tài khoản của bạn" />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                </div>


                                <div className="text-right p-t-8 p-b-31">
                                    <Link to="/">Đăng nhập</Link>
                                </div>

                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" type='button' onClick={getData}>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>

                                <div className="txt1 text-center p-t-54 p-b-20">

                                    <a href="#" className="txt2">
                                        Đăng ký
                                    </a>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>



            </>

    )


}

export default ForgotPassword;