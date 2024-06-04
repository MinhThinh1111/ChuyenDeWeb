import React from 'react';
import { baseURL } from "../../services/my-axios";
import { getAllYeuCauDangKyDichVuAPI } from '../../services/admin/MinhService';
import Loading from "../loading/Loading.js";
import { Link } from 'react-router-dom';
class QuanLyYeuCauXacNhanGoi extends React.Component {
    state = {
        listYeuCauXacThuc: [],
        loading: false
    }
    hideLoader = () => console.log(1);;
    async componentDidMount() {
        let res = await getAllYeuCauDangKyDichVuAPI();
        if (res != null) {
            this.setState({
                listYeuCauXacThuc: res,
                loading: true
            })
        }
    }
    render() {
        let { listYeuCauXacThuc, loading } = this.state
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
                                                <h5 className="card-title mb-0">Quản lý yêu cầu</h5>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        listYeuCauXacThuc.length == 0 ? <div className='null'>rỗng</div> :
                                            <table className="table table-hover my-0">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th className="d-none d-xl-table-cell">Tên chủ trọ</th>
                                                        <th className="d-none d-xl-table-cell">Số phòng</th>
                                                        <th className="d-none d-xl-table-cell">Thời gian</th>
                                                        <th className="d-none d-xl-table-cell">Giá</th>
                                                        <th className="d-none d-md-table-cell">Chức năng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        listYeuCauXacThuc && listYeuCauXacThuc.length > 0 && listYeuCauXacThuc.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>#{item.id}</td>
                                                                    <td className="d-none d-xl-table-cell">{item.chuTro.ten}</td>
                                                                    <td className="d-none d-xl-table-cell">{item.goi.soLuongPhongToiDa}</td>
                                                                    <td className="d-none d-xl-table-cell">{item.goi.thoiHan}</td>
                                                                    <td className="d-none d-xl-table-cell">{item.goi.gia}</td>
                                                                    <td className="d-none d-md-table-cell">
                                                                        <Link to={`/admin/chitietyeucaudangkygoi?id=${item.id}`} className="btn btn-primary">Xem thông tin</Link>
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
                <Loading />
        )
    }
}
export default QuanLyYeuCauXacNhanGoi;