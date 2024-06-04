import React from 'react';
import axios from 'axios';
import { baseURL } from '../../services/my-axios';
import { NavLink, useParams } from "react-router-dom";
import { getAllKhuVucApi } from '../../services/admin/ThinhService';
import './styleThinh.css';


class QuanLyKhuVuc extends React.Component {
    state = {
        listQuan: []
    }
    hideLoader = () => console.log(1);;
    async componentDidMount() {
        let res = await getAllKhuVucApi();
        if (res != null) {
            this.setState({
                listQuan: res
            })
        }
    }


    render() {
        let { listQuan } = this.state;
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
                                            <a href="addKhuVuc" className="btn btn-primary">Thêm quận</a>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listQuan.length == 0 ? <div className='null'>rỗng</div> :
                                        <table className="table table-hover my-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th className="d-none d-xl-table-cell">Quận</th>
                                                    <th className="d-none d-xl-table-cell">Hình</th>
                                                    <th className="d-none d-md-table-cell">Xem phường</th>
                                                    <th className="d-none d-md-table-cell">Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listQuan && listQuan.length > 0 && listQuan.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td className="d-none d-xl-table-cell">{item.tenQuan}</td>
                                                            <td className="hinhanh">
                                                                <img src={baseURL + item.hinh} width="110px" height="250px"/>
                                                            </td>
                                                            <td className="d-none d-md-table-cell">
                                                                <NavLink to={`/admin/listPhuong?id=${item.id}`} ><span className="btn btn-primary">Xem phường</span></NavLink>
                                                            </td>
                                                            <td className="d-none d-md-table-cell">
                                                                <NavLink to={`/admin/editquan?id=${item.id}`} ><span className="btn btn-primary">Sửa</span></NavLink>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                })}
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
export default QuanLyKhuVuc;