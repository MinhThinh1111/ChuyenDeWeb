import React from 'react';
import { addnewTienIch } from '../../services/admin/DungService.js';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
class ThemTienIch extends React.Component {
    state = {
        ten: "",
        hinh: null,
    }
    thayDoiTen(event) {
        this.setState({
            ten: event.target.value
        })
    }
    thayDoiHinh(event) {
        this.setState({
            hinh: event.target.files[0]
        })
    }
    async kiemTraRong() {
        if (window.confirm("Xác nhận thêm tiện " + this.state.ten)) {
            if (this.state.ten !== "") {
                if (this.state.hinh !== "") {
                    let res = await addnewTienIch(this.state.ten, this.state.hinh);
                    if (res != null) {
                        toast.success("Thêm Tiện Ích Thành Công!");
                    }
                    else {
                        toast.error("Thêm Tiện Ích Thất Bại!");
                    }
                }
                else {
                    toast.warning("Không Được Bỏ Trống Hình!");
                }
            }
            else {
                toast.warning("Không Được Bỏ Trống Tên!");
            }
        }
    }
    render() {
        return (
            <form className="form-control" action='#' encType="multipart/form-data" method="post">
                <>
                    <div className="main">
                        <main className="content">
                            <div className="container-fluid p-0">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h5 className="card-title mb-0">Thêm tiện ích</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <input class="form-control form-control-lg" onChange={(event) => this.thayDoiTen(event)} type="text" id="ten" name="ten" placeholder="Nhập tên tiện ích mới"></input>
                                    <div className="mb-3">
                                        <label htmlFor="hinh" className="form-label">Thêm Hình</label>
                                        <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control" />
                                    </div>
                                    <div className="col-md">
                                        <NavLink to="/admin/quanlytienich"><button className="btn btn-primary" onClick={() => this.kiemTraRong()} type="button" >Thêm</button></NavLink>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            </form>
        )
    }
}
export default ThemTienIch;