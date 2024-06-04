import React from "react";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import NotFound from "../NotFound/NotFound.js";
import Navigation from "./Navigation.js";
import ThongBao from "../NguoiThue/ThongBao.js";
import ThongBaoDetail from "./ThongBaoDetail.js";
import TinNhanRealTime from "./TinNhanRealTime.js";
import DanhSachPhongGoiY from "./DanhSachPhongGoiY.js";
import Home from "./Home.js";
import "./styles/nguoithue.css";
import FooterNguoiThue from "../item/FooterNguoiThue.js";
import PhongCuaToi from "./PhongCuaToi.js";
import DangXuat from "./DangXuat.js";
import ChiTietPhongTro from "./ChiTietPhongTro.js";
import ThongTinNguoiThue from "./ThongTin.js";
import EditThongTinNguoiThue from "./EditThongTinNguoiThue.js";
import EditPassWordNguoiThue from "./EditPassWordNguoiThue.js";
import DanhSachPhongTheoQuan from "./DanhSachPhongTheoQuan.js";
import DanhSachPhongGhep from "./DanhSachPhongGhep.js";
import DanhSachYeuThich from "./DanhSachYeuThich.js";
import DanhSachPhongRandom from "./DanhSachPhongRandom.js";
import TimKiemTheoBoLoc from "./TimKiemTheoBoLoc.js";

function NguoiThue() {
  console.log(sessionStorage.getItem("accountId"));
  return sessionStorage.getItem("accountType") == 0 ? (
    <>
      <div className="wts">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/trang-chu" element={<Home />}></Route>
          <Route path="/phong-cua-toi" element={<PhongCuaToi />}></Route>
          <Route path="/thongbao" element={<ThongBao />}></Route>
          <Route path="/thongbaodetail" element={<ThongBaoDetail />}></Route>
          <Route path="/tinnhan" element={<TinNhanRealTime />}></Route>
          <Route
            path="/danhsachphonggoiy"
            element={<DanhSachPhongGoiY />}
          ></Route>

          <Route path="/thongtin" element={<ThongTinNguoiThue />}></Route>
          <Route path="/dangxuat" element={<DangXuat />}></Route>
          <Route
            path="/chitietphongtro/:idPhong"
            element={<ChiTietPhongTro />}
          ></Route>
          <Route
            path="/editthongtinnguoithue"
            element={<EditThongTinNguoiThue />}
          ></Route>
          <Route
            path="/editpasswordnguoithue"
            element={<EditPassWordNguoiThue />}
          ></Route>
          <Route
            path="/danhsachphongtheoquan/:idQuan"
            element={<DanhSachPhongTheoQuan />}
          ></Route>
          <Route
            path="/danhsachphongtheoquan/:idQuan"
            element={<DanhSachPhongTheoQuan />}
          ></Route>
          <Route
            path="/danhsachphongghep"
            element={<DanhSachPhongGhep />}></Route>
          <Route
            path="/danhsachphongrandom"
            element={<DanhSachPhongRandom />}></Route>
          <Route
            path="/danhsachyeuthich"
            element={<DanhSachYeuThich />}></Route>
          <Route
            path="/timkiemboloc"
            element={<TimKiemTheoBoLoc />}></Route>
        </Routes>
        <FooterNguoiThue />
      </div>
    </>
  ) : (
    <NotFound />
  );
}

export default NguoiThue;
