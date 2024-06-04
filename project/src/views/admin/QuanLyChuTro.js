import React from 'react';
import axios from 'axios';
import { baseURL } from "../../services/my-axios";
import { NavLink, useParams } from "react-router-dom";
import { getAllMotelRoomOwnerCallAPI } from '../../services/admin/KietService'

class QuanLyChuTro extends React.Component {

    state = {
        listMotelRoom: []
    }
    hideLoader = () => console.log(1);;
    async componentDidMount() {

        let res = await getAllMotelRoomOwnerCallAPI();
        //adsdw
        if (res != null) {
            this.setState({
                listMotelRoom: res
            })
        }
    }

    render() {
        let { listMotelRoom } = this.state;
        return (
            <>
                <div className="main">
                    <main className="content">
                        <div className="container-fluid p-0">


                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5 className="card-title mb-0">Quản lý chủ trọ</h5>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listMotelRoom.length == 0 ? <div className='null'>rỗng</div> :
                                        <table className="table table-hover my-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th className="d-none d-xl-table-cell">Hình</th>
                                                    <th className="d-none d-xl-table-cell">Tên</th>
                                                    <th className="d-none d-xl-table-cell">Số điện thoại</th>
                                                    <th className="d-none d-xl-table-cell">Xác thực</th>
                                                    <th className="d-none d-xl-table-cell">Gói đang dùng</th>
                                                    <th className="d-none d-md-table-cell">Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    listMotelRoom && listMotelRoom.length > 0 && listMotelRoom.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.id}</td>
                                                                <td className="d-none d-xl-table-cell">
                                                                    <img className='img-main' src={baseURL + item.hinh} alt={item.hinh} />
                                                                </td>
                                                                <td className="d-none d-xl-table-cell">{item.ten}</td>
                                                                <td className="d-none d-xl-table-cell">{item.soDienThoai}</td>
                                                                <td>
                                                                    {item.xacThuc == 1 ? <div className='txt_green'>Đã xác thực</div> : <div className='txt_red'>Chưa xác thực</div>}
                                                                </td>
                                                                <td className="d-none d-xl-table-cell">{item.idGoi}</td>
                                                                <td className="d-none d-md-table-cell">
                                                                    <NavLink to={`/admin/chiTietChuTro?idTaiKhoan=${item.idTaiKhoan}`} className="btn btn-info">Xem thông tin</NavLink>
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
export default QuanLyChuTro;