import { myAxios } from "../my-axios";

const getAllMotelRoomOwnerAuthenticationCallAPI = () => {
    return myAxios.get("api/xacthucchutro/all");
}
const checkAccountAPI = (username, password) => {
    return myAxios.get(`api/taikhoan/dangnhap?tenTaiKhoan=${username}&matKhau=${password}`);
}
const getAllYeuCauDangKyDichVuAPI = () => {
    return myAxios.get("api/yeucaudangky/all");
}
const layThongTinChiTietYeuCauXacThucAPI = (idChuTro) => {
    return myAxios.get(`api/xacthucchutro/chitiet?idChuTro=${idChuTro}`);
}
const checkUsernameAPI = (username) => {
    return myAxios.get(`api/checkuser?tenTaiKhoan=${username}`);
}
const guiCodeLayLaiMatKhau = (email, idTaiKhoan) => {
    return myAxios.post(`api/forgotpassword?idTaiKhoan=${idTaiKhoan}&email=${email}`);
}
const checkcode = (idTaiKhoan, code, password) => {
    return myAxios.post(`api/checkcode?idTaiKhoan=${idTaiKhoan}&code=${code}&matKhau=${password}`);
}
const xacThucChuTro = (idChuTro) => {
    return myAxios.patch(`api/xacthucchutro/xacthuc?idChuTro=${idChuTro}`);
}
const xacThucThongTinChuTro = (idChuTro) => {
    return myAxios.patch(`api/chutro/chapnhanxacthuc?id=${idChuTro}`);
}
const xoaXacYeuCauXacThuc = (idChuTro) => {
    return myAxios.delete(`api/xacthucchutro/xoa?idChuTro=${idChuTro}`);
}
const layThongTinChiTietYeuCauDangKyGoi = (id) => {
    return myAxios.get(`api/yeucaudangky/chitiet?id=${id}`);
}
const xacThucYeuCauDangKyGoi = (id) => {
    return myAxios.patch(`api/yeucaudangky/xacthuc?id=${id}`);
}
const xoaYeuCauDangKyGoi = (id) => {
    return myAxios.delete(`api/yeucaudangky/huy?id=${id}`);
}
// export { multiple };
export {
    getAllMotelRoomOwnerAuthenticationCallAPI,
    checkAccountAPI,
    getAllYeuCauDangKyDichVuAPI,
    layThongTinChiTietYeuCauXacThucAPI,
    checkUsernameAPI,
    guiCodeLayLaiMatKhau,
    checkcode,
    xacThucChuTro,
    xoaXacYeuCauXacThuc,
    xacThucThongTinChuTro,
    layThongTinChiTietYeuCauDangKyGoi,
    xacThucYeuCauDangKyGoi,
    xoaYeuCauDangKyGoi
};