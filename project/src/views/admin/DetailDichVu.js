import React from 'react';
import './styleKiet.css';
import { NavLink, useParams } from "react-router-dom";
import { baseURL } from "../../services/my-axios";
import { getDetailServiceCallAPI, lockServiceCallAPI, unLockServiceCallAPI } from '../../services/admin/KietService';

// function LayId() {
//     let { id } = useParams("id");
//     return id;
// }

class DetailDichVu extends React.Component {
    state = {
        id: "",
        thoiHan: "",
        soLuongPhongToiDa: "",
        gia: "",
        trangThai: ""
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('id');
        console.log(kitu);

        let resDetailService = await getDetailServiceCallAPI(kitu);
        if (resDetailService != null) {
            this.setState({
                id: resDetailService.id,
                thoiHan: resDetailService.thoiHan,
                soLuongPhongToiDa: resDetailService.soLuongPhongToiDa,
                gia: resDetailService.gia,
                trangThai: resDetailService.trangThai
            })
        }
        console.log(resDetailService);
    }

    async khoaDichVu() {
        if (window.confirm("Xác nhận khóa dịch vụ số " + (this.state.id))) {
            await lockServiceCallAPI(this.state.id);
            this.componentDidMount();
        }
    }

    async moKhoaDichVu() {
        if (window.confirm("Xác nhận mở khóa dịch vụ số " + (this.state.id))) {
            await unLockServiceCallAPI(this.state.id);
            this.componentDidMount();
        }

    }

    render() {
        let { id, thoiHan, soLuongPhongToiDa, gia, trangThai } = this.state

        return (
            <>
                <div className="main">
                    <main className="content">
                        <div className="container-fluid p-0">


                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Chi Tiết dịch vụ số {id}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Thời hạn: {thoiHan} ngày</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Số phòng tối đa: {soLuongPhongToiDa} phòng</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Giá gói: {gia} đồng</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Trạng thái: {trangThai == 1 ? <span className='txt_red'>Đã khóa</span> : <span className='txt_green'>Đang hoạt động</span>}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div>
                                        <div>
                                            <h5 className="card-title mb-0">
                                                {trangThai == 1 ? <button className="btn btn-success" onClick={() => this.moKhoaDichVu()}>Mở khóa dịch vụ</button> : <button className="btn btn-danger" onClick={() => this.khoaDichVu()}>Khóa dịch vụ</button>}
                                                <NavLink to={`/admin/suaDichVu?id=${id}`} className="btn btn-warning btn_margin_left">Sửa dịch vụ</NavLink>
                                                <NavLink to={`/admin/quanlygoidangky`} ><button className="btn btn-info btn_margin_left">Quay lại</button></NavLink>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </main>
                </div>
            </>
        )
    }
}

export default DetailDichVu