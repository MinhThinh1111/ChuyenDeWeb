import React from "react";
import { baseURL } from "../../services/my-axios";
import {
  deleteBanner,
  getAllBannerApi,
} from "../../services/admin/PhucService";
import { Link } from "react-router-dom";
import AppUpLoad from "./upload";
import "./stylePhuc.css";
import { Button } from "bootstrap";
import { addBanner } from "../../services/admin/PhucService";
import { toast } from "react-toastify";
class QuanLyBanner extends React.Component {
  state = {
    listAllBanner: [],
  };

  async loadData() {
    let res = await getAllBannerApi();
    if (res != null) {
      this.setState({
        listAllBanner: res,
      });
    }
  }

  async componentDidMount() {
    await this.loadData();
  }

  async onClickDeleteBanner(id, item) {
    let res = await deleteBanner(id);
    toast.success("Xóa banner thành công");
    await this.loadData();
  }

  render() {
    let { listAllBanner } = this.state;
    return (
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
                    <div className="col-md-9">
                      <Link to={`/admin/addbanner`} className="btn btn-primary">
                        Thêm
                      </Link>
                    </div>
                  </div>
                </div>
                <table className="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th className="d-none d-xl-table-cell btn-banner">
                        Hình
                      </th>
                      <th className="d-none d-md-table-cell btn-banner">
                        Chức năng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listAllBanner.length == 0 ? (
                      <h3 className="null">Chưa có thông tin</h3>
                    ) : (
                      listAllBanner &&
                      listAllBanner.length > 0 &&
                      listAllBanner.map((item, index) => {
                        return (
                          <tr>
                            <td>#{item.id}</td>
                            <td>
                              <img
                                className="hinh-banner"
                                src={baseURL + item.hinhBanner}
                                alt={baseURL + item.hinhBanner}
                              />
                            </td>

                            <td className="d-none d-md-table-cell">
                              <Link
                                to={`/admin/editbanner/${item.id}`}
                                className="btn btn-info"
                              >
                                Chỉnh sửa
                              </Link>

                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  this.onClickDeleteBanner(item.id, item)
                                }
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default QuanLyBanner;
