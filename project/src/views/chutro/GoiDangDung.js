import React from 'react';
import { getGoiCallAPI, guiYeuCauDangKyGoi, xoaGoiDichVuChuTroTheoIDTaiKhoanAPI } from "../../services/admin/DungService"
import { getProfileChuTro, getProfileAdmin } from "../../services/admin/NghiemService.js"
import { getAllGoiDangKyCallAPI } from '../../services/admin/ThinhService';
import { baseURL } from '../../services/my-axios.js';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';


class GoiDangDung extends React.Component {
  state = {
    // Lay thong tin chu tro
    idCT: "",
    idChuTro: "",
    tenCT: "",
    hinh: "",
    goi: 0,
    sdtCT: "",
    STK: "",
    tenTK: "",

    // lay thong tin goi bang cach chuyen vao id goi
    thoihan: "",
    soLuongPhong: "",
    gia: "",

    // list goi nang cap
    listGoiDangKy: [],
    listGoiChuaDangKy: [],


    // thong tin admin
    tenAdmin: "",
    sdt: "",
    stkAdmins: "",
    tenSTKAdmin: "",

    // thong tin goi nang cap
    goiNangCapGia: 0,
    goiNangCapPhong: 0,
    goiNangCapThoiGian: 0,
    idGoiNangCap: 0,

    // hinh anh chuyen khoan
    hinhChuyenKhoan: null,


    // loadding
    Loading: false
  };
  async componentDidMount() {

    this.getThongTin();
  }
  async getThongTin() {
    let idTaiKhoan = sessionStorage.getItem("accountId");

    //thong tin chu tro
    let resChuTro = await getProfileChuTro(idTaiKhoan);
    if (resChuTro != null) {
      this.setState({
        idCT: resChuTro.id,
        ten: resChuTro.ten,
        hinh: resChuTro.hinh,
        goi: resChuTro.idGoi,
        sdtCT: resChuTro.soDienThoai,
        STK: resChuTro.soTaiKhoanNganHang,
        tenTK: resChuTro.tenChuTaiKhoanNganHang,
      })
    }

    //thong tin admin
    let res = await getProfileAdmin(1);
    // console.log(res);
    if (res != null) {
      this.setState({
        tenAdmin: res.ten,
        idChuTro: res.id,
        sdt: res.soDienThoai,
        tenSTk: res.tenChuTaiKhoan,
        stkAdmins: res.soTaiKhoanNganHang,
      })
    }

    // thong tin goi chu tro dang su dung
    let goi = await getGoiCallAPI(this.state.goi);
    if (goi != null) {
      this.setState({
        thoihan: goi.thoiHan,
        soLuongPhong: goi.soLuongPhongToiDa,
        gia: goi.gia,
      })
    }

    // lay tat ca cac goi 
    let allGoi = await getAllGoiDangKyCallAPI();
    if (this.state.goi !== 0) {
      let listGoiCopy = allGoi.filter(item => item.id !== this.state.goi);
      this.setState({
        listGoiDangKy: listGoiCopy,
      })
    } else {
      this.setState({
        listGoiChuaDangKy: allGoi,
        loading: true
      })
    }

  }

  // dong mo giao dien
  moModal() {
    let modal = document.querySelector(".modal1");
    let formG = document.querySelector(".chitietgoidangki");
    modal.style.display = "block"
    formG.style.display = "none"
  }
  dongModal() {
    let modal = document.querySelector(".modal1");
    let formG = document.querySelector(".chitietgoidangki");
    let modal1 = document.querySelector(".modal3");
    let modal5 = document.querySelector(".modal5");


    modal.style.display = "none"
    formG.style.display = "block"
    modal1.style.display = "none"
    modal5.style.display = "none"


  }

  moGiaHanGoi() {
    let modal = document.querySelector(".modal5");
    modal.style.display = "block"
  }



  // nut huy goi
  moHuyGoi() {
    let modal = document.querySelector(".modal_huy");
    let modal1 = document.querySelector(".modal1");

    modal.style.display = "block"
    modal1.style.display = "none"
  }

  dongModalHuyGoi() {
    let modal = document.querySelector(".modal_huy");
    modal.style.display = "none"
  }

  async xacNhanHuyGoi() {
    let modal = document.querySelector(".modal_huy");
    modal.style.display = "none"
    let idTaiKhoan = sessionStorage.getItem("accountId");
    let res = await xoaGoiDichVuChuTroTheoIDTaiKhoanAPI(idTaiKhoan);
    if (res !== null) {
      toast.success("Huỷ gói Thành Công!");
      this.getThongTin()
    } else {
      toast.success("Huỷ gói Thất Bại!!!");
    }
  }

  // man hinh nang cap goi
  moThanhToan(id, gia, phong, thoigian) {
    let modal = document.querySelector(".modal1");
    let modal1 = document.querySelector(".modal3");
    modal.style.display = "none"
    modal1.style.display = "block"
    this.setState({
      goiNangCapGia: gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
      goiNangCapPhong: phong,
      goiNangCapThoiGian: thoigian,

      idGoiNangCap: id
    })
  }

  // nut thanh toan goi
  thayDoiHinh(event) {
    this.setState({
      hinhChuyenKhoan: event.target.files[0]
    })
  }


  async guiThanhToanGoi(idGoi, hinh) {
    if (hinh !== null) {
      let res = await guiYeuCauDangKyGoi(this.state.idChuTro, idGoi, hinh);
      if (res != null) {
        toast.success("Gửi Yêu Cầu Thành Công!");
        this.dongModal();
      }
      else {
        toast.error("Gửi Yêu Cầu Thất Bại!");
      }
    } else {
      toast.error("Không Được Bỏ Trống Ảnh !!!");
    }
  }

  dangkygoi(id, gia, phong, thoigian) {
    let modal1 = document.querySelector(".modal3");
    let modal2 = document.querySelector(".goidangky");


    modal1.style.display = "block"
    modal2.style.display = "none"
    this.setState({
      goiNangCapGia: gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
      goiNangCapPhong: phong,
      goiNangCapThoiGian: thoigian,

      idGoiNangCap: id
    })
  }

  dongModal1() {
    let modal1 = document.querySelector(".modal3");
    let modal2 = document.querySelector(".goidangky");


    modal1.style.display = "none"
    modal2.style.display = "block"
  }

  async guiThanhToanGoidk(idGoi, hinh) {
    if (hinh !== null) {
      let res = await guiYeuCauDangKyGoi(this.state.idChuTro, idGoi, hinh);
      if (res != null) {
        toast.success("Gửi Yêu Cầu Thành Công!");
        this.dongModal1();
      }
      else {
        toast.error("Gửi Yêu Cầu Thất Bại!");
      }
    } else {
      toast.error("Không Được Bỏ Trống Ảnh !!!");
    }
  }

  render() {
    let { thoihan, soLuongPhong, gia } = this.state;
    let { ten, hinh, goi, tenTK, STK, sdtCT } = this.state;
    let { listGoiDangKy, tenAdmin, sdt, stkAdmins, tenSTk } = this.state;
    let { goiNangCapGia, goiNangCapPhong, goiNangCapThoiGian, idGoiNangCap } = this.state;
    let { listGoiChuaDangKy, loading } = this.state;

    return (

      <>
        <div class="page-heading header-text">
          <div class="container">
            <div class="row anime">
              <div class="col-lg-12">
                <h3>Thông Tin Gói Đăng Ký</h3>
                <span class="breadcrumb"><a href="#">Chủ Trọ: </a>{ten} </span>
              </div>
            </div>
          </div>
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
        <div>
          {goi !== 0 ?

            <div class="single-product section">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="left-image">
                      <img src={baseURL + hinh} alt="" />
                    </div>
                  </div>
                  <div class="col-lg-6 align-self-center">
                    <h4 style={{ fontSize: 2.6 + "em" }}>Gói Cho Thuê {soLuongPhong} Phòng / {thoihan} Tháng</h4>

                    <div className='chitietgoidangki'>
                      <h2 className='ten_chu_tro fs-2'>Chủ Trọ: {ten}</h2>
                      <div className='chutro_info fs-2'>Giá Gói: {gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                      <div className='row align-items-start gap-3'>
                        <button className='btn btn-primary col' onClick={() => this.moModal()}>Nâng Cấp Gói</button>
                        <button className='btn btn-success col' onClick={() => this.moGiaHanGoi()}>Gia Hạn Gói</button>
                        <button className='btn btn-danger col' onClick={() => this.moHuyGoi()}>Huỷ Gói</button>
                      </div>
                    </div>
                  </div>


                  {/* giao dien list gói */}

                  <div className="modal1">
                    <div className='modal2 text-end'>
                      <button type="button" class="col align-self-end btn btn-danger" onClick={() => this.dongModal()} aria-label="Close">Cancel</button>
                    </div>
                    <div className="modal-content1">

                      {listGoiDangKy && listGoiDangKy.length > 0 && listGoiDangKy.map((item, index) => {
                        return (
                          <div class="card container">
                            <div className="row">
                              <div class="card-body col-9 text-center fs-2">
                                Gói Cho Thuê {item.soLuongPhongToiDa} Phòng / {item.thoiHan} Tháng
                              </div>
                              <button type="button" class="col-3 btn btn-outline-info fs-2" onClick={() => this.moThanhToan(item.id, item.gia, item.soLuongPhongToiDa, item.thoiHan)}>Đăng Ký</button>
                            </div>
                          </div>
                        )
                      })
                      }
                    </div>

                  </div>

                  {/* giao dien thanh toan goi */}

                  <div className="modal3">
                    <div className='modal4 text-end'>
                      <button type="button" class="col align-self-end btn btn-outline-danger" onClick={() => this.dongModal()} aria-label="Close">Cancel</button>
                    </div>
                    <div className="modal-content2">
                      <div class="container">
                        <div class="row">
                          <div className='chitietgoidangki1 col-md-6 border border-5'>
                            <h2 className='ten_chu_tro'>Chủ Trọ: {ten}</h2>
                            <h2 className='ten_chu_tro'>Thông Tin Gói Hiện Tại</h2>
                            <div className='chutro_info'><b>Id Gói: </b>{goi}</div>
                            <div className='chutro_info'><b>Giá Gói: </b>{gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                            <div className='chutro_info'><b>Thời Gian: </b>{thoihan} Tháng</div>
                            <div className='chutro_info'><b>Phòng: </b>{soLuongPhong} Phòng</div>
                            <div className='chutro_info'><b>Số Điện Thoại:</b> {sdtCT}</div>
                            <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b> {STK}</div>
                            <div className='chutro_info'><b>Tên Chủ Tài Khoản:</b> {tenTK}</div>
                          </div>

                          <div className='chitietgoidangki1 col-md-6 border border-5'>
                            <h2 className='ten_chu_tro'>Admin: {tenAdmin}</h2>
                            <h2 className='ten_chu_tro'>Thông Tin Gói Muốn Thay Đổi</h2>
                            <div className='chutro_info'><b>Id Gói: </b>{idGoiNangCap}</div>
                            <div className='chutro_info'><b>Giá Gói: </b>{goiNangCapGia}</div>
                            <div className='chutro_info'><b>Thời Gian: </b>{goiNangCapThoiGian} Tháng</div>
                            <div className='chutro_info'><b>Phòng: </b>{goiNangCapPhong} Phòng</div>
                            <div className='chutro_info'><b>Số Điện Thoại: </b>{sdt}</div>
                            <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b>{stkAdmins} </div>
                            <div className='chutro_info'><b>Tên Người Thụ Hưởng:</b> {tenSTk}</div>
                          </div>

                          <div class="mb-3 col-12  text-center">
                            <label for="formFile" class="form-label fs-2">Ảnh Chuyển Khoản: </label>
                            <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control" />
                          </div>
                          <button type="button" class="btn btn-primary" onClick={() => this.guiThanhToanGoi(this.state.idGoiNangCap, this.state.hinhChuyenKhoan)}>Gửi Yêu Cầu Đăng Ký Gói</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Model gia han goi */}

                  <div className="modal5">
                    <div className='modal4 text-end'>
                      <button type="button" class="col align-self-end btn btn-outline-danger" onClick={() => this.dongModal()} aria-label="Close">Cancel</button>
                    </div>
                    <div className="modal-content2">
                      <div class="container">
                        <div class="row">
                          <div className='text-center'>
                            <h2>Gia Hạn Gói Hiện Tại</h2>
                          </div>
                          <div className='chitietgoidangki1 col-md-4 border border-5'>
                            <h2 className='ten_chu_tro'>Chủ Trọ: {ten}</h2>
                            <div className='chutro_info'><b>Số Điện Thoại:</b> {sdtCT}</div>
                            <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b> {STK}</div>
                            <div className='chutro_info'><b>Tên Chủ Tài Khoản:</b> {tenTK}</div>
                          </div>

                          <div className='chitietgoidangki1 col-md-4 border border-5'>
                            <h2 className='ten_chu_tro'>Admin: {tenAdmin}</h2>
                            <div className='chutro_info'><b>Số Điện Thoại: </b>{sdt}</div>
                            <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b>{stkAdmins} </div>
                            <div className='chutro_info'><b>Tên Người Thụ Hưởng:</b> {tenSTk}</div>
                          </div>

                          <div className='chitietgoidangki1 col-md-4 border border-5'>
                            <h2 className='ten_chu_tro'>Thông Tin Gói Hiện Tại</h2>
                            <div className='chutro_info'><b>Id Gói: </b>{goi}</div>
                            <div className='chutro_info'><b>Giá Gói: </b>{gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                            <div className='chutro_info'><b>Thời Gian: </b>{thoihan} Tháng</div>
                            <div className='chutro_info'><b>Phòng: </b>{soLuongPhong} Phòng</div>
                          </div>

                          <div class="mb-3 col-12  text-center">
                            <label for="formFile" class="form-label fs-2">Ảnh Chuyển Khoản: </label>
                            <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control" />
                          </div>
                          <button type="button" class="btn btn-primary" onClick={() => this.guiThanhToanGoi(this.state.goi, this.state.hinhChuyenKhoan)}>Gửi Yêu Cầu Đăng Ký Gói</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* model huy goi */}

                  <div className="modal_huy">
                    <div className="modal-content_huy">
                      <h2 className='ten_chu_tro'>Chủ Trọ: {ten}</h2>
                      <h2 className='ten_chu_tro'>Thông Tin Gói Hiện Tại</h2>
                      <div className='chitietgoidangki border border-success p-2 mb-2 border-5'>
                        <h3><div className='chutro_info'><b>Id Gói: </b>{goi}</div>
                          <div className='chutro_info'><b>Giá Gói: </b>{gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                          <div className='chutro_info'><b>Thời Gian: </b>{thoihan} Tháng</div>
                          <div className='chutro_info'><b>Phòng: </b>{soLuongPhong} Phòng</div>
                        </h3>
                      </div>
                      <h3>Bạn Có Chắc Muốn Huỷ Gói Đang Sử Dụng</h3>

                      <Link to="/chutro/goidangdung"><button className='btn bg-info bg-gradient bbt border border-5 border-white' onClick={() => this.xacNhanHuyGoi()}>Xác Nhận</button></Link>
                      <button className='btn btn-danger bbt border border-5 border-white' onClick={() => this.dongModalHuyGoi()}>Đóng</button>
                    </div>
                  </div>

                </div>
              </div>
            </div >

            :
            loading === true ?
              <div class="single-product section">
                <div class="container">
                  <h2 className='text-center border border-5 border-white' style={{ fontSize: 5 + "em" }}>Danh Sách Gói Đăng Kí</h2>
                  <div className='goidangky' >
                    <div class="row trending-box goidangky">
                      <div>
                        {listGoiChuaDangKy && listGoiChuaDangKy.length > 0 && listGoiChuaDangKy.map((item, index) => {
                          return (
                            <div class="col-lg-12 col-md-6 align-self-center mb-30 trending-items col-md-6 ">
                              <div class="item_goidk">
                                <div class="down-content">
                                  <h4>Gói Cho Thuê {item.soLuongPhongToiDa} Phòng {item.thoiHan} Tháng</h4>
                                  <button className='btn btn-primary bbt' onClick={() => this.dangkygoi(item.id, item.gia, item.soLuongPhongToiDa, item.thoiHan)}>Đăng Ký gói</button>
                                </div>
                              </div>

                            </div>

                          )
                        })
                        }
                      </div>
                    </div>
                  </div>


                  <div className='modal3 text-end'>
                    <button type="button" class="col align-self-end btn btn-outline-danger" onClick={() => this.dongModal1()} aria-label="Close">Cancel</button>
                  </div>
                  <div className="modal-content2">
                    <div class="container">
                      <div class="row">
                        <div className='chitietgoidangki1 col-md-6 border border-5'>
                          <h2 className='ten_chu_tro'>Chủ Trọ: {ten}</h2>
                          <h2 className='ten_chu_tro'>Thông tin tài khoản</h2>
                          <div className='chutro_info'><b>Số Điện Thoại:</b> {sdtCT}</div>
                          <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b> {STK}</div>
                          <div className='chutro_info'><b>Tên Chủ Tài Khoản:</b> {tenTK}</div>
                        </div>

                        <div className='chitietgoidangki1 col-md-6 border border-5'>
                          <h2 className='ten_chu_tro'>Admin: {tenAdmin}</h2>
                          <h2 className='ten_chu_tro'>Đăng kí gói</h2>
                          <div className='chutro_info'><b>Id Gói: </b>{idGoiNangCap}</div>
                          <div className='chutro_info'><b>Giá Gói: </b>{goiNangCapGia}</div>
                          <div className='chutro_info'><b>Thời Gian: </b>{goiNangCapThoiGian} Tháng</div>
                          <div className='chutro_info'><b>Phòng: </b>{goiNangCapPhong} Phòng</div>
                          <div className='chutro_info'><b>Số Điện Thoại: </b>{sdt}</div>
                          <div className='chutro_info'><b>Số Tài Khoản Ngân Hàng:</b>{stkAdmins} </div>
                          <div className='chutro_info'><b>Tên Người Thụ Hưởng:</b> {tenSTk}</div>
                        </div>

                        <div class="mb-3 col-12  text-center">
                          <label for="formFile" class="form-label fs-2">Ảnh Chuyển Khoản: </label>
                          <input onChange={(event) => this.thayDoiHinh(event)} type="file" id="hinh" name="hinh" className="form-control" />
                        </div>
                        <button type="button" class="btn btn-primary" onClick={() => this.guiThanhToanGoidk(this.state.idGoiNangCap, this.state.hinhChuyenKhoan)}>Gửi Yêu Cầu Đăng Ký Gói</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : <Loading />
          }
        </div>
      </>
    )
  }
}
export default GoiDangDung;