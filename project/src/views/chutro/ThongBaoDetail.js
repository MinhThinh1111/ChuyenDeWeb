import React from 'react';
import axios from 'axios';
import { baseURL } from "../../services/my-axios";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getDetailThongBaoCallAPI, getNguoiGuiChuTro, xoaThongBao } from '../../services/admin/ThinhService';


class ThongBaoDetail extends React.Component {
    state = {
        id: "",
        nguoiGui: "",
        tieuDe: "",
        noiDung: "",
        trangThai: "",
    }


    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('id');
        console.log(kitu);

        let resDetailThongBao = await getDetailThongBaoCallAPI(kitu);
        if (resDetailThongBao != null) {
            this.setState({
                id: resDetailThongBao.id,
                nguoiGui: await getNguoiGuiChuTro(1),
                tieuDe: resDetailThongBao.tieuDe,
                noiDung: resDetailThongBao.noiDung,
                trangThai: resDetailThongBao.trangThai
            })
        }
        console.log(resDetailThongBao);
    }

    async xoaThongBao() {
        if (window.confirm("Xóa thông báo này ?")) {
            await xoaThongBao(this.state.id);
        }

    }

    render() {
        let { id, ten, tieuDe, noiDung, trangThai, nguoiGui } = this.state

        return (
            <>
                <div class="page-heading header-text">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <h3>Chi Tiết Thông Báo</h3>
                                {/* <span class="breadcrumb"><a href="#">Người thuê: </a>Nguyễn Gia Nghiêm </span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section trending">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="left-image">
                                    {
                                        nguoiGui && nguoiGui.hinh ?
                                            <img src={baseURL + nguoiGui.hinh} alt="" />
                                            :
                                            <></>
                                    }

                                </div>
                            </div>
                            <div class="col-lg-6 align-self-center">
                                <div className='thongtinthongbao'>
                                    {
                                        nguoiGui && nguoiGui.ten ?
                                        <h2 className='ten'>Tên:{nguoiGui.ten}</h2>
                                            :
                                            <></>
                                    }

                                    
                                    <div className='chutro_info'><b>Tiêu đề: </b> {tieuDe}</div>
                                    <div className='chutro_info'><b>Nội dung: </b> {noiDung}</div>
                                    <div>
                                        <h5 className="card-title mb-0">
                                            <button className="btn btn-danger btn_margin_left" onClick={() => this.xoaThongBao()}>Xóa thông báo</button>
                                            <NavLink to={`/chutro/thongbao`} ><button className="btn btn-info btn_margin_left">Quay lại</button></NavLink>
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
export default ThongBaoDetail;