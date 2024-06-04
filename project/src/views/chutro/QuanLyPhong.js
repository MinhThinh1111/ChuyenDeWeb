import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import { layTatCaPhongCuaChuTro, layThongTinTaiKhoan } from '../../services/chutro/MinhService';
import { baseURL } from '../../services/my-axios';
import PhongItem from '../item/PhongItem';
import Header from '../item/Header.js';
import Comment from '../item/Comment.js';
import { Modal } from 'react-bootstrap';
import PhongItem3 from '../item/PhongItem3';
import notImage from "./imgs/not_image.jpg";
import Button from '../item/Button.js';
import Dialog from '../item/Dialog.js';
import { xoaPhong } from '../../services/chutro/ThinhService.js';

function QuanLyPhong() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [idPhong, setIdPhong] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [chuTro, setChuTro] = useState();
    const [loadingChuTro, setLoadingChuTro] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
        fetchDataPhong();
        layThongTinChuTro();
    }, []);
    const fetchDataPhong = async () => {
        try {
            const res = await layTatCaPhongCuaChuTro(sessionStorage.getItem('idNguoiDung'));
            if (res != null) {
                setList(res);
                setLoading(true);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const onClickComment = (idPhong) => {
        setIdPhong(idPhong);
        setShow(true);
    }
    const onClickXemNguoiThue = (idPhong) => {
        navigate(`/chutro/danhsachnguoithue?idPhong=${idPhong}`);
    }
    const onClickXoaPhong = (idPhong) => {
        setIdPhong(idPhong);
        setShowDialog(true);
    }
    const onCloseDialog = () => {
        setShowDialog(false);
    }
    const onClickEdit = (idPhong) => {
        navigate(`/chutro/editroom/${idPhong}`);
    }
    const onCLickItem = (idPhong) => {
    }
    const onClickVideo = (idPhong) => {
        navigate(`/chutro/videoreview?idPhong=${idPhong}`);
    }
    const onCloseComment = () => {
        setShow(false);
    }
    const onChangeActive = (idPhong) => {

    }
    const xacNhanXoaPhong = async (idPhongTro) => {
        
        try {
            await xoaPhong(sessionStorage.getItem('idNguoiDung'), idPhongTro);
            console.log("Phòng đã được xóa thành công!");
            fetchDataPhong(); // Làm mới danh sách phòng sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa phòng:', error);
            setError('Lỗi khi xóa phòng. Vui lòng thử lại.');
        }



    }
    const themPhong = () => {
        if (chuTro.xacThuc === 1) {
            navigate("/chutro/themphong");
        } else { 
            alert("Tài khoản của bạn chưa xác thực");
        }
    }
    const layThongTinChuTro = async () => {
        const res = await layThongTinTaiKhoan(sessionStorage.getItem("accountId"));
        if (res != null) {
            setChuTro(res);
            setLoadingChuTro(true);
        }
    }
    return (
        loading == true ?
            <>
                <Header
                    tenManHinh={"Màn hình danh sách phòng"}
                    tenChuTro={"Nguyễn Đức Minh"}
                />
                <div className="section trending bg-m">
                    <div className="container">
                        <Button
                            onClickButton={themPhong}
                            label={"Thêm phòng"} />
                        {list != null ?
                            <div className="row trending-box">
                                {
                                    list && list.length > 0 && list.map((item, index) => {
                                        return (
                                            // <PhongItem
                                            //     idPhong={item.phongTro != null ? item.phongTro.id : -1}
                                            //     hinh={item.hinhAnh.length > 0 ? baseURL + item.hinhAnh[0].hinh : ""}
                                            //     gia={item.phongTro != null ? item.phongTro.gia : 0}
                                            //     gioiTinh={item.phongTro != null ? (item.phongTro.gioiTinh == 0 ? "Tất cả giới tính" : item.phongTro.gioiTinh == 1 ? "Nam" : "Nữ") : "Rỗng"}
                                            //     soPhong={item.phongTro != null ? item.phongTro.soPhong : "Rỗng"}
                                            //     linkEdit={`/chutro/editroom/id=${item.phongTro != null ? item.phongTro.id : -1}`}
                                            //     linkDelete={`/chutro/deleteroom/id=${item.phongTro != null ? item.phongTro.id : -1}`}
                                            //     linkDSNguoiThue={`/chutro/danhsachnguoithue/idPhong=${item.phongTro != null ? item.phongTro.id : -1}`}
                                            //     binhLuan={onClickComment}
                                            //     xemNguoiThue={onClickXemNguoiThue}
                                            //     xoaPhong={onClickXoaPhong}
                                            //     linkVideoReview={`/chutro/videoreview?idPhong=${item.phongTro.id != null ? item.phongTro.id : -1}`}
                                            // />
                                            <PhongItem3
                                                idPhong={item.phongTro != null ? item.phongTro.id : -1}
                                                imgPhong={item.hinhAnh && item.hinhAnh.length > 0 ? baseURL + item.hinhAnh[0].hinh : `${notImage}`}
                                                diaChi={item.phongTro.diaChiChiTiet}
                                                gioiTinh={item.phongTro.gioiTinh === 0 ? "Nam & Nữ" : item.phongTro.gioiTinh === 1 ? "Nam" : "Nữ"}
                                                dienTich={item.phongTro.dienTich}
                                                gia={item.phongTro.gia ? item.phongTro.gia : "0"}
                                                hoatDong={item.phongTro.hoatDong ? item.phongTro.hoatDong : 0}
                                                demComment={item.binhLuan > 0 ? item.binhLuan : 0}
                                                onClickChiTietListener={onCLickItem}
                                                onClickItemCommentListener={onClickComment}
                                                onClickItemEditListener={onClickEdit}
                                                onClickItemDeleteListener={onClickXoaPhong}
                                                onClickItemListRenterListener={onClickXemNguoiThue}
                                                onClickVideoReViewListener={onClickVideo}
                                                onClickChangeActiveListener={onChangeActive}
                                            />
                                        )
                                    })
                                }

                            </div>
                            :
                            <h1>Rỗng</h1>
                        }


                    </div>
                </div>
                <Comment
                    idPhong={idPhong}
                    show={show}
                    onHide={onCloseComment} />
                <Dialog
                id={idPhong}
                show={showDialog}
                onClickCANCAL={onCloseDialog}
                title="Bạn có muốn xóa phòng không"
                content={`Nếu bạn nhấn xóa ${idPhong} thì nhấn OK nếu không thì hãy nhấn CANCAL`}
                onClickOK={xacNhanXoaPhong}/>
            </>
            :
            <Loading />
    )
}
export default QuanLyPhong;