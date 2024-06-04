import React from 'react';
import { baseURL } from "../../services/my-axios";
import {  Link} from "react-router-dom";
import { getAllMotelRoomOwnerAuthenticationCallAPI } from '../../services/admin/MinhService';
import Loading from "../loading/Loading.js";

class QuanLyYeuCauXacNhanChuTro extends React.Component {
    state = {
        listMotelRoomOwnerAuthentication: [],
        loading: false
    }
    async componentDidMount() {
        let res = await getAllMotelRoomOwnerAuthenticationCallAPI();
        if (res != null) {
            this.setState({
                listMotelRoomOwnerAuthentication: res,
                loading: true
            })
        }
    }
    render() {
        let { listMotelRoomOwnerAuthentication, loading } = this.state
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
                                            <h5 className="card-title mb-0">Quản lý yêu cầu xác nhận chủ trọ</h5>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listMotelRoomOwnerAuthentication.length == 0 ? <div className='null'>rỗng</div> :
                                        <table className="table table-hover my-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th className="d-none d-xl-table-cell">Hình</th>
                                                    <th className="d-none d-xl-table-cell">Tên</th>
                                                    <th className="d-none d-xl-table-cell">Số điện thoại</th>
                                                    <th className="d-none d-md-table-cell">Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    listMotelRoomOwnerAuthentication && listMotelRoomOwnerAuthentication.length > 0 && listMotelRoomOwnerAuthentication.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>#{item.chuTro.id}</td>
                                                                <td className="d-none d-xl-table-cell">
                                                                    <img className='img-main' src={baseURL + item.chuTro.hinh} alt={item.chuTro.hinh} />
                                                                </td>
                                                                <td className="d-none d-xl-table-cell">{item.chuTro.ten}</td>
                                                                <td className="d-none d-xl-table-cell">{item.chuTro.soDienThoai}</td>
                                                                <td className="d-none d-md-table-cell">
                                                                    <Link to={`/admin/chitietyeucauxacthucchutro?idChuTro=${item.chuTro.id}`} className="btn btn-primary">Xem thông tin</Link>
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
            :
            <Loading/>
        )
    }
}
export default QuanLyYeuCauXacNhanChuTro;