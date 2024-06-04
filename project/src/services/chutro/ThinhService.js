import { myAxios } from "../my-axios";

const xoaPhong = (idChuTro, idPhongTro) => {
  return myAxios.delete(`api/phongtrochutro/delete?idChuTro=${idChuTro}&idPhongTro=${idPhongTro}`);
};


export { xoaPhong};

