import React from 'react';
import Navigation from './Navigation.js';
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NotFound from "../NotFound/NotFound.js";
import QuanLyChuTro from './QuanLyChuTro.js';
import QuanLyGoiDangKy from './QuanLyGoiDangKy.js';
import QuanLyYeuCauXacNhanChuTro from './QuanLyYeuCauXacNhanChuTro.js';
import QuanLyKhuVuc from './QuanLyKhuVuc.js';
import ThongTinTaiKhoan from './ThongTinTaiKhoan.js';
import QuanLyYeuCauXacNhanGoi from './QuanLyYeuCauXacNhanGoi.js';
import QuanLyBanner from './QuanLyBanner.js';
import QuanLyTienIch from './QuanLyTienIch.js';
import ListPhuong from './ListPhuong.js';
import ThemTienIch from './ThemTienIch.js';
import SuaTienIch from './SuaTienIch.js';
import AddKhuVuc from './AddKhuVuc.js';
import EditPasswordAdmin from './EditPasswordAdmin.js';
import EditProfileAdmin from './EditProfileAdmin.js';
import EditBanner from './EditBanner.js';
import { ToastContainer, toast } from "react-toastify";
import DetailDichVu from './DetailDichVu.js';
import EditDichVu from './EditDichVu.js';
import AddDichvu from './AddDichVu.js';
import DetailChuTro from './DetailChuTro.js';
import "react-toastify/dist/ReactToastify.css";
import XemThongTinChiTietYeuCauXacNhanChuTro from './XemThongTinChiTietYeuCauXacNhanChuTro.js';
import ChinhSach from './ChinhSach.js';
import ThemPhuong from './ThemPhuong.js';
import EditQuan from './EditQuan.js';
import EditPhuong from './EditPhuong.js';
import AddBanner from './AddBanner.js';
import ChiTietYeuCauDangKyGoi from './ChiTietYeuCauDangKyGoi.js';
import DangXuat from './DangXuat.js';

function Admin() {
  console.log(sessionStorage.getItem('accountId'));
  return (
    sessionStorage.getItem('accountType') == 2 ?
      <>
        <div className="wrapper">
          <Navigation />

          <div className="main">

            <main className="content">
              <Routes>
                <Route path='*' element={<QuanLyChuTro />}></Route>
                <Route path="/quanlychutro" exact element={<QuanLyChuTro />}>
                </Route>
                <Route path="/quanlygoidangky" element={<QuanLyGoiDangKy />}>
                </Route>
                <Route path="/quanlytienich" element={<QuanLyTienIch />}>
                </Route>
                <Route path="/ThemTienIch" element={<ThemTienIch />}>
                </Route>
                <Route path="/SuaTienIch" element={<SuaTienIch />}>
                </Route>

                <Route path="/xacthucchutro" element={<QuanLyYeuCauXacNhanChuTro />}>
                </Route>
                <Route path="/xacthucgoidangky" element={<QuanLyYeuCauXacNhanGoi />}>
                </Route>

                <Route path="/quanlykhuvuc" element={<QuanLyKhuVuc />}>
                </Route>
                <Route path="/addKhuVuc" element={<AddKhuVuc />}>
                </Route>
                <Route path="/listPhuong" element={<ListPhuong />}>
                </Route>
                <Route path="/themPhuong" element={<ThemPhuong />}>
                </Route>
                <Route path="/editquan" element={<EditQuan />}>
                </Route>
                <Route path="/editphuong" element={<EditPhuong />}>
                </Route>

                <Route path="/quanlybanner" element={<QuanLyBanner />}>
                </Route>
                <Route path="/thongtintaikhoan" element={<ThongTinTaiKhoan />}>
                </Route>

                <Route path="/editpassword" element={<EditPasswordAdmin />}>
                </Route>
                <Route path="/editprofileadmin" element={<EditProfileAdmin />}>
                </Route>
                <Route path="/editbanner/:id" element={<EditBanner />}>
                </Route>
                <Route path="/chiTietDichVu" element={<DetailDichVu />}>
                </Route>
                <Route path="/suaDichVu" element={<EditDichVu />}>
                </Route>
                <Route path="/themDichVu" element={<AddDichvu />}>
                </Route>
                <Route path="/chiTietChuTro" element={<DetailChuTro />}>
                </Route>
                <Route path="/chitietyeucauxacthucchutro" element={<XemThongTinChiTietYeuCauXacNhanChuTro />}>
                </Route>
                <Route path="/chitietyeucaudangkygoi" element={<ChiTietYeuCauDangKyGoi />}>
                </Route>
                <Route path="/chinhsach" element={<ChinhSach />}>
                </Route>
                <Route path="/addbanner" element={<AddBanner />}>
                </Route>
                <Route path="/dangxuat" element={<DangXuat />}>
                </Route>
              </Routes>

            </main>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </>
      : <NotFound />
  );
}

export default Admin;
