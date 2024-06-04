import { myAxios } from "../my-axios";
const config = {
    headers: { "content-type": "multipart/form-data" },
};
const layTatCaPhongCuaChuTro = (idChuTro) => {
    return myAxios.get(`api/phongtrochutro/all?idChuTro=${idChuTro}`);
}
const layTatCaQuanHoatDong = () => {
    return myAxios.get(`api/quan/all/hoatdong`);
}
const layTatCaPhuongThuocQuanHoatDong = (idQuan) => {
    return myAxios.get(`api/phuong/all/hoatdong?idQuan=${idQuan}`);
}
const layTatCaTienIchHoatDong = () => {
    return myAxios.get(`api/tienich/all/hoatdong`);
}
const themPhong = (idChuTro, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages) => {
    const data = { idChuTro: idChuTro, soPhong: soPhong, gia: gia, dienTich: dienTich, moTa: moTa, diaChiChiTiet: diaChiChiTiet, soLuongToiDa: soLuongToiDa, tienCoc: tienCoc, tienDien: tienDien, tienNuoc: tienNuoc, gioiTinh: gioiTinh, idQuan: idQuan, idPhuong: idPhuong, hinh: listImages, tienIch: listTienIch };
    console.log(data);
    return myAxios.post(
        `api/phongtro/web/themphong`,
        data,
        config);
}
const updatePhong = (idPhong, soPhong, gia, dienTich, moTa, diaChiChiTiet, soLuongToiDa, tienCoc, tienDien, tienNuoc, gioiTinh, idQuan, idPhuong, listTienIch, listImages) => {
    const data = { idPhong: idPhong, soPhong: soPhong, gia: gia, dienTich: dienTich, moTa: moTa, diaChiChiTiet: diaChiChiTiet, soLuongToiDa: soLuongToiDa, tienCoc: tienCoc, tienDien: tienDien, tienNuoc: tienNuoc, gioiTinh: gioiTinh, idQuan: idQuan, idPhuong: idPhuong, hinh: listImages, tienIch: listTienIch };
    console.log(data);
    return myAxios.post(
        `api/phongtro/updateweb`,
        data,
        config);
}
const layThongTinPhongTheoID = (idPhong) => {
    return myAxios.get(`api/phongtro/chitiet?id=${idPhong}`);
}

const layTatCaBinhLuanCuaPhong = (idPhong) => {
    return myAxios.get(`api/phongbinhluan/all?idPhong=${idPhong}`);
}
const themBinhLuanChoPhong = (idPhong, idTaiKhoan, noiDung) => {
    return myAxios.put(`api/phongbinhluan/create?idPhong=${idPhong}&idTaiKhoan=${idTaiKhoan}&noiDungBinhLuan=${noiDung}`);
}
const layDanhSachQuan = () => {
    return myAxios.get(`api/quan/all/hoatdong`);
}
const layDanhSachPhongHoatDong = () => {
    return myAxios.get(`api/phongtro/all?loaiPhong=0&arrange=asc`);
}
const layDanhSachPhongTheoLoaiVaXapXep = (loaiPhong, xapXep) => {
    return myAxios.get(`api/phongtro/all?loaiPhong=${loaiPhong}&arrange=${xapXep}`);
}
const layDanhSachPhongTroYeuThich = (idTaiKhoan) => {
    return myAxios.get(`api/laydanhsachphongtroyeuthich?idTaiKhoan=${idTaiKhoan}`);
}
const layThongTinTaiKhoan = (idTaiKhoan) => {
    return myAxios.get(`api/chutro/chitiet?idTaiKhoan=${idTaiKhoan}`);
}
const xoaItemInListTienIchSeleted = (idPhong, idTienIch) => {
    return myAxios.delete(`api/phongtrotienich/delete?idPhong=${idPhong}&idTienIch=${idTienIch}`);
}
const xoaItemInListImageSeleted = (idHinh) => {
    return myAxios.delete(`api/hinhcuaphong/delete?idHinh=${idHinh}`);
}
const layTatCaTienIchDaChonCuaPhong = (idPhong) => {
    return myAxios.get(`api/phongtrotienich/getseleted?idPhong=${idPhong}`);
}
const layTatCaImageDaChonCuaPhong = (idPhong) => {
    return myAxios.get(`api/hinhanh/getseleted?idPhong=${idPhong}`);
}
const layTatCaPhongHoatDongTheoQuan = (idQuan) => {
    return myAxios.get(`api/phongtro/quan?idQuan=${idQuan}&arrange=DESC`);
}
const layDanhSachPhongNgauNhien = () => {
    return myAxios.get(`api/phongtro/random`);
}
const layPhongTheoBoLoc = (quan,giaBatDau,giaKetThuc,loaiPhong,gioiTinh,listTienIch) => {
    return myAxios.get(`api/timkiemtheonhucauweb?giaBatDau=${giaBatDau}&giaKetThuc=${giaKetThuc}&loaiPhong=${loaiPhong}&gioiTinh=${gioiTinh}&quan=${quan}&listTienIch=${JSON.stringify(listTienIch)}`);
}
const layQuanDauTien = () => {
    return myAxios.get(`api/quan/first`);
}
const batTatHoatDongPhongPhiaNguoiDung = (idPhong, hoatDong, idChuTro) => {
    return myAxios.patch(`api/phongtro/hoatdong?idPhong=${idPhong}&hoatDong=${hoatDong}&idChuTro=${idChuTro}`);
}


export {
    layTatCaPhongCuaChuTro,
    layTatCaQuanHoatDong,
    layTatCaPhuongThuocQuanHoatDong,
    layTatCaTienIchHoatDong,
    themPhong,
    layThongTinPhongTheoID,
    layTatCaBinhLuanCuaPhong,
    themBinhLuanChoPhong,
    layDanhSachQuan,
    layDanhSachPhongHoatDong,
    layThongTinTaiKhoan,
    xoaItemInListTienIchSeleted,
    layTatCaTienIchDaChonCuaPhong,
    xoaItemInListImageSeleted,
    layTatCaImageDaChonCuaPhong,
    updatePhong,
    layTatCaPhongHoatDongTheoQuan,
    layDanhSachPhongTheoLoaiVaXapXep,
    layDanhSachPhongTroYeuThich,
    layDanhSachPhongNgauNhien,
    layPhongTheoBoLoc,
    layQuanDauTien,
    batTatHoatDongPhongPhiaNguoiDung
};