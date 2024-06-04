import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { layTatCaPhongHoatDongTheoQuan } from '../../services/chutro/MinhService.js';
import { baseURL } from '../../services/my-axios.js';
import Comment from '../item/Comment.js';
import HeaderNguoiThue from '../item/HeaderNguoiThue.js';
import PhongItem2 from '../item/PhongItem2.js';
import Loading from '../loading/Loading.js';
import notImage from './imgs/not_image.jpg';
export default function FormDanhSachPhong1(props) {
    const navigate = useNavigate();
    // Khởi tại biến cần có để hiển thị model comment
    const [idPhong, setIdPhong] = useState(-1);
    const [show, setShow] = useState(false);
    const { listRoom } = props;

    //Function close comment
    const onCloseComment = () => {
        setShow(false);
    };

    //Click show comment
    const clickComment = (idPhong) => {
        setIdPhong(idPhong);
        setShow(true);
    };

    // Xem Cci tiết phòng
    const clickPhong = (idPhong) => {
        navigate(`/nguoithue/chitietphongtro/${idPhong}`);
    }
    return (
        <>
            <div className="container">
                {
                    listRoom && listRoom.length > 0 && listRoom.map((item, index) => {
                        return (
                            <PhongItem2
                                idPhong={item.id}
                                imgPhong={
                                    (props.convertHinh && props.convertHinh(item) && props.convertHinh(item).length > 0)
                                        ? props.convertHinh(item)[0].hinh
                                        : (item.hinhAnhPhongTro && item.hinhAnhPhongTro.length > 0)
                                            ? baseURL + item.hinhAnhPhongTro[0].hinh
                                            : notImage
                                }
                                diaChi={item.diaChiChiTiet}
                                gioiTinh={
                                    item.gioiTinh === 0
                                        ? "Nam & Nữ"
                                        : item.gioiTinh === 1
                                            ? "Nam"
                                            : "Nữ"
                                }
                                dienTich={item.dienTich}
                                gia={100000}
                                demComment={item.binhLuan}
                                onClickRoomListener={clickPhong}
                                onClickItemCommentListener={clickComment}
                            />
                        )
                    })
                }

            </div>
            <Comment idPhong={idPhong} show={show} onHide={onCloseComment} />
        </>
    )
}