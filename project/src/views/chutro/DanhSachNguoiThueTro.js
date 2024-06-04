import React from 'react';
import axios from 'axios';
import { baseURL } from "../../services/my-axios";
import { NavLink, useParams } from "react-router-dom";
import { getListNguoiThueTheoIdPhongCallAPI } from '../../services/admin/KietService';
import { getProfileChuTro } from '../../services/admin/NghiemService';

class DanhSachNguoiThueTro extends React.Component {
    state = {
        listNguoiThue: [],
        tenChuTro: "",
        loading: false

    }
    hideLoader = () => console.log(1);;
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const kitu = params.get('idPhong');
        console.log(kitu);
        sessionStorage.setItem("idPhong", kitu);

        let idTaiKhoan = sessionStorage.getItem("accountId");

        let res = await getListNguoiThueTheoIdPhongCallAPI(kitu);
        if (res != null) {
            this.setState({
                listNguoiThue: res,
                loading: true

            })
        }

        let resChuTro = await getProfileChuTro(idTaiKhoan);
        if (resChuTro != null) {
            this.setState({
                tenChuTro: resChuTro.ten
            })
        }
    }

    render() {
        let { listNguoiThue, tenChuTro, loading } = this.state
        return (
            loading == true ?
                <>
                    <div class="page-heading header-text">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h3>DANH SÁCH NGƯỜI THUÊ</h3>
                                    <span class="breadcrumb"><a href="#">Chủ Trọ: </a>{tenChuTro}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section trending">
                        <div class="container">
                            <div class="row trending-box">
                                {
                                    listNguoiThue.length == 0 ? <div className='null'>Chưa có người thuê</div> :
                                        <>
                                            <table className="table table-hover my-0">
                                                <thead>
                                                    <tr>
                                                        <th className="d-none d-xl-table-cell">Hình</th>
                                                        <th className="d-none d-xl-table-cell">Tên</th>
                                                        <th className="d-none d-xl-table-cell">Số điện thoại</th>
                                                        <th className="d-none d-xl-table-cell">Giới tính</th>
                                                        <th className="d-none d-md-table-cell">Chức năng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        listNguoiThue && listNguoiThue.length > 0 && listNguoiThue.map((item, index) => {
                                                            return (

                                                                item.nguoiThue !== null ?

                                                                    <tr>
                                                                        <td className="d-none d-xl-table-cell">
                                                                            <img className='img-main' src={baseURL + item.nguoiThue.hinh} alt={""} />
                                                                        </td>
                                                                        <td className="d-none d-xl-table-cell">{item.nguoiThue.ten}</td>
                                                                        <td className="d-none d-xl-table-cell">{item.nguoiThue.soDienThoai}</td>
                                                                        <td>
                                                                            {item.nguoiThue.gioiTinh == 1 ? <div>Nam</div> : <div>Nữ</div>}
                                                                        </td>
                                                                        <td className="d-none d-md-table-cell">
                                                                            <NavLink to={`/chutro/chitietnguoithue?id=${item.nguoiThue.id}`} className="btn btn-primary">Xem thông tin</NavLink>
                                                                        </td>
                                                                    </tr>
                                                                    : <>
                                                                        Rong
                                                                    </>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </>
                                }
                                {/* <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str">
                                <div class="item">

                                    <div class="down-content">
                                        <span class="category">Thanh toán thành...</span>
                                        <h4>Admin</h4>
                                        <a href="product-details.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                        </svg></a>
                                    </div>
                                </div>
                            </div> */}

                            </div>
                        </div>
                    </div>
                </>
                : <>loading</>
        )
    }
}
export default DanhSachNguoiThueTro;