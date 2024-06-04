import {myAxios} from "../my-axios";
const getProfileAdmin = (id) => {
    return myAxios.get(`api/thongtinadmin?id=${id}`);
}
const getAccountById =(id)=>{
    return myAxios.get(`api/taikhoan?id=${id}`)
}
const updatePassword =(id,mk)=>{
    return myAxios.patch(`api/doimatkhautaikhoan?id=${id}&matkhaumoi=${mk}`)
}
const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
const updateProfileAdmin1 = (id, ten, soDienThoai,soTaiKhoanNganHang,tenChuTaiKhoan,hinh)=>{
    return myAxios.post(`api/capnhatthongtinadmin`,{id:id,ten:ten,soDienThoai:soDienThoai,soTaiKhoanNganHang:soTaiKhoanNganHang,tenChuTaiKhoan:tenChuTaiKhoan,hinh:hinh},config);
}
const updateProfileAdmin2 = (id, ten, soDienThoai,soTaiKhoanNganHang,tenChuTaiKhoan)=>{
    return myAxios.post(`api/capnhatthongtinadmin2`,{id:id,ten:ten,soDienThoai:soDienThoai,soTaiKhoanNganHang:soTaiKhoanNganHang,tenChuTaiKhoan:tenChuTaiKhoan});
}
const getChinhSach =(id)=>{
    return myAxios.get(`api/chinhsach?id=${id}`)
}
const capNhatChinhSach=(id,noiDungChinhSach)=>{
    return myAxios.post(`api/capnhatchinhsach2`,{id:id,noiDungChinhSach:noiDungChinhSach})
}
const getProfileChuTro = (idTaiKhoan) =>{
    return myAxios.get(`api/chutro/thongtinchitiet?idTaiKhoan=${idTaiKhoan}`);
}
const getProfileNguoiThue = (idTaiKhoan) =>{
    return myAxios.get(`api/nguoithue/thongtinchitiet?idTaiKhoan=${idTaiKhoan}`);
}
const getListTinNhan = (idTaiKhoan)=>{
    return myAxios.get(`api/danhsachtinnhantheoidtaikhoan?idTaiKhoan=${idTaiKhoan}`);
}
const getListNoiDungTinNhan = (idPhong)=>{
    return myAxios.get(`api/danhsachtinnhan?idPhong=${idPhong}`);
}

const dangKiTaiKhoanChuTro=(ten, tenTaiKhoan, matKhau, email)=>{
    return myAxios.post(`api/taotaikhoanchutro`,{ten:ten,tenTaiKhoan:tenTaiKhoan,matKhau:matKhau,email:email});
}
const dangKiTaiKhoanNguoiThue=(ten, tenTaiKhoan, matKhau, email,gioiTinh)=>{
    return myAxios.post(`api/taotaikhoannguoithue`,{ten:ten,tenTaiKhoan:tenTaiKhoan,matKhau:matKhau,email:email,gioiTinh:gioiTinh});
}
const layTatCataiKhoan = ()=>{
    return myAxios.get(`api/tatcataikhoan`);
}
const guiTinNhan =(idPhong,idTaiKhoan,noiDung)=>{
    return myAxios.post(`api/guitinnhan`,{idPhong:idPhong,idTaiKhoan:idTaiKhoan,noiDung:noiDung});
}
const capNhatTinNhanMoiNhat = (idTaiKhoan,idPhong,tinNhanMoiNhat,thoiGian)=>{
    return myAxios.post(`api/capnhattinnhanmoinhat`,{idTaiKhoan:idTaiKhoan,id:idPhong,tinNhanMoiNhat:tinNhanMoiNhat,thoiGian:thoiGian});
}
const getProfileReceiver = (idTaiKhoan)=>{
    return myAxios.get(`api/profilereceiver?idTaiKhoan=${idTaiKhoan}`);
}
const taoPhongTinNhan = (idTaiKhoan1, idTaiKhoan2)=>{
    return myAxios.post(`api/taophongtinnhan`,{idTaiKhoan1:idTaiKhoan1,idTaiKhoan2:idTaiKhoan2});
}
const layIdPhongTinNhan = (idTaiKhoan1, idTaiKhoan2)=>{
    return myAxios.get(`api/phongtinnhan?idTaiKhoan1=${idTaiKhoan1}&idTaiKhoan2=${idTaiKhoan2}`);
}
const layDanhSachPhongGoiY = (idTaiKhoan,pageNumber,numberObjectinPage)=>{
    return myAxios.get(`api/nguoithue/danhsachphonggoiy2?idTaiKhoan=${idTaiKhoan}&pageNumber=${pageNumber}&numberObjectinPage=${numberObjectinPage}`);
}
const layTongDanhSachGoiY = (idTaiKhoan)=>{
    return myAxios.get(`api/nguoithue/danhsachphonggoiy?idTaiKhoan=${idTaiKhoan}`);
}
const layVideoXuong = (idPhong)=>{
    return myAxios.get(`api/getvideoreview?idPhong=${idPhong}`);

}
const uploadVideoFile=(idPhong,loaiVideo,fileVideo)=>{
    return myAxios.post(`api/uploadvideoreview`,{idPhong:idPhong,loaiVideo:loaiVideo,file:fileVideo},config);
}
const uploadVideoFileYoutube=(idPhong,loaiVideo,linkVideo)=>{
    return myAxios.post(`api/uploadvideoreviewyoutube`,{idPhong:idPhong,loaiVideo:loaiVideo,linkVideo:linkVideo});
}
const deleteVideoReview = (idPhong)=>{
    return myAxios.post(`api/deletevideoreview`,{idPhong:idPhong});
}
// export { multiple };
export {getProfileAdmin,getAccountById,updatePassword,updateProfileAdmin2,updateProfileAdmin1,getChinhSach,capNhatChinhSach,getProfileChuTro,getListTinNhan,
    getListNoiDungTinNhan,dangKiTaiKhoanChuTro,layTatCataiKhoan,
    guiTinNhan,capNhatTinNhanMoiNhat, getProfileReceiver,taoPhongTinNhan,layIdPhongTinNhan,
dangKiTaiKhoanNguoiThue,getProfileNguoiThue,layDanhSachPhongGoiY,layTongDanhSachGoiY,layVideoXuong,
uploadVideoFile,uploadVideoFileYoutube,deleteVideoReview};