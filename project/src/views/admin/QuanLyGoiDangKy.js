import React from 'react';
import './styleKiet.css';
import { NavLink, useParams } from "react-router-dom";
import { baseURL } from "../../services/my-axios";
import { getAllServiceCallAPI } from '../../services/admin/KietService';

class QuanLyGoiDangKy extends React.Component {
    state = {
        listService: []
    }
    hideLoader = () => console.log(1);;
    async componentDidMount() {
        let res = await getAllServiceCallAPI();
        if (res != null) {
            this.setState({
                listService: res
            })
        }
    }

    render() {
        let { listService } = this.state
        return (
            <>
                <div className="main">

                    <main className="content">
                        <div className="container-fluid p-0">


                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Quản lý gói dịch vụ</h5>
                                        </div>
                                        <div className="col-md-9">
                                            <NavLink to={`/admin/themDichVu`} className="btn btn-info">Thêm</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listService.length == 0 ? <div className='null'>rỗng</div> :
                                        <table className="table table-hover my-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th className="d-none d-xl-table-cell">Số phòng</th>
                                                    <th className="d-none d-xl-table-cell">Thời gian(ngày)</th>
                                                    <th className="d-none d-xl-table-cell">Giá</th>
                                                    <th>Trang thái</th>
                                                    <th className="d-none d-md-table-cell">Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    listService && listService.length > 0 && listService.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.id}</td>
                                                                <td className="d-none d-xl-table-cell">{item.soLuongPhongToiDa}</td>
                                                                <td className="d-none d-xl-table-cell">{item.thoiHan}</td>
                                                                <td className="d-none d-xl-table-cell">{item.gia}</td>
                                                                <td>
                                                                    {item.trangThai == 1 ? <div className='txt_red'>Đã khóa</div> : <div className='txt_green'>Đang hoạt động</div>}
                                                                </td>
                                                                <td className="d-none d-md-table-cell">
                                                                    <NavLink to={`/admin/chiTietDichVu?id=${item.id}`} className="btn btn-info">Xem thông tin</NavLink>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}
export default QuanLyGoiDangKy;