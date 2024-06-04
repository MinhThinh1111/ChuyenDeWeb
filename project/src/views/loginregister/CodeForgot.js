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
import { checkcode } from "../../services/admin/MinhService";
import InputText from '../item/InputText';

function CodeForgot() {
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false);


    useEffect(() => {
    }, []);

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleOnChangeCode = (e) => {
        setCode(e.target.value);
    }

    const getData = async () => {
        let idTaiKhoan = sessionStorage.getItem("accountForgotId");
        console.log(idTaiKhoan);
        console.log(idTaiKhoan + " " + password);
        let res = await checkcode(idTaiKhoan, code, password);
        if (res) {
            alert(res.message);
            setLoading(true);
            if (res.status === 1) {
                sessionStorage.clear();
                navigate("/");
            }
            else {
                alert(res.message);
            }
        }
    }



    return (
            <>
                <div className="limiter">
                    <div className="container-login100 my-background-lr">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-49">
                                    Nhập mã lấy mật khẩu
                                </span>

                                <div className="wrap-input100 validate-input m-b-23" data-validate="code is reauired">
                                    <span className="label-input100">Nhập mã</span>
                                    <input className="input100" type="text" value={code} onChange={handleOnChangeCode} placeholder="Nhập code" />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                </div>
                                <div className="wrap-input100 validate-input m-b-23" data-validate="code is reauired">
                                    <span className="label-input100">Nhập mật khẩu mới</span>
                                    <input className="input100" type="text" value={password} onChange={changePassword} placeholder="Nhập mật khẩu mới" />
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

export default CodeForgot;