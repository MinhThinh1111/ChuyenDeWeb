import React from 'react';
import axios from 'axios';
import './styleKiet.css';
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getDetailServiceCallAPI, editServiceCallAPI } from '../../services/admin/KietService';

class EditDichVu extends React.Component {
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
    }
    thayDoiThoiHan(e) {
        this.setState({
            thoiHan: e.target.value
        })
    }
    thayDoiSLPhong(e) {
        this.setState({
            soLuongPhongToiDa: e.target.value
        })
    }
    thayDoiGia(e) {
        this.setState({
            gia: e.target.value
        })
    }
    kiemTraRong() {
        if (this.state.thoiHan === "" || this.state.soLuongPhongToiDa === "" || this.state.gia === "") {
            return false;
        }
        return true;
    }
    async capNhatDichVu() {
        if (window.confirm("Xác nhận sửa dịch vụ số " + (this.state.id))) {
            if (this.kiemTraRong()) {
                const search = window.location.search;
                const params = new URLSearchParams(search);
                const kitu = params.get('id');
                let res = await editServiceCallAPI(kitu, this.state.thoiHan, this.state.soLuongPhongToiDa, this.state.gia);
                if (res != null) {
                    toast.success("Đổi Thành Công!");
                    this.componentDidMount();
                }
            }
            else {
                toast.warning("Không Được Để Rỗng!");
            }
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
                                            <h5 className="card-title mb-0">Sửa dịch vụ số {id}</h5>
                                        </div>

                                    </div>
                                </div>
                                <table className="table table-hover my-0">
                                    <tbody>

                                        <div>
                                            <label class="form-label">Thời hạn (ngày)</label>
                                            <input type="number" class="form-control" Value={thoiHan} onChange={(e) => this.thayDoiThoiHan(e)}></input>
                                        </div>
                                        <div>
                                            <label class="form-label">Số lượng phòng tối đa</label>
                                            <input type="number" class="form-control" Value={soLuongPhongToiDa} onChange={(e) => this.thayDoiSLPhong(e)}></input>
                                        </div>
                                        <div>
                                            <label class="form-label">Giá</label>
                                            <input type="number" class="form-control" Value={gia} onChange={(e) => this.thayDoiGia(e)}></input>
                                        </div>


                                        <div className="card-header">
                                            <div>
                                                <div>
                                                    <h5 className="card-title mb-0">
                                                        <button className="btn btn-warning" onClick={() => this.capNhatDichVu()}>Sửa</button>
                                                        <NavLink to={`/admin/quanlygoidangky`} ><button className="btn btn-info btn_margin_left">Trở lại dach sách</button></NavLink>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </tbody>




                                </table>
                            </div>


                        </div>
                    </main>
                </div>
            </>
        )
    }
}
export default EditDichVu;