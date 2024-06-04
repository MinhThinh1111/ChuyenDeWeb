import React from "react";
import { useEffect, useState } from "react";
import { baseURL } from "../../services/my-axios.js";
import { editBanner, getBannerById } from "../../services/admin/PhucService.js";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/logo.png";

const EditBanner = () => {
  let nav = useNavigate();
  let { id } = useParams();
  const [result, setResult] = useState({});
  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const [checkChooseFile, setCheckChooseFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const inputRef = useEffect(() => {
    async function getDataAPI() {
      setResult(await getBannerById(id));
      setLoading(true);
    }
    getDataAPI();
  }, []);

  console.log("check file:", file);
  const ChangeImage = (event) => {
    setCheckChooseFile(true);
    setFile(event.target.files[0]);
    console.log("check file:", file);
  };

  const onClickUpdate = () => {
    if (file.name != null) {
      async function updateData() {
        setData(await editBanner(id, file));
      }

      updateData();
      toast.success("Cập nhật banner thành công");
      nav("/admin/quanlybanner");
    } else {
      toast.error("Chưa chọn file ảnh!!!");
    }
  };

  console.log(loading);
  console.log(result.hinhBanner);

  checkChooseFile == true ? (
    console.log("file: ", file)
  ) : (
    <img src={logo} alt="" />
  );
  return loading == true ? (
    <>
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-3">
                    <h5 className="card-title mb-0">Quản lý chủ trọ</h5>
                  </div>
                </div>
              </div>
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th className="d-none d-xl-table-cell">Hình</th>
                    <th className="d-none d-md-table-cell">Chức năng</th>
                    <th className="d-none d-md-table-cell">Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="d-none d-xl-table-cell">
                      <img
                        className="hinh-banner"
                        src={baseURL + result.hinhBanner}
                        alt=""
                        width="100px"
                        height="100px"
                      />
                    </td>
                    <td className="d-none d-md-table-cell">
                      <div className="mb-3">
                        <input
                          onChange={ChangeImage}
                          type="file"
                          id="hinh"
                          name="hinh"
                          placeholder="Chọn Hình Đại Diện"
                          className="form-control"
                        />
                      </div>
                    </td>
                    <td className="d-none d-md-table-cell">
                      <button className="btn btn-info" onClick={onClickUpdate}>
                        Cập nhật
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <></>
  );
};

export default EditBanner;
