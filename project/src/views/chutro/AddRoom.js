import React, { useState, useEffect } from 'react';
import { baseURL } from '../../services/my-axios';
import InputText from '../item/InputText';
import Header from '../item/Header';
import SelectOption from '../item/SelectOption';
import Button from '../item/Button';
import InputMultipleFile from '../item/InputMultipleFile';
import CheckBox from '../item/CheckBox';
import { layTatCaQuanHoatDong, layTatCaPhuongThuocQuanHoatDong, layTatCaTienIchHoatDong, themPhong, layThongTinTaiKhoan } from '../../services/chutro/MinhService.js';
import SelectMultipleOption from '../item/SelectMultipleOption';
import InputFile from '../item/InputFile';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from '../NotFound/NotFound';
function AddRoom() {
    const navigate = useNavigate();
    const [listQuan, setListQuan] = useState([]);
    const [listPhuong, setListPhuong] = useState([]);
    const [listTienIch, setListTienIch] = useState([]);
    const [soPhong, setSoPhong] = useState('');
    const [gia, setGia] = useState('');
    const [dienTich, setDienTich] = useState('');
    const [moTa, setMoTa] = useState('');
    const [diaChiChiTiet, setDiaChiChiTiet] = useState('');
    const [soLuong, setSoLuong] = useState('');
    const [tienCoc, setTienCoc] = useState('');
    const [tienDien, setTienDien] = useState('');
    const [tienNuoc, setTienNuoc] = useState('');
    const [listGioiTinh, setListGioiTinh] = useState([{ id: 0, value: "Tất cả" }, { id: 1, value: "Nam" }, { id: 2, value: "Nữ" }]);
    const [gioiTinh, setGioiTinh] = useState('');
    const [quan, setQuan] = useState('');
    const [phuong, setPhuong] = useState('');
    const [tienIch, setTienIch] = useState([]);
    const [files, setFiles] = useState();
    const [resAdd, setResAdd] = useState();
    const [chuTro, setChuTro] = useState();
    const [loadingChuTro, setLoadingChuTro] = useState(false);
    const fetchDataQuan = async () => {
        try {
            const res = await layTatCaQuanHoatDong();
            setListQuan(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchDataTienIch = async () => {
        try {
            const res = await layTatCaTienIchHoatDong();
            setListTienIch(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchDataPhuong = async (idQuan) => {
        try {
            const res = await layTatCaPhuongThuocQuanHoatDong(idQuan);
            setListPhuong(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchThemPhong = async (idChuTro, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages) => {
        try {
            const res = await themPhong(idChuTro, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages);
            setResAdd(res);
            alert("Thêm thành công");
            navigate("/chutro");
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const layThongTinChuTro = async () => {
        const res = await layThongTinTaiKhoan(sessionStorage.getItem("accountId"));
        if (res != null) {
            setChuTro(res);
            setLoadingChuTro(true);
        }
    }

    useEffect(() => {
        fetchDataQuan();
        fetchDataTienIch();
        layThongTinChuTro();
    }, []);

    const onChangeSoPhong = (text) => {
        setSoPhong(text);
    }
    const onChangeGia = (text) => {
        setGia(text);
    }
    const onChangeDienTich = (text) => {
        setDienTich(text);
    }
    const onChangeMoTa = (text) => {
        setMoTa(text);
    }
    const onChangeDiaChiChiTiet = (text) => {
        setDiaChiChiTiet(text);
    }
    const onChangeSoLuong = (text) => {
        setSoLuong(text);
    }
    const onChangeTienCoc = (text) => {
        setTienCoc(text);
    }
    const onChangeDien = (text) => {
        setTienDien(text);
    }
    const onChangeNuoc = (text) => {
        setTienNuoc(text);
    }
    const onChangeGioiTinh = (text) => {
        setGioiTinh(text);
    }
    const onChangeQuan = (value) => {
        fetchDataPhuong(value ? value : 1);
        setQuan(value);
    }
    const onChangePhuong = (value) => {
        setPhuong(value);
    }
    const onChangeTienIch = (res) => {

        setTienIch(res);
    }
    const onChangeImages = (files) => {
        setFiles(files);
    }
    const onClickButtonAdd = () => {
        console.log(tienIch);
        if (soPhong != "" && gia != "" && dienTich != "" && moTa != "" && diaChiChiTiet != "" && soLuong != "" && tienCoc != "" && tienDien != "" && tienNuoc != "" && gioiTinh != "" && quan != "" && phuong != "") {
            fetchThemPhong(sessionStorage.getItem('idNguoiDung'), soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuong, tienCoc, tienDien, tienNuoc, gioiTinh, quan, phuong, tienIch, files);

        }
        else {
            alert("Hãy nhập đủ cái trường có dấu *");
        }
    }
    return (

        <>
            {
                loadingChuTro === true && chuTro.xacThuc === 1 ?
                    <>
                        <Header
                            tenManHinh={"Màn hình thêm phòng"}
                            tenChuTro={"Nguyễn Đức Minh"}
                        />
                        <div className="section trending">
                            <div className="container">
                                <form>
                                    <InputText
                                        label={"Số phòng*:"}
                                        type={"number"}
                                        placeholder={"Nhập số phòng"}
                                        changeValue={onChangeSoPhong}
                                    />
                                    <InputText
                                        label={"Giá*:"}
                                        type={"number"}
                                        placeholder={"Nhập giá"}
                                        changeValue={onChangeGia}
                                    />
                                    <InputText
                                        label={"Diện tích*:"}
                                        type={"number"}
                                        placeholder={"Nhập diện tích"}
                                        changeValue={onChangeDienTich}
                                    />
                                    <InputText
                                        label={"Mô Tả*:"}
                                        type={"text"}
                                        placeholder={"Nhập mô tả"}
                                        changeValue={onChangeMoTa}
                                    />
                                    <InputText
                                        label={"Địa chỉ chi tiết*:"}
                                        type={"text"}
                                        placeholder={"Nhập địa chỉ chi tiết"}
                                        changeValue={onChangeDiaChiChiTiet}
                                    />
                                    <InputText
                                        label={"Số lượng tối đa*:"}
                                        type={"number"}
                                        placeholder={"Nhập số lượng tối đa"}
                                        changeValue={onChangeSoLuong}
                                    />
                                    <InputText
                                        label={"Tiền cọc*:"}
                                        type={"number"}
                                        placeholder={"Nhập tiền cọc"}
                                        changeValue={onChangeTienCoc}
                                    />
                                    <InputText
                                        label={"Tiền điện*:"}
                                        type={"number"}
                                        placeholder={"Nhập tiền điện"}
                                        changeValue={onChangeDien}
                                    />
                                    <InputText
                                        label={"Tiền nước*:"}
                                        type={"number"}
                                        placeholder={"Nhập tiền nước"}
                                        changeValue={onChangeNuoc}
                                    />
                                    <SelectOption
                                        label={"Chọn giới tính*"}
                                        list={listGioiTinh}
                                        changeValue={onChangeGioiTinh}
                                        convertName={(e) => e.value}
                                    />
                                    <SelectOption
                                        label={"Chọn quận*"}
                                        list={listQuan}
                                        changeValue={onChangeQuan}
                                        convertName={(item) => item.tenQuan}
                                    />
                                    <SelectOption
                                        label={"Chọn phường*"}
                                        list={listPhuong}
                                        changeValue={onChangePhuong}
                                        convertName={(item) => item.tenPhuong}
                                    />
                                    <SelectMultipleOption
                                        label={"Chọn tiện ích"}
                                        list={listTienIch}
                                        changeValue={onChangeTienIch}
                                        convertName={(item) => item.ten}
                                    />
                                    {/* <label for="floatingSelect">Chọn tiện ích</label>
                        <select className="form-select" onChange={onChangeTienIch} multiple aria-label="Multiple select example">
                            {
                                listTienIch && listTienIch.length > 0 && listTienIch.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.ten}</option>
                                    )
                                })
                            }
                        </select> */}
                                    <InputMultipleFile
                                        label={"Chọn hình:"}
                                        onChangeFile={onChangeImages}
                                    />
                                    <div className="d-grid gap-2">
                                        <Button
                                            label={"Thêm phòng"}
                                            onClickButton={onClickButtonAdd}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <NotFound />
            }
        </>
    )
}
export default AddRoom;