import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBanner } from "../../services/admin/PhucService";
import { toast } from "react-toastify";
import { baseURL } from "../../services/my-axios.js";
import logo from "../../images/logo.png";

const AddBanner = () => {
  let nav = useNavigate();
  const [result, setResult] = useState({});
  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const [checkChooseFile, setCheckChooseFile] = useState(false);

  const ChangeImage = (event) => {
    setCheckChooseFile(true);
    setFile(event.target.files[0]);
    console.log("check file anh:", file);
  };

  const onClickAddBanner = () => {
    if (file.name != null) {
      async function addBannerFromApi() {
        setData(await addBanner(file));
      }
      addBannerFromApi();
      toast.success("Thêm banner thành công");
      nav("/admin/quanlybanner");
    } else {
      toast.error("Chưa chọn file ảnh!!!");
    }
  };
  checkChooseFile == true ? (
    console.log("file: ", file)
  ) : (
    <img src={logo} alt="" />
  );
  return (
    <>
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-3">
                    <h5 className="card-title mb-0">Thêm banner</h5>
                  </div>
                </div>
              </div>
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th className="d-none d-xl-table-cell">Hình</th>
                    <th className="d-none d-md-table-cell">Chức năng</th>
                    <th className="d-none d-md-table-cell">Chinh sua</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="d-none d-xl-table-cell">
                      <img src={baseURL + result.hinhBanner} alt="" />
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
                      <button
                        className="btn btn-info"
                        onClick={onClickAddBanner}
                      >
                        Thêm
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
  );
};

export default AddBanner;
