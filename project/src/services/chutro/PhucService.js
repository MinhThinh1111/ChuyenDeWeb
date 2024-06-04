import { myAxios } from "../my-axios";
const getChuTroById = (id) => {
  return myAxios.get(`api/chutro/thongtinchitiet?idTaiKhoan=${id}`);
};
const config = {
  headers: { "content-type": "multipart/form-data" },
};
const updateThongTinChuTroCoHinh = (
  idTaiKhoan,
  hinh,
  ten,
  soDienThoai,
  soTaiKhoanNganHang,
  tenChuTaiKhoanNganHang
) => {
  return myAxios.post(
    `api/capnhatthongtinchutrocohinh`,
    {
      idTaiKhoan: idTaiKhoan,
      hinh: hinh,
      ten: ten,
      soDienThoai: soDienThoai,
      soTaiKhoanNganHang: soTaiKhoanNganHang,
      tenChuTaiKhoanNganHang: tenChuTaiKhoanNganHang,
    },
    config
  );
};
const updateThongTinChuTroKhongCoHinh = (
  idTaiKhoan,
  ten,
  soDienThoai,
  soTaiKhoanNganHang,
  tenChuTaiKhoanNganHang
) => {
  return myAxios.post(
    `api/capnhatthongtinchutrokhonghinh`,
    {
      idTaiKhoan: idTaiKhoan,
      ten: ten,
      soDienThoai: soDienThoai,
      soTaiKhoanNganHang: soTaiKhoanNganHang,
      tenChuTaiKhoanNganHang: tenChuTaiKhoanNganHang,
    },
    config
  );
};

const updatePassWord = (id, matKhaucu, matKhaumoi) => {
  return myAxios.patch(`api/taikhoan/doimatkhau`, {
    id: id,
    matKhaucu: matKhaucu,
    matKhaumoi: matKhaumoi,
  });
};

const getAccountById = (id) => {
  return myAxios.get(`api/taikhoan?id=${id}`);
};

const getTrangThai = (idChuTro) => {
  return myAxios.get(`api/xacthucchutro/chitiet?idChuTro=${idChuTro}`);
};

const guiYeuCauXacThuc= (idChuTro, cccdMatTruoc, cccdMatSau) => {
  return myAxios.post(
    `api/xacthucchutro/create`,
    {
      idChuTro: idChuTro,
      cccdMatTruoc: cccdMatTruoc,
      cccdMatSau: cccdMatSau,
    },
    config
  );
}





export {
  getChuTroById,
  updateThongTinChuTroCoHinh,
  updateThongTinChuTroKhongCoHinh,
  updatePassWord,
  getAccountById,
  getTrangThai,
  guiYeuCauXacThuc
};
