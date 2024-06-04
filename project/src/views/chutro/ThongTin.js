import React, { useEffect, useState } from "react";
import avt from "../../images/avt1.jpg";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../services/my-axios";
import { ToastContainer, toast } from "react-toastify";
import "./editthongtinchutro.css";
import { getDetailChuTro } from "../../services/admin/PhucService";
const ThongTin = () => {
  let { idTaiKhoan } = useParams();
  const [id, setId] = useState(sessionStorage.getItem("accountId"));
  console.log(id);
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchBanner = async () => {
      setResult(await getDetailChuTro(id));
      console.log(result);
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
              <span class="breadcrumb">
                <a href="#">Chủ Trọ: </a>
                {result.ten}
              </span>
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
                <img className="con-img" src={baseURL + result.hinh} alt={baseURL + result.hinh} />
              </div>
            </div>
            <div class="col-lg-6 align-self-center">
              <div className="thongtinchutro">
                <h2 className="ten_chu_tro">{result.ten}</h2>
                <div className="chutro_info">
                  <b>Trạng Thái: </b>{" "}
                  {result.xacThuc == 1 ? (
                    <span class="fw-normal txt_green">Đã xác thực</span>
                  ) : (
                    <span class="fw-normal txt_red">Chưa xác thực</span>
                  )}
                </div>
                <div className="chutro_info">
                  <b>Số Điện Thoại: </b>
                  {result.soDienThoai}
                </div>
                <div className="chutro_info">
                  <b>Số Tài Khoản:</b> {result.soTaiKhoanNganHang}
                </div>
                <div className="chutro_info">
                  <b>Số Tài Khoản Ngân Hàng:</b> {result.tenChuTaiKhoanNganHang}
                </div>

                <Link
                  className="btn btn-info bbt"
                  to={`/chutro/editthongtinchutro/${result.id}`}
                >
                  Chỉnh Sửa
                </Link>
                <Link
                  className="btn btn-warning bbt"
                  to={`/chutro/editpasswordchutro`}
                >
                  Đổi mật khẩu
                </Link>
                <Link
                  className="btn btn-success bbt"
                  to={`/chutro/xacthucchutro/${result.id}`}
                >
                  Xác Thực
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongTin;
