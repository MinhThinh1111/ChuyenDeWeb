import React, { useEffect, useState } from 'react';
import HeaderNguoiThue from '../item/HeaderNguoiThue';
import ImagesBanner from '../item/ImagesBanner';
import InputRange from 'react-input-range';
import InputText from '../item/InputText';
import SelectOption from '../item/SelectOption';
import SelectMultipleOption from '../item/SelectMultipleOption';
import { layPhongTheoBoLoc, layQuanDauTien, layTatCaQuanHoatDong, layTatCaTienIchHoatDong } from '../../services/chutro/MinhService';
import Button from '../item/Button.js';
import FormDanhSachPhong1 from '../item/FormDanhSachPhong1.js';

export default function TimKiemTheoBoLoc() {
    const [giaBatDau, setGiaBatDau] = useState(0);
    const [giaKetThuc, setGiaKetThuc] = useState(100000000);
    const [gioiTinh, setGioiTinh] = useState(0);
    const [loaiPhong, setLoaiPhong] = useState(0);
    const [quan, setQuan] = useState();
    const [listRoom, setListRoom] = useState();
    const [listTienIchSeleted, setListTienIchSeleted] = useState([]);
    const [listGioiTinh, setListGioiTinh] = useState([{ id: 0, value: "Nam & Nữ" }, { id: 1, value: "Nam" }, { id: 2, value: "Nữ" }]);
    const [listLoaiPhong, setListLoaiPhong] = useState([{ id: 0, value: "Phòng trống" }, { id: 2, value: "Phòng ghép" }]);
    const [listTienIch, setListTienIch] = useState([]);
    const [listQuan, setListQuan] = useState([]);
    const onChangeGiaBatDau = (data) => {
        setGiaBatDau(data);
    }
    const onChangeGiaKetThuc = (data) => {
        setGiaKetThuc(data);
    }
    const onChangeQuan = (data) => {
        setQuan(data);
    }

    const onChangeGioiTinh = (data) => {
        setGioiTinh(data);
    }
    const onChangeLoaiPhong = (data) => {
        setLoaiPhong(data);
    }
    const onChangeTienIch = (data) => {
        setListTienIchSeleted(data);
    }
    const onClickApDung = async () => {
        // if (loaiPhong) {
        //     alert(loaiPhong);
        // } else {
        //     alert("loaiPhong");
        // }

        const res = await layPhongTheoBoLoc(quan, giaBatDau, giaKetThuc, loaiPhong, gioiTinh, listTienIchSeleted);
        if (res) {
            setListRoom(res);
            console.log(res);
        }
        // console.log(listTienIchSeleted);
        // console.log(encodeURIComponent(JSON.stringify(listTienIchSeleted)));
    }
    const fetchDataTienIch = async () => {
        try {
            const res = await layTatCaTienIchHoatDong();
            setListTienIch(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchDataQuanHoatDong = async () => {
        try {
            const res = await layTatCaQuanHoatDong();
            setListQuan(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchDataQuanDauTien = async () => {
        try {
            const res = await layQuanDauTien();
            setQuan(res.id);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchDataTienIch();
        fetchDataQuanHoatDong();
        fetchDataQuanDauTien();
    }, []);
    return (
        <>
            <header>
                <ImagesBanner />
            </header>
            <div className="main-content-m fillter-m">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='range-filter-m'>
                                <b>TÌm theo quận*</b>
                                <SelectOption
                                    defaultId={quan}
                                    label={"Chọn quận"}
                                    list={listQuan}
                                    changeValue={onChangeQuan}
                                    convertName={(e) => e.tenQuan}
                                />
                                <b>Tìm theo giá theo khoảng</b>
                                <InputText
                                    type="number"
                                    value={giaBatDau}
                                    label="Giá nhỏ nhất (đồng)"
                                    changeValue={onChangeGiaBatDau}
                                    placeholder="Nhập giá nhỏ nhất" />
                                <InputText
                                    type="number"
                                    value={giaKetThuc}
                                    label="Giá lớn nhất (đồng)"
                                    placeholder="Nhập giá lớn nhất"
                                    changeValue={onChangeGiaKetThuc} />
                                <b>Tìm theo loại phòng</b>
                                <SelectOption
                                    label={"Chọn loại phòng"}
                                    list={listLoaiPhong}
                                    changeValue={onChangeLoaiPhong}
                                    convertName={(e) => e.value}
                                />
                                <b>Tìm theo giới tính</b>
                                <SelectOption
                                    label={"Chọn giới tính"}
                                    list={listGioiTinh}
                                    changeValue={onChangeGioiTinh}
                                    convertName={(e) => e.value}
                                />
                                <b>Chọn tiện ích có thể chọn nhiều</b>
                                <SelectMultipleOption
                                    label={"Chọn tiện ích"}
                                    list={listTienIch}
                                    changeValue={onChangeTienIch}
                                    convertName={(item) => item.ten}
                                />
                                <Button
                                    label="Áp dụng"
                                    onClickButton={onClickApDung}
                                />
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='range-filter-m'>
                                <FormDanhSachPhong1
                                    listRoom={listRoom} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}