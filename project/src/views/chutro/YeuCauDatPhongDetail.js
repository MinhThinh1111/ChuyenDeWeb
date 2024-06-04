import React from 'react';
import axios from 'axios';
import { baseURL } from "../../services/my-axios";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getDetailYeuCauCallAPI, getNguoiThue, chapNhanYeuCauDatPhong, tuChoiYeuCauDatPhong } from '../../services/admin/KietService';
import { getProfileChuTro } from '../../services/admin/NghiemService';

class YeuCauDatPhongDetail extends React.Component {
    state = {
        id: "",
        nguoiThue: {},
        phong: {},
        trangThai: "",
        idNguoiThue: "",
        idPhong: "",
        myIdTaiKhoan: "",
        idTaiKhoanGui: ""
    }


    async componentDidMount() {
        let idTaiKhoan = sessionStorage.getItem("accountId");

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('id');
        console.log(kitu);

        let resDetailYeuCau = await getDetailYeuCauCallAPI(kitu);
        if (resDetailYeuCau != null) {
            this.setState({
                id: resDetailYeuCau.id,
                nguoiThue: await getNguoiThue(resDetailYeuCau.nguoiThue.id),
                phong: resDetailYeuCau.phong,
                idNguoiThue: resDetailYeuCau.nguoiThue.id,
                idPhong: resDetailYeuCau.phong.id,
                myIdTaiKhoan: resDetailYeuCau.idTaiKhoanNhan,
                idTaiKhoanGui: resDetailYeuCau.idTaiKhoanGui
            })
        }
        console.log(resDetailYeuCau);

        let resChuTro = await getProfileChuTro(idTaiKhoan);
        if (resChuTro != null) {
            this.setState({
                tenChuTro: resChuTro.ten
            })
        }
    }

    async tuChoiYeuCau() {
        if (window.confirm("Từ chối yêu cầu của " + (this.state.nguoiThue.ten) + " ?" + (this.state.nguoiThue.ten) + " ?" + (this.state.id))) {
            await tuChoiYeuCauDatPhong(this.state.id, this.state.myIdTaiKhoan, this.state.idTaiKhoanGui);
        }

    }

    async chapNhanYeuCau() {
        if (window.confirm("Chấp nhận cho " + (this.state.nguoiThue.ten) + " thuê phòng ?" + (this.state.id))) {
            await chapNhanYeuCauDatPhong(this.state.id, this.state.idNguoiThue, this.state.idPhong, this.state.myIdTaiKhoan, this.state.idTaiKhoanGui);
        }
    }


    render() {
        let { id, ten, phong, nguoiThue, tenChuTro } = this.state

        return (
            <>
                <div class="page-heading header-text">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <h3>Chi tiết yêu cầu</h3>
                                <span class="breadcrumb"><a href="#">Chủ Trọ: </a>{tenChuTro}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section trending">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="left-image">
                                    <img src={baseURL + nguoiThue.hinh} alt="" />
                                </div>
                            </div>
                            <div class="col-lg-6 align-self-center">
                                <div className='thongtinthongbao'>

                                    <h2 className='ten'>Tên: {nguoiThue.ten}</h2>
                                    <div className='chutro_info'><b>Nội dung: </b> người thuê <b>{nguoiThue.ten}</b> muốn đặt phòng số <b>{phong.soPhong}</b> </div>
                                    <div className='chutro_info'><b>Số điện thoại: </b> {nguoiThue.soDienThoai} </div>
                                    <div className='chutro_info'><b>Giới tính: </b> {nguoiThue.gioiTinh == 1 ? <>Nam</> : <>Nữ</>} </div>
                                    <div>
                                        <h5 className="card-title mb-0">
                                            <button className="btn btn-success btn_margin_left" onClick={() => this.chapNhanYeuCau()}>Chấp nhận</button>
                                            <button className="btn btn-danger btn_margin_left" onClick={() => this.tuChoiYeuCau()}>Từ chối</button>
                                            {/* <NavLink to={`/nguoithue/chitietphongtro?idPhong=${phong.id}`} ><button className="btn btn-warning btn_margin_left">Chi tiết phòng</button></NavLink> */}
                                            <NavLink to={`/chutro/yeucaudatphong`} ><button className="btn btn-info btn_margin_left">Quay lại</button></NavLink>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default YeuCauDatPhongDetail;