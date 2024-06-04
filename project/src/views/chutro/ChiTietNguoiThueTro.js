import React from 'react';
import axios from 'axios';
import { baseURL } from "../../services/my-axios";
import { NavLink, useParams } from "react-router-dom";
import { getChiTietnguoiThueCallAPI, getChiTietTaiKhoanTheoIdCallAPI } from '../../services/admin/KietService'

class ChiTietNguoiThueTro extends React.Component {
    state = {
        idTaiKhoan: "",
        hinh: "",
        ten: "",
        soDienThoai: "",
        gioiTinh: "",
        loaiTaiKhoan: "",
        email: "",
        idPhong: ""
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('id');
        console.log(kitu);

        let resNguoiThue = await getChiTietnguoiThueCallAPI(kitu);
        if (resNguoiThue != null) {
            this.setState({
                idTaiKhoan: resNguoiThue.idTaiKhoan,
                hinh: resNguoiThue.hinh,
                ten: resNguoiThue.ten,
                soDienThoai: resNguoiThue.soDienThoai,
                gioiTinh: resNguoiThue.gioiTinh,
                idPhong : sessionStorage.getItem("idPhong")

            })
        }
        let idTaiKhoan = this.state.idTaiKhoan;

        let resTaiKhoan = await getChiTietTaiKhoanTheoIdCallAPI(idTaiKhoan);
        if (resTaiKhoan != null) {
            this.setState({
                email: resTaiKhoan.email,
                loaiTaiKhoan: resTaiKhoan.loaiTaiKhoan
            })
        }


    }

    render() {
        let { idTaiKhoan, hinh, ten, soDienThoai, gioiTinh, email, loaiTaiKhoan, idPhong } = this.state
        return (
            <>
                <div class="page-heading header-text">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <h3>Thông Tin</h3>
                                <span class="breadcrumb"><a href="#">Chủ Trọ: </a>Nguyễn Gia Nghiêm </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-product section">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="left-image">
                                    <img src={baseURL + hinh} alt="" />
                                </div>
                            </div>
                            <div class="col-lg-6 align-self-center">
                                <div className='thongtinchutro'>
                                    <h2 className='ten_chu_tro'>Tên: {ten}</h2>
                                    <div className='chutro_info'>SĐT: {soDienThoai}</div>
                                    <div className='chutro_info'>Giới tính: {gioiTinh == 1 ? <>Nam</> : <>Nữ</>}</div>
                                    <div className='chutro_info'>Email: {email}</div>
                                    <div className='chutro_info'>Loại: {loaiTaiKhoan == 1 ? <>Chủ trọ</> : <>Người thuê</>}</div>
                                    <NavLink to={`/chutro/tinnhan?id=${idTaiKhoan}`} ><button className='btn btn-primary bbt'>Nhắn tin</button></NavLink>
                                    <NavLink to={`/chutro/danhsachnguoithue?idPhong=${idPhong}`} ><button className='btn btn-primary bbt'>Quay lại</button></NavLink>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="sep"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ChiTietNguoiThueTro;