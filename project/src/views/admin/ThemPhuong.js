import React from 'react';
import { addPhuong } from '../../services/admin/DungService.js';
import { layQuanTheoId } from '../../services/admin/ThinhService.js';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
class ThemPhuong extends React.Component {
    state = {
        ten: "",
        idQuan: 0,
        tenQuan: "",
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('id');

        let res = await layQuanTheoId(kitu);
        if (res != null) {
            this.setState({
                tenQuan: res.tenQuan,
                idQuan: kitu
            })
        }
    }
    thayDoiTen(event) {
        this.setState({
            ten: event.target.value
        })
    }
    async kiemTraRong() {
        if (window.confirm("Xác nhận thêm " + this.state.ten)) {
        if (this.state.ten !== "") {
            if (this.state.idQuan !== 0) {
                let res = await addPhuong(this.state.ten, this.state.idQuan);
                if (res != null) {
                    toast.success("Thêm Phường Thành Công!");
                }
                else {
                    toast.error("Thêm Phường Thất Bại!");
                }
            }
            else {
                toast.warning("Vui Lòng Chọn Bỏ Trống Quận!");
            }
        }
        else {
            toast.warning("Không Được Bỏ Trống Tên!");
        }
    }
    }
    render() {
        let { tenQuan, idQuan } = this.state;
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
                                                <h5 className="card-title mb-0">Thêm Phường</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <input class="form-control form-control-lg" onChange={(event) => this.thayDoiTen(event)} type="text" id="ten" name="ten" placeholder="Nhập tên Phường mới"></input>
                                        <label htmlFor="hinh" className="form-label">Quận</label>
                                    <input class="form-control form-control-lg" type="text" id="quan" name="quan" value={tenQuan} readOnly></input>
                                    <div className="col-md">
                                        <NavLink to={`/admin/listPhuong?id=${idQuan}`} ><button className="btn btn-primary" onClick={() => this.kiemTraRong()} type="button" >Thêm</button></NavLink>
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
export default ThemPhuong;