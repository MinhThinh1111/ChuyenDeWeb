import React, { useEffect, useState } from "react";
import {
  layDanhSachPhongHoatDong,
  layDanhSachQuan,
} from "../../services/chutro/MinhService";
import { baseURL } from "../../services/my-axios";
import Comment from "../item/Comment";
import HeaderNguoiThue from "../item/HeaderNguoiThue";
import PhongItem2 from "../item/PhongItem2";
import QuanItem from "../item/QuanItem";
import notImage from "./imgs/not_image.jpg";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [listQuan, setListQuan] = useState();
  const [lodingQuan, setLoadingQuan] = useState(false);
  const [listPhong, setListPhong] = useState();
  const [lodingPhong, setLoadingPhong] = useState(false);
  const [idPhong, setIdPhong] = useState(-1);
  const [show, setShow] = useState(false);
  const onCloseComment = () => {
    setShow(false);
  };
  const fetchDataQuan = async () => {
    const res = await layDanhSachQuan();
    if (res) {
      setListQuan(res);
      setLoadingQuan(true);
    }
  };

  const fetchDataPhong = async () => {
    const res = await layDanhSachPhongHoatDong();
    if (res) {
      setListPhong(res);
      setLoadingPhong(true);
    }
  };
  // Đây là function sử lý click quận
  const clickQuan = (idQuan) => {
    navigate(`/nguoithue/danhsachphongtheoquan/${idQuan}`);
  };
  // Đây là function sử lý click phòng
  const clickPhong = (idPhong) => {
    navigate(`/nguoithue/chitietphongtro/${idPhong}`);
  };
  // Đây là function sử lý comment
  const clickComment = (idPhong) => {
    setIdPhong(idPhong);
    setShow(true);
  };

  useEffect(() => {
    fetchDataQuan();
    fetchDataPhong();
  }, []);
  return (
    <>
      <HeaderNguoiThue />
      <div className="main-content-m">
        <div className="container">
          <b className="title-m">Danh sách quận</b>
          <div className="quan-m">
            <div className="row">
              {lodingQuan ? (
                listQuan &&
                listQuan.length >= 0 &&
                listQuan.map((item, index) => {
                  return (
                    <QuanItem
                      idQuan={item.id}
                      imgQuan={`${baseURL}${item.hinh}`}
                      tenQuan={item.tenQuan}
                      onClickItemQuanListener={clickQuan}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <b className="title-m">Danh sách phòng</b>
          <div className="phong-m">
            {lodingPhong ? (
              listPhong &&
              listPhong.length >= 0 &&
              listPhong.map((item, index) => {
                return (
                  <PhongItem2
                    idPhong={item.id}
                    imgPhong={
                      item.hinhAnhPhongTro && item.hinhAnhPhongTro.length > 0
                        ? baseURL + item.hinhAnhPhongTro[0].hinh
                        : `${notImage}`
                    }
                    diaChi={item.diaChiChiTiet}
                    gioiTinh={
                      item.gioiTinh === 0
                        ? "Nam & Nữ"
                        : item.gioiTinh === 1
                        ? "Nam"
                        : "Nữ"
                    }
                    dienTich={item.dienTich}
                    gia={100000}
                    demComment={item.binhLuan}
                    onClickRoomListener={clickPhong}
                    onClickItemCommentListener={clickComment}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Comment idPhong={idPhong} show={show} onHide={onCloseComment} />
    </>
  );
}
