import React from 'react';
import { baseURL } from "../../services/my-axios";
import { useSearchParams } from "react-router-dom"
import { layThongTinChiTietYeuCauDangKyGoi, layThongTinChiTietYeuCauXacThucAPI, xacThucChuTro, xacThucThongTinChuTro, xacThucYeuCauDangKyGoi, xoaXacYeuCauXacThuc, xoaYeuCauDangKyGoi } from '../../services/admin/MinhService';
import Loading from "../loading/Loading.js";
import { Link } from "react-router-dom";
import Button from "../item/Button"

class ChiTietYeuCauDangKyGoi extends React.Component {

    state = {
        detail: [],
        loading: false,
        trangThai: false
    }
    async componentDidMount() {
        const search = window.location.search;
        const param = new URLSearchParams(search);
        console.log(">>>>" + param.get('id'));
        let res = await layThongTinChiTietYeuCauDangKyGoi(new URLSearchParams(window.location.search).get('id'));
        if (res != null) {
            console.log(res);
            this.setState({
                detail: res,
                loading: true
            })
        }
    }
    onClickXacNhan = async () => {
        const search = window.location.search;
        const param = new URLSearchParams(search);
        const res = await xacThucYeuCauDangKyGoi(+param.get('id'));
        if (res !== null) {
            if (res > 0) {
                this.setState({ trangThai: true })
            }
        }
    }

    onClickHuy = async () => {
        const search = window.location.search;
        const param = new URLSearchParams(search);
        const res = await xoaYeuCauDangKyGoi(+param.get('id'));
        if (res && res>0) {
            this.setState({ trangThai: true })
        }
    }
    render() {

        let { detail, loading, trangThai } = this.state;

        return (
            loading == true ?
                <>
                    <div className="main">
                        <p className="title_admin">Thông tin chi tiết</p>
                        <div className="noidung_content">
                            <div><b className="labeladmin">Tên:</b> {detail.chuTro.ten}</div>
                            <div><b className="labeladmin">Số Điện Thoại:</b> {detail.chuTro.soDienThoai}</div>
                            <div><b className="labeladmin">Id gói:</b> {detail.idGoi}</div>
                            <div><b className="labeladmin">Số phòng tối đa:</b> {detail.goi.soLuongPhongToiDa}</div>
                            <div><b className="labeladmin">Thời hạn:</b> {detail.goi.thoiHan}</div>
                            <div><b className="labeladmin">Giá:</b> {detail.goi.gia}</div>
                            <div><b className="labeladmin">Hình ảnh chuyển khoản:</b> </div>
                            <img className='hinhchuyenkhoan' src={baseURL + detail.hinhAnhChuyenKhoan} alt={baseURL + detail.hinhAnhChuyenKhoan} />
                        </div>
                        <div className='row'>
                            {trangThai === true ?
                                <></>
                                :
                                <div className='col-md-6'>
                                    <Button
                                        onClickButton={this.onClickXacNhan}
                                        label="Xác nhận" />
                                    <p />
                                    <Button
                                        onClickButton={this.onClickHuy}
                                        label="Hủy" />
                                </div>
                            }
                        </div>
                    </div>
                </>
                :
                <Loading />
        )
    }
}
export default ChiTietYeuCauDangKyGoi;