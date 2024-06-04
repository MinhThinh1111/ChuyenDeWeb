import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getDetailNguoiThue } from "../../services/nguoithue/PhucService";
import { baseURL } from "../../services/my-axios";
const ThongTinNguoiThue = () => {
  const [id, setId] = useState(sessionStorage.getItem("accountId"));
  console.log(id);
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchBanner = async () => {
      setResult(await getDetailNguoiThue(id));
      console.log("Thong tin nguoithue ", result);
    };
    fetchBanner();
  }, []);

  return (
    <>
      <div class="page-heading header-text">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h3>Thông Tin</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="single-product section">
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
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div className="cha-img">
                <img
                  className="con-img"
                  src={baseURL + result.hinh}
                  alt={baseURL + result.hinh}
                />
              </div>
            </div>
            <div class="col-lg-6 align-self-center">
              <div className="ThongTinNguoiThue">
                <div className="chutro_info">
                  <b>Tên: </b>
                  {result.ten}
                </div>

                <div className="chutro_info">
                  <b>Số Điện Thoại: </b>
                  {result.soDienThoai}
                </div>

                <Link
                  className="btn btn-info bbt"
                  to={`/Nguoithue/editthongtinnguoithue`}
                >
                  Chỉnh Sửa
                </Link>
                <Link
                  className="btn btn-warning bbt"
                  to={`/Nguoithue/editpasswordnguoithue`}
                >
                  Đổi mật khẩu
                </Link>

                <Link className="btn btn-danger bbt" to="/nguoithue/dangxuat">
                  Đăng xuất
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongTinNguoiThue;
