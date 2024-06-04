import { myAxios } from "../my-axios";

const getAllKhuVucApi = () => {
  return myAxios.get("api/laytatcaquan");
};
const config = {
  headers: { 'content-type': 'multipart/form-data' }
}
const addnewQuan = (tenQuan, hinh) => {
  return myAxios.post(`api/themquan`, { tenQuan: tenQuan, hinh: hinh }, config);
}
const layQuanTheoId = (id) => {
  return myAxios.get(`api/layquantheoid?id=${id}`);
};
const layPhuongTheoId = (id) => {
  return myAxios.get(`api/layphuongtheoid?id=${id}`);
};
const editQuan = (id, tenQuan, hinh, trangThai) => {
  return myAxios.post(`api/capnhatquan`, { id, tenQuan: tenQuan, hinh: hinh, trangThai: trangThai }, config);
}
const editQuankhonghinh = (id, tenQuan, trangThai) => {
  return myAxios.post(`api/capnhatquan`, { id, tenQuan: tenQuan, trangThai: trangThai });
}
const getDetailPhuongCallAPI = (id) => {
  return myAxios.get(`api/layphuongtheoid?id=${id}`);
}
const listPhuongCallAPI = (id) => {
  return myAxios.get(`api/phuong/layphuongtheoquan?idQuan=${id}`);
}
const editPhuongCallAPI = (id, tenPhuong, idQuan, trangThai) => {
  return myAxios.post(`api/capnhatphuong?id=${id}&tenPhuong=${tenPhuong}&idQuan=${idQuan}&trangThai=${trangThai}`)
}
const getDetailThongBaoCallAPI = (id) => {
  return myAxios.get(`api/thongbao/chitiet?id=${id}`)
}
const xoaThongBao = (id) => {
  return myAxios.get(`api/thongbao/xoa?id=${id}`);
}
const getNguoiGuiChuTro = (idTaiKhoan) => {
  return myAxios.get(`api/thongtinadmin?id=${idTaiKhoan}`);
}
// const getNguoiGui = (idTaiKhoan) => {
//   return myAxios.get(`api/chutro/chitiet?idTaiKhoan=${idTaiKhoan}`);
// }
const getAllGoiDangKyCallAPI = () => {
  return myAxios.get("api/goi/all");
}





// export { multiple };
export { getAllKhuVucApi, addnewQuan, layQuanTheoId, editQuan, editQuankhonghinh, getDetailPhuongCallAPI,listPhuongCallAPI, editPhuongCallAPI , getDetailThongBaoCallAPI, getAllGoiDangKyCallAPI, xoaThongBao, getNguoiGuiChuTro, layPhuongTheoId};



