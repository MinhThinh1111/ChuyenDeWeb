import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { layDanhSachPhongNgauNhien, layTatCaPhongHoatDongTheoQuan } from '../../services/chutro/MinhService.js';
import { baseURL } from '../../services/my-axios.js';
import Comment from '../item/Comment.js';
import FormDanhSachPhong1 from '../item/FormDanhSachPhong1.js';
import HeaderNguoiThue from '../item/HeaderNguoiThue.js';
import PhongItem2 from '../item/PhongItem2.js';
import Loading from '../loading/Loading.js';
import notImage from './imgs/not_image.jpg';
export default function DanhSachPhongRandom() {

    const params = useParams();
    const [listRoom, setListRoom] = useState([]);
    const [loading, setLoading] = useState(false);
    // Comment
    const [idPhong, setIdPhong] = useState(-1);
    const [show, setShow] = useState(false);

    //Function close comment
    const onCloseComment = () => {
        setShow(false);
    };

    //Click show comment
    const clickComment = (idPhong) => {
        setIdPhong(idPhong);
        setShow(true);
    };

    // Xem Chi tiết phòng
    const clickPhong = (idPhong) => {
        alert("Chưa navigate qua màn hình chi tiết. Ai làm màn hình nyaf thì thêm ở chỗ này. idPhong là: " + idPhong);
    }
    const fecthDataPhongTheoQuan = async () => {
        const res = await layDanhSachPhongNgauNhien();
        if (res) {
            setListRoom(res);
            setLoading(true);
        }
    }

    useEffect(() => {
        fecthDataPhongTheoQuan();
    }, []);

    return (
        <>
            {loading ?
                <>
                    <HeaderNguoiThue />
                    <div className="main-content-m">
                        <FormDanhSachPhong1
                            listRoom={listRoom} />
                    </div>
                </>
                :
                <Loading />
            }
        </>
    )
}