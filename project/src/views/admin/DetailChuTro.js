import React from 'react';
import './styleKiet.css';
import { NavLink, useParams } from "react-router-dom";
import { baseURL } from "../../services/my-axios";
import { getDetailMotelRoomOwnerCallAPI, capNhatTrangThaiMotelRoomOwnerCallAPI } from '../../services/admin/KietService';

// function LayId() {
//     let { id } = useParams("id");
//     return id;
// }

class DetailChuTro extends React.Component {
    state = {
        result: {},
        loading: false
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('idTaiKhoan');

        let resDetailMotelRoomOwner = await getDetailMotelRoomOwnerCallAPI(kitu);
        if (resDetailMotelRoomOwner != null) {
            this.setState({
                result: resDetailMotelRoomOwner,
                loading: true

                // cccdMatSau: resDetailMotelRoomOwner.cccdMatSau,
                // trangThaiXacThuc: resDetailMotelRoomOwner.trangThaiXacThuc,
                // tenTaiKhoan: resDetailMotelRoomOwner.tenTaiKhoan,
                // trangThai: resDetailMotelRoomOwner.trangThai,
                // loaiTaiKhoan: resDetailMotelRoomOwner.loaiTaiKhoan
            })
        }
        //console.log(result.yeuCauXacThuc.cccdMatSau);
    }

    async thayDoiTrangThaiTaiKhoan() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('idTaiKhoan');
        let resDetailMotelRoomOwner = await getDetailMotelRoomOwnerCallAPI(kitu);

        if (window.confirm("Xác nhận thay đổi trạng thái tài khoản")) {
            await capNhatTrangThaiMotelRoomOwnerCallAPI(resDetailMotelRoomOwner.taiKhoan.id);
            this.componentDidMount();
        }
    }

    render() {
        let { result, loading } = this.state
        return (
            loading == true ?
                <>
                    <div className="main">
                        <main className="content">
                            <div className="container-fluid p-0">


                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h5 className="card-title mb-0">Chi Tiết chủ trọ</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5 className="card-title mb-0">Tên: <span class="fw-normal text-dark">{result.ten}</span></h5>
                                                <h5 className="card-title mb-0">Số điện thoại: <span class="fw-normal text-dark">{result.soDienThoai}</span></h5>
                                                <h5 className="card-title mb-0">ID gói đang dùng: {result.idGoi == 0 ? <span class="fw-normal text-dark">Chưa đăng ký gói</span> : <span class="fw-normal text-dark">{result.idGoi}</span>}</h5>
                                                <h5 className="card-title mb-0">Số TK ngân hàng: <span class="fw-normal text-dark">{result.soTaiKhoanNganHang}</span></h5>
                                                <h5 className="card-title mb-0">Tên người thụ hưởng: <span class="fw-normal text-dark">{result.tenChuTaiKhoanNganHang}</span></h5>
                                                <h5 className="card-title mb-0">Xác thực: {result.xacThuc == 1 ? <span class="fw-normal txt_green">Đã xác thực</span> : <span class="fw-normal txt_red">Chưa xác thực</span>}</h5>
                                                <h5 className="card-title mb-0">Trạng thái: {result.taiKhoan.trangThai == 1 ? <span class="fw-normal txt_red">Đã khóa</span> : <span class="fw-normal txt_green">Đang hoạt động</span>}</h5>
                                                <h5 className="card-title mb-0">Tên tài khoản: <span class="fw-normal text-dark">{result.taiKhoan.tenTaiKhoan}</span></h5>
                                                <h5 className="card-title mb-0">Loại tài khoản: {result.taiKhoan.loaiTaiKhoan == 1 ? <span class="fw-normal text-dark">Chủ trọ</span> : <span class="fw-normal text-dark    ">Người thuê</span>}</h5>
                                            </div>
                                            <div className="col-md-3">
                                                <img className='img-fluid avt' class="img-fluid" src={baseURL + result.hinh} alt='anh' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div className="row">
                                            {result.yeuCauXacThuc != null ? <><div className="col-md-6">
                                                {result.yeuCauXacThuc.cccdMatTruoc != null ? <img className='img-fluid avt' class="img-fluid" src={baseURL + result.yeuCauXacThuc.cccdMatTruoc} alt='cccdmattruoc' /> : <div>Không có ảnh căn cước công dân mặt trước</div>}

                                            </div>
                                                <div className="col-md-6">
                                                    {result.yeuCauXacThuc.cccdMatSau != null ? <img className='img-fluid avt' class="img-fluid" src={baseURL + result.yeuCauXacThuc.cccdMatSau} alt='cccdmatsau' /> : <div>Không có ảnh căn cước công dân mặt sau</div>}

                                                </div></>
                                                :
                                                <><div className="col-md-6">
                                                    Không có ảnh căn cước công dân mặt trước

                                                </div>
                                                    <div className="col-md-6">
                                                        Không có ảnh căn cước công dân mặt sau

                                                    </div></>
                                            }

                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div>
                                            <div>
                                                <h5 className="card-title mb-0">
                                                    {result.taiKhoan.trangThai == 1 ? <button className="btn btn-success" onClick={() => this.thayDoiTrangThaiTaiKhoan()}>Mở khóa tài khoản</button> : <button className="btn btn-danger" onClick={() => this.thayDoiTrangThaiTaiKhoan()}>Khóa tài khoản</button>}
                                                    <NavLink to={`/admin/quanlychutro`} ><button className="btn btn-info btn_margin_left">Quay lại</button></NavLink>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
                : <>loading</>
        )
    }
}

export default DetailChuTro