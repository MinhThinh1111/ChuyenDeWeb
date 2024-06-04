import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../services/my-axios';
import InputText from '../item/InputText';
import Header from '../item/Header';
import SelectOption from '../item/SelectOption';
import Button from '../item/Button';
import InputMultipleFile from '../item/InputMultipleFile';
import CheckBox from '../item/CheckBox';
import { layTatCaQuanHoatDong, layTatCaPhuongThuocQuanHoatDong, layTatCaTienIchHoatDong, themPhong, layThongTinPhongTheoID, xoaItemInListTienIchSeleted, layTatCaTienIchDaChonCuaPhong, xoaItemInListImageSeleted, layTatCaImageDaChonCuaPhong, updatePhong, batTatHoatDongPhongPhiaNguoiDung } from '../../services/chutro/MinhService.js';
import SelectMultipleOption from '../item/SelectMultipleOption';
import InputFile from '../item/InputFile';
import QuanItem from '../item/QuanItem';
import Item1 from '../item/Item1';
import Dialog from '../item/Dialog';
function UpdateRoom() {
    const navigate = useNavigate();
    const _PHONG_DA_CO_NGUOI_THUE = 100;
    const _DA_DAT_SO_LUONG_PHONG_TOI_DA = 101;
    const _CHUA_DANG_KY_DICH_VU = 102;
    const _THANH_CONG = 1;
    let params = useParams();
    console.log(params.idPhong);
    const [listQuan, setListQuan] = useState([]);
    const [listPhuong, setListPhuong] = useState([]);
    const [listTienIch, setListTienIch] = useState([]);
    const [room, setRoom] = useState();
    const [hoatDong, setHoatDong] = useState();
    const [loadingRoom, setLoadingRoom] = useState(false);
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
    const [tienIchSeleted, setTienIchSeleted] = useState([]);
    const [hinhAnhSeleted, setHinhAnhSeleted] = useState([]);
    const [files, setFiles] = useState();
    const [resUpdate, setResUpdate] = useState();
    const [contentNotification, setContentNotification] = useState();

    // Dialog setup
    const [showDialog, setShowDialog] = useState(false);
    const onCloseDialog = () => {
        setShowDialog(false);
    }
    const fetchDataQuan = async () => {
        try {
            const res = await layTatCaQuanHoatDong();
            setListQuan(res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const fetchDataPhong = async () => {
        try {
            const res = await layThongTinPhongTheoID(params.idPhong);
            setRoom(res);
            setSoPhong(res.soPhong);
            setGia(res.gia);
            setDienTich(res.dienTich);
            setMoTa(res.moTa);
            setDiaChiChiTiet(res.diaChiChiTiet);
            setSoLuong(res.soLuongToiDa);
            setTienCoc(res.tienCoc);
            setTienDien(res.tienDien);
            setTienNuoc(res.tienNuoc);
            setLoadingRoom(true);
            setGioiTinh(res.gioiTinh);
            setQuan(res.quan.id);
            setHoatDong(res.hoatDong);
            setPhuong(res.phuong.id);
            setTienIchSeleted(res.tienIch);
            setHinhAnhSeleted(res.hinhAnhPhongTro);
            fetchDataPhuong(res.quan.id);

            console.log(res);
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
    const fetchSuaPhong = async (idPhong, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages) => {
        try {
            const res = await updatePhong(idPhong, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages);
            setResUpdate(res);
            navigate("/chutro");
            console.log(">>>" + res);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataPhong();
        fetchDataQuan();
        fetchDataTienIch();
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
    const fetchDataTienIchSeleted = async () => {
        const res = await layTatCaTienIchDaChonCuaPhong(params.idPhong);
        setTienIchSeleted(res.tienIchSeleted);
    }
    const fetchDataImageSeleted = async () => {
        const res = await layTatCaImageDaChonCuaPhong(params.idPhong);
        setHinhAnhSeleted(res);
    }
    const onClickDeleteTienIch = async (id) => {
        const res = await xoaItemInListTienIchSeleted(params.idPhong, id);
        if (res === 1) {
            fetchDataTienIchSeleted(params.idPhong);
        }
    }
    const onClickDeleteImage = async (id) => {
        alert(id);
        const res = await xoaItemInListImageSeleted(id);
        if (res === 1) {
            fetchDataImageSeleted(params.idPhong);
        }
    }

    const onClickButtonUpdate = () => {
        console.log(tienIch);
        if (soPhong != "" && gia != "" && dienTich != "" && moTa != "" && diaChiChiTiet != "" && soLuong != "" && tienCoc != "" && tienDien != "" && tienNuoc != "" && gioiTinh != "" && quan != "" && phuong != "") {
            fetchSuaPhong(params.idPhong, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuong, tienCoc, tienDien, tienNuoc, gioiTinh, quan, phuong, tienIch, files);
        }
        else {
            alert("Hãy nhập đủ thông tin có đấu *");
        }
    }
    const batHoatDongPhong = async () => {
        const HOAT_DONG = 1;
        const res = await batTatHoatDongPhongPhiaNguoiDung(params.idPhong, HOAT_DONG, sessionStorage.getItem("idNguoiDung"));
        if (res){
            console.log(res);
            notificationDialog(res, HOAT_DONG);
        }
    }
    const tatHoatDongPhong = async () => {
        const TAT_HOAT_DONG = 0;
        const res = await batTatHoatDongPhongPhiaNguoiDung(params.idPhong, TAT_HOAT_DONG, sessionStorage.getItem("idNguoiDung"));
        if (res){
            notificationDialog(res, TAT_HOAT_DONG);
        }
    }
    const notificationDialog = (res, newHoatDong) => {
        console.log(">>>"+res);
        if(res === _PHONG_DA_CO_NGUOI_THUE){
            setContentNotification("Phòng đã có người thuê không thể tắt hoạt động");
        }
        if(res === _DA_DAT_SO_LUONG_PHONG_TOI_DA){
            alert(">>>");
            setContentNotification("ố lượng phòng hoạt động đã đạt tối đa gói dịch vụ không thể bật");
        }
        if(res === _CHUA_DANG_KY_DICH_VU){
            setContentNotification("Bạn chưa đăng ký dịch vụ hãy đăng ký dịch vụ để bật hoạt động phòng");
        }
        if(res === _THANH_CONG){
            setHoatDong(newHoatDong);
            setContentNotification("Chỉnh sửa thành công");
        }
        setShowDialog(true);
    }
    return (
        <>
            <Header
                tenManHinh={"Màn hình sửa phòng"}
                tenChuTro={"Nguyễn Đức Minh"}
            />
            <div className="section trending">
                <div className="container">
                    {loadingRoom ?
                        <form>
                            <InputText
                                value={soPhong}
                                label={"Số phòng*:"}
                                type={"number"}
                                placeholder={"Nhập số phòng"}
                                changeValue={onChangeSoPhong}
                            />
                            <InputText
                                value={gia}
                                label={"Giá*:"}
                                type={"number"}
                                placeholder={"Nhập giá"}
                                changeValue={onChangeGia}
                            />
                            <InputText
                                value={dienTich}
                                label={"Diện tích*:"}
                                type={"number"}
                                placeholder={"Nhập diện tích"}
                                changeValue={onChangeDienTich}
                            />
                            <InputText
                                value={moTa}
                                label={"Mô Tả*:"}
                                type={"text"}
                                placeholder={"Nhập mô tả"}
                                changeValue={onChangeMoTa}
                            />
                            <InputText
                                value={diaChiChiTiet}
                                label={"Địa chỉ chi tiết*:"}
                                type={"text"}
                                placeholder={"Nhập địa chỉ chi tiết"}
                                changeValue={onChangeDiaChiChiTiet}
                            />
                            <InputText
                                value={soLuong}
                                label={"Số lượng tối đa*:"}
                                type={"number"}
                                placeholder={"Nhập số lượng tối đa"}
                                changeValue={onChangeSoLuong}
                            />
                            <InputText
                                value={tienCoc}
                                label={"Tiền cọc*:"}
                                type={"number"}
                                placeholder={"Nhập tiền cọc"}
                                changeValue={onChangeTienCoc}
                            />
                            <InputText
                                value={tienDien}
                                label={"Tiền điện*:"}
                                type={"number"}
                                placeholder={"Nhập tiền điện"}
                                changeValue={onChangeDien}
                            />
                            <InputText
                                value={tienNuoc}
                                label={"Tiền nước*:"}
                                type={"number"}
                                placeholder={"Nhập tiền nước"}
                                changeValue={onChangeNuoc}
                            />
                            <SelectOption
                                defaultId={gioiTinh}
                                label={"Chọn giới tính*"}
                                list={listGioiTinh}
                                changeValue={onChangeGioiTinh}
                                convertName={(e) => e.value}
                            />
                            <SelectOption
                                defaultId={quan}
                                label={"Chọn quận*"}
                                list={listQuan}
                                changeValue={onChangeQuan}
                                convertName={(item) => item.tenQuan}
                            />
                            <SelectOption
                                defaultId={phuong}
                                label={"Chọn phường*"}
                                list={listPhuong}
                                changeValue={onChangePhuong}
                                convertName={(item) => item.tenPhuong}
                            />

                            <div className='list-selected'>
                                {
                                    tienIchSeleted ? <>
                                        <b>Chỉnh sửa tiện ích đã chọn</b>
                                        <div className="quan-m">
                                            <div className="row">
                                                {
                                                    tienIchSeleted && tienIchSeleted.length >= 0 && tienIchSeleted.map((item, index) => {
                                                        return (
                                                            <Item1
                                                                idItem={item.id}
                                                                imgItem={`${baseURL}${item.hinh}`}
                                                                tenItem={item.ten}
                                                                // onClickItemQuanListener={clickQuan}
                                                                onClickDeleteItemListener={onClickDeleteTienIch}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                    </> :
                                        <></>
                                }
                            </div>
                            <SelectMultipleOption
                                label={"Chọn tiện ích"}
                                list={listTienIch}
                                changeValue={onChangeTienIch}
                                convertName={(item) => item.ten}
                            />
                            <div className='list-selected'>
                                {
                                    hinhAnhSeleted && hinhAnhSeleted.length > 0 ? <>
                                        <b>Danh sách hình đã chọn trước đó</b>
                                        <div className="quan-m">
                                            <div className="row">
                                                {
                                                    hinhAnhSeleted && hinhAnhSeleted.length >= 0 && hinhAnhSeleted.map((item, index) => {
                                                        return (
                                                            <Item1
                                                                idItem={item.id}
                                                                imgItem={`${baseURL}${item.hinh}`}
                                                                // tenItem={item.ten}
                                                                // onClickItemQuanListener={clickQuan}
                                                                onClickDeleteItemListener={onClickDeleteImage}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                    </> :
                                        <></>
                                }
                            </div>
                            <InputMultipleFile
                                label={"Chọn hình:"}
                                onChangeFile={onChangeImages}
                            />
                            <div className="d-grid gap-2">
                                <Button
                                    label={"Sửa phòng"}
                                    onClickButton={onClickButtonUpdate}
                                />
                                {
                                    hoatDong === 0 ?
                                        <Button
                                            label={"Bật hoạt động phòng phía người dùng"}
                                            onClickButton={batHoatDongPhong}
                                        />
                                        :
                                        <Button
                                            label={"Tắt hoạt động phòng phía người dùng"}
                                            onClickButton={tatHoatDongPhong}
                                        />
                                }


                            </div>
                        </form>

                        :
                        <></>}

                </div>
            </div>
            <Dialog
                show={showDialog}
                onClickCANCAL={onCloseDialog}
                title="Thông báo"
                content={contentNotification} />
        </>
    )
}
export default UpdateRoom;