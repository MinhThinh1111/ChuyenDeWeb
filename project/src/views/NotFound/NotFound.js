import React from 'react';
import "./style.css";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
function NotFound() {
  return (
    <div className='notfound'>
      <h1>404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2>Không thể tìm thấy trang này</h2>
        <p>Có thể bạn chưa được cấp quyền để vào trang này</p>
        <Link to="/" className='notfound-a'>ĐI tới trang đăng nhập</Link>
      </div>
    </div>
  );
}

export default NotFound;
