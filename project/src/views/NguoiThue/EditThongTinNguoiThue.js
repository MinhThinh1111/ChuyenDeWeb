import React, { version } from 'react';
import './styleThinh.css';
import { baseURL } from '../../services/my-axios.js';
import "./editthongtinnguoithue.css";
import { getProfileNguoiThue, updateProfileNguoiThue1, updateProfileNguoiThue2 } from '../../services/nguoithue/ThinhService.js';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class EditThongTinNguoiThue extends React.Component {

    state = {
        nguoithue: {},
        idTaiKhoan: "",
        ten: "",
        hinh: null,
        soDienThoai: "",

    }
    async componentDidMount() {

        let idTaiKhoanSession = sessionStorage.getItem("accountId");
        let res = await getProfileNguoiThue(idTaiKhoanSession);
        if (res != null) {
            this.setState({
                nguoithue: res,
                idTaiKhoan: idTaiKhoanSession,
                ten: res.ten,
                soDienThoai: res.soDienThoai,

            })
        }
    }

    thayDoiTen(event) {
        this.setState({
            ten: event.target.value
        })

    }
    thayDoiSoDienThoai(event) {
        this.setState({
            soDienThoai: event.target.value
        })
    }

    thayDoiHinh(event) {
        this.setState({
            hinh: event.target.files[0]
        })

    }

    kiemTraRong() {
        if (this.state.ten !== "") {
            if (this.state.soDienThoai !== "") {

                this.capNhat()

            } else {
                toast.warning("Không Được Bỏ Trống Số Điện Thoại!");
            }
        }
        else {
            toast.warning("Không Được Bỏ Trống Tên!");
        }

    }




    async capNhat() {
        if (this.state.hinh != null) {
            let res = await updateProfileNguoiThue1(this.state.idTaiKhoan, this.state.hinh, this.state.ten, this.state.soDienThoai);
            if (res != null) {
                toast.success("Cập Nhật Thông Tin Thành Công!");
            } else {
                toast.error("Cập Nhật Thất Bại!");
            }
        } else {
            let res = await updateProfileNguoiThue2(this.state.idTaiKhoan, this.state.ten, this.state.soDienThoai);
            if (res != null) {
                toast.success("Cập Nhật Thông Tin Thành Công!");

            } else {
                toast.error("Cập Nhật Thất Bại!");
            }
        }

    }

    render() {
        let { idTaiKhoan, ten, hinh, soDienThoai } = this.state;
        return (
            <>
                <div class="page-heading header-text">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <h3>Chỉnh Sửa Thông Tin Người Thuê</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-product section">
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
                    <div class="container">
                      
                        <div className="form-edit">
                                <div className="thongtinchutro">
                                    <div className="mb-3">
                                        <label htmlFor="ten" className="form-label">Tên Mới Của Người Thuê</label>
                                        <input value={ten} onChange={(event) => this.thayDoiTen(event)} type="text" id="ten" name="ten" placeholder="Nhập Tên Của nguoithue Vào Đây..." className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="soDienThoai" className="form-label">Số Điện Thoại Mới</label>
                                        <input value={soDienThoai} onChange={(event) => this.thayDoiSoDienThoai(event)} type="text" id="soDienThoai" name="soDienThoai" placeholder="Nhập Số Điện Thoại Của nguoithue Vào Đây..." className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="hinh" className="form-label">Ảnh mới</label>
                                        <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" placeholder="Chọn Hình Đại Diện" className="form-control" />
                                    </div>
                                    <button type="button" className="btn btn-primary bbt" onClick={() => this.kiemTraRong()}>Cập Nhật</button>
                                    <NavLink to="/nguoithue/thongtin">
                                        <button type="button" className="btn btn-warning bbt" >Quay Lại</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                </div>
               
            </>
        )
    }
}
export default EditThongTinNguoiThue;