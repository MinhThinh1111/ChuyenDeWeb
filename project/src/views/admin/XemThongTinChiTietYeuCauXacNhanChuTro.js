import React from 'react';
import { baseURL } from "../../services/my-axios";
import { useSearchParams } from "react-router-dom"
import { layThongTinChiTietYeuCauXacThucAPI, xacThucChuTro, xacThucThongTinChuTro, xoaXacYeuCauXacThuc } from '../../services/admin/MinhService';
import Loading from "../loading/Loading.js";
import { Link } from "react-router-dom";
import Button from "../item/Button"

class QuanLyYeuCauXacNhanChuTro extends React.Component {

    state = {
        detail: [],
        loading: false,
        trangThai: false
    }
    async componentDidMount() {
        const search = window.location.search;
        const param = new URLSearchParams(search);
        console.log(">>>>" + param.get('idChuTro'));
        let res = await layThongTinChiTietYeuCauXacThucAPI(new URLSearchParams(window.location.search).get('idChuTro'));
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
        const res = await xacThucChuTro(+param.get('idChuTro'));
        if (res!==null) {
            
            const res2 = await xacThucThongTinChuTro(+param.get('idChuTro'));
            if (res2!==null) {
                this.setState({trangThai: true})
            }
        }
    }

    onClickHuy = async () => {
        const search = window.location.search;
        const param = new URLSearchParams(search);
        const res = await xoaXacYeuCauXacThuc(+param.get('idChuTro'));
        if(res){
            this.setState({trangThai: true})
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
                            <div><b className="labeladmin">Căn cước công dân mặt trước:</b></div>
                            <img className='cccd' src={baseURL + detail.cccdMatTruoc} alt={baseURL + detail.cccdMatTruoc} />
                            <div><b className="labeladmin">Căn cước công dân mặt sau:</b> </div>
                            <img className='cccd' src={baseURL + detail.cccdMatSau} alt={baseURL + detail.cccdMatSau} />
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
export default QuanLyYeuCauXacNhanChuTro;