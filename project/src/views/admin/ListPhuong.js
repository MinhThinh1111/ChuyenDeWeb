import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { listPhuongCallAPI } from '../../services/admin/ThinhService';
import QuanLyKhuVuc from './QuanLyKhuVuc';
class ListPhuong extends React.Component {
    state = {
        listPhuong: [],
        idQuan: 0,
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        this.setState({
            idQuan: id
        })

        let res = await listPhuongCallAPI(id);
        if (res != null) {
            this.setState({
                listPhuong: res,
                id: id
            })
            console.log(this.state.listPhuong);
        }
    }



    render() {
        let { listPhuong, idQuan } = this.state;
        return (
            <>
                <div className="main">
                    <main className="content">
                        <div className="container-fluid p-0">


                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Quản lý khu vực</h5>
                                        </div>
                                        <div className="col-md-9">
                                            {/* <button className="btn btn-primary"
                                                onClick={() => this.handleAddNewKhuVuc(this)}><i className='fas fa-plus'></i> Thêm mới khu vực
                                            </button> */}
                                            <NavLink to={`/admin/themPhuong?id=${idQuan}`} ><span className="btn btn-primary">Thêm Phường</span></NavLink>
                                        </div>

                                    </div>
                                </div>
                                <table className="table table-hover my-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th className="d-none d-xl-table-cell">IDQuận</th>
                                            <th className="d-none d-md-table-cell">Phường</th>
                                            <th className="d-none d-md-table-cell">Chức năng</th>
                                            {/* <th className="d-none d-md-table-cell">Chức năng</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {listPhuong && listPhuong.length > 0 && listPhuong.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td className="d-none d-xl-table-cell">{item.idQuan}</td>
                                                    <td className="d-none d-xl-table-cell">{item.tenPhuong}</td>
                                                    <td className="d-none d-md-table-cell">
                                                        <NavLink to={`/admin/editphuong?id=${item.id}`} ><span className="btn btn-primary">Sửa</span></NavLink>
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
        )
    }
}
export default ListPhuong;