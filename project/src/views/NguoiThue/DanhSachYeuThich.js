import React, { useEffect, useState } from 'react';
import { layDanhSachPhongTheoLoaiVaXapXep, layDanhSachPhongTroYeuThich } from '../../services/chutro/MinhService';
import FormDanhSachPhong1 from '../item/FormDanhSachPhong1';
import HeaderNguoiThue from '../item/HeaderNguoiThue';
import ImagesBanner from '../item/ImagesBanner';


export default function DanhSachYeuThich() {
    const _PHONG_GHEP = 2;
    const _XAP_XEP_THEO_GIA = "DESC";
    const [listRoom, setListRoom] = useState();
    const [loading, setLoading] = useState(false);

    const fetchDataRoom = async () => {
        const res = await layDanhSachPhongTroYeuThich(sessionStorage.getItem("accountId"));
        if (res) {
            setListRoom(res);
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchDataRoom();
    }, []);

    return (
        <>
            {
                loading ?
                    <>
                        <HeaderNguoiThue />
                        <div className="main-content-m">
                            <FormDanhSachPhong1
                                listRoom={listRoom} />
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    )
}