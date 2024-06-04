import React, { useState } from 'react';
import { layQuanTheoId, editQuan, editQuankhonghinh } from '../../services/admin/ThinhService';
import { baseURL } from "../../services/my-axios";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styleThinh.css';

class EditQuan extends React.Component {

    state = {
        list: [],
        id: "",
        tenQuan: "",
        hinh: null,
        trangThai: 0,
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await layQuanTheoId(id);
        if (res != null) {
            this.setState({
                list: res,
                id: res.id,
                tenQuan: res.tenQuan,
                trangthai: res.trangThai
            })
        }
    }

    thayDoiTen(event) {
        this.setState({
            tenQuan: event.target.value
        })
    }
    thayDoiHinh(event) {
        this.setState({
            hinh: event.target.files[0]
        })
    }
    async kiemTraRong() {
        if (this.state.tenQuan !== "") {
            //let res = await editQuankhonghinh(this.state.id, this.state.tenQuan, this.state.trangThai);
            if (this.state.hinh !== "") {
                let res = await editQuan(this.state.id, this.state.tenQuan, this.state.hinh, this.state.trangThai);
                if (res != null) {
                    toast.success("Sua quận Thành Công!");
                    
                }
                else {
                    toast.error("Sua quận Thất Bại!");
                }
            }
        }
        else {
            toast.warning("Không Được Bỏ Trống Tên!");
        }
    }

    render() {
        let { id, tenQuan, hinh } = this.state;
        let { list } = this.state;
        return (
            <form className="form-control" action='#' encType="multipart/form-data" method="post">
                <div className="main">
                    <main className="content">
                        <div className="container-fluid p-0">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="edit">
                                            <h5 className='text_edit'>Edit quận</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='form1'>
                                <div class="row g-2 align-items-center">
                                    <label class="form-label">ID quận: {id}</label>
                                    <div class="col-auto">
                                        <label class="col-form-label">Tên quận Mới:</label>
                                    </div>
                                    <div class="col-auto">
                                        <input class="form-control form-control-lg" Value={tenQuan} onChange={(event) => this.thayDoiTen(event)} type="text" id="tenQuan" name="tenQuan" placeholder="Nhập tên quận"></input>
                                    </div>
                                </div>
                                <label class="form-label">Hình Cũ</label>
                                <td className="hinhanh">
                                    <img
                                        src={baseURL + list.hinh}
                                        alt={baseURL + hinh}
                                        width="100%"
                                        height="100%"
                                    />
                                </td>
                                <div class="col-auto">
                                    <label class="form-label">UpLoad Hình Mới</label>
                                    <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control form-control-lg" />
                                </div>
                                <div className="col-md">
                                    <NavLink to={`/admin/quanlykhuvuc`}><button className="btn btn-primary" onClick={() => this.kiemTraRong()} type="button" >Cập nhật</button></NavLink>
                                </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </form>
        )
    }
}
export default EditQuan;