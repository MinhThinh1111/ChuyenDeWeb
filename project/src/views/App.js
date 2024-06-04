import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginRegister from './loginregister/FormLR.js';
import CodeForgot from './loginregister/CodeForgot.js';
import ForgotPassword from './loginregister/ForgotPassword.js';
import Admin from './admin/Admin.js';
import ChuTro from './chutro/ChuTro.js';
import NguoiThue from './NguoiThue/NguoiThue.js';
import DangKiTaiKhoanChuTro from './loginregister/DangKiTaiKhoanChuTro.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from '../firebase/firebase.js';
import { getDatabase, ref, onValue } from "firebase/database";
import ChonLoaiTaiKhoan from './loginregister/ChonLoaiTaiKhoan.js';
import DangKiTaiKhoanNguoiThue from './loginregister/DangKiTaiKhoanNguoiThue.js';
function App() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const db = getDatabase();
    const starCountRef = ref(db, 'login');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };
  useEffect(() => {

    fetchData();

  }, []);

  return (
    <>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LoginRegister />}>
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}>
        </Route>
        <Route path="/codeforgot" element={<CodeForgot />}>
        </Route>
        <Route path="/dangkitaikhoanchutro" element={<DangKiTaiKhoanChuTro />}>
        </Route>
          <Route path="/chonloaitaikhoan" element={<ChonLoaiTaiKhoan />}>
        </Route>
        <Route path="/dangkitaikhoannguoithue" element={<DangKiTaiKhoanNguoiThue />}>
        </Route>
        <Route path="/admin/*" element={<Admin />}>
        </Route>
        <Route path="/chutro/*" element={<ChuTro />}>
        </Route>
        <Route path="/nguoithue/*" element={<NguoiThue />}>
        </Route>
      </Routes>

    </BrowserRouter>
   
  </>
  );
}

export default App;