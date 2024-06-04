import React from 'react';
import { addnewQuan } from '../../services/admin/ThinhService';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
class AddKhuVuc extends React.Component {
    state = {
        tenQuan: "",
        hinh: null,
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
            if (this.state.hinh !== "") {
                let res = await addnewQuan(this.state.tenQuan, this.state.hinh);
                if (res != null) {
                    toast.success("Thêm quận Thành Công!");
                    window.location.reload();
                }
                else {
                    toast.error("Thêm quận Thất Bại!");
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
                                                <h5 className="card-title mb-0">Thêm quận</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="hinh" className="form-label">Tên Quận</label>
                                        <input class="form-control form-control-lg" onChange={(event) => this.thayDoiTen(event)} type="text" id="tenQuan" name="tenQuan" placeholder="Nhập tên quận mới"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="hinh" className="form-label">Hình</label>
                                        <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control" />
                                    </div>
                                    <div className="col-md">
                                        <NavLink to={`/admin/quanlykhuvuc`}><button className="btn btn-primary" onClick={() => this.kiemTraRong()} type="button" >Thêm</button></NavLink>
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
export default AddKhuVuc;