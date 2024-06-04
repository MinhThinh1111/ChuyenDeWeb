import { myAxios } from "../my-axios";

const getAllTienIchCallAPI = () => {
    return myAxios.get("api/laytatcatienich");
}
const getGoiCallAPI = (id) => {
    return myAxios.get(`api/goi/chitiet?id=${id}`);
}
const layTienIchTheoId = (id) => {
    return myAxios.get(`api/laytienichtheoid?id=${id}`);
};
const config = {
    headers: { 'content-type': 'multipart/form-data' }
}
const addnewTienIch = (ten, hinh) => {
    return myAxios.post(`api/themtienich`, { ten: ten, hinh: hinh }, config);
}
const editTienIch = (id, ten, hinh, trangThai) => {
    return myAxios.post(`api/capnhattienich`, { id, ten: ten, hinh: hinh, trangThai: trangThai }, config);
}
const editTienIchkhonghinh = (id, ten, trangThai) => {
    return myAxios.post(`api/capnhattienich`, { id, ten: ten, trangThai: trangThai }, config);
}
const capNhatTrangThaiTienIch = (id) => {
    return myAxios.patch(`api/capnhattrangthaitienich?id=${id}`);
};
const addPhuong = (tenPhuong, idQuan) => {
    return myAxios.post(`api/themphuong`, { tenPhuong: tenPhuong, idQuan: idQuan }, config);
}
const getAllGoiDangKyCallAPI = () => {
    return myAxios.get("api/goi/all");
}
const guiYeuCauDangKyGoi = (idChuTro, idGoi, hinhAnhChuyenKhoan) => {
    return myAxios.post(`api/yeucaudangkygoi/create`, { idChuTro: idChuTro, idGoi: idGoi, hinhAnhChuyenKhoan: hinhAnhChuyenKhoan }, config);
}
const xoaGoiDichVuChuTroTheoIDTaiKhoanAPI = (id) => {
    return myAxios.patch(`api/chutro/xoadichvu?idTaiKhoan=${id}`);
}


// export { multiple };
export { xoaGoiDichVuChuTroTheoIDTaiKhoanAPI, guiYeuCauDangKyGoi, getAllGoiDangKyCallAPI, addPhuong, getGoiCallAPI, getAllTienIchCallAPI, addnewTienIch, layTienIchTheoId, editTienIch, capNhatTrangThaiTienIch, editTienIchkhonghinh };