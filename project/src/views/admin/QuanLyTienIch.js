import React from 'react';
import { baseURL } from "../../services/my-axios";
import { getAllTienIchCallAPI, capNhatTrangThaiTienIch } from '../../services/admin/DungService';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';

class QuanLyTienIch extends React.Component {
    state = {
        listTienIch: [],
        Loading: false
    }
    async loadData() {
        let res = await getAllTienIchCallAPI();
        if (res != null) {
            this.setState({
                listTienIch: res,
                loading: true

            })
        }
    }

    async componentDidMount() {
        await this.loadData();
    }
    async update(name, id, trangThai) {
        if (trangThai === 0) {
            if (window.confirm("Xác nhận Khoá tiện ích " + name)) {
                let res = await capNhatTrangThaiTienIch(id);
                if (res != null) {
                    toast.success("Khoá Tiện Ích Thành Công!");
                    await this.loadData();
                } else {
                    toast.error("Khoá Tiện Ích Thất Bại!");
                }
            }
        } else {
            if (window.confirm("Xác nhận Mở tiện ích " + name)) {
                let res = await capNhatTrangThaiTienIch(id);
                if (res != null) {
                    toast.success("Mở Tiện Ích Thành Công!");
                    await this.loadData();
                } else {
                    toast.error("Mở Tiện Ích Thất Bại!");
                }
            }
        }
    }


    render() {
        let { listTienIch, loading } = this.state;
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
                                                <h5 className="card-title mb-0">Quản lý tiện ích</h5>
                                            </div>
                                            <div className="col-md-9">
                                                <a href="/admin/ThemTienIch" className="btn btn-primary">Thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-hover my-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th className="d-none d-xl-table-cell">Tên tiện ích</th>
                                                <th className="d-none d-xl-table-cell">Hình</th>
                                                <th className="d-none d-md-table-cell">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listTienIch && listTienIch.length > 0 && listTienIch.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td className="d-none d-xl-table-cell">{item.ten}</td>
                                                        <td className="d-none d-xl-table-cell"
                                                            width="200px"
                                                            height="100px"><img
                                                                className="hinh-banner"
                                                                src={baseURL + item.hinh}
                                                                alt={baseURL + item.hinh}

                                                            /></td>
                                                        <td className="d-none d-md-table-cell">
                                                            <NavLink className="btn btn-primary" style={{ marginTop: 0 , marginRight: 20, marginLeft:30}} to={`/admin/SuaTienIch?id=${item.id}`}>EDIT</NavLink>
                                                            {(item.trangThai === 0) ? <a onClick={() => this.update(item.ten, item.id, item.trangThai)} className="btn btn-danger">Khoá</a> : <a onClick={() => this.update(item.ten, item.id, item.trangThai)} className="btn btn-success">Mở</a>}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
                : <Loading />
        )
    }
}
export default QuanLyTienIch;