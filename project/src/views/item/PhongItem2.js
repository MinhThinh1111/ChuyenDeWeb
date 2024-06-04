import React from 'react';
import { baseURL } from '../../services/my-axios';
import imgBinhLuan from "./imgs/icon_comment.png";
export default function PhongItem2(props) {
    const { idPhong } = props;
    const { imgPhong } = props;
    const { diaChi } = props;
    const { gioiTinh } = props
    const { dienTich } = props;
    const { demComment } = props;
    const { gia } = props;
    const openComment = () => {
        if (props.onClickItemCommentListener) {
            props.onClickItemCommentListener(idPhong);
        }
    }
    const onClickItemRoom = () => {
        if (props.onClickRoomListener) {
            props.onClickRoomListener(idPhong);
        }
    }
    return (
        <>
            <div className="item-room-m" onClick={onClickItemRoom}>
                <img className="img-room-m" src={imgPhong} alt={imgPhong} />
                <div className="description-item-room-m">
                    {diaChi ?
                        <p className="address-m">{diaChi}</p>
                        :
                        <p className="address-m">Chưa chuyền props diaChi</p>
                    }
                    <div className="row">
                        <div className="col-md-9">
                            {gioiTinh ?
                                <p className="color-text-item-room">Giới tính: {gioiTinh}</p>
                                :
                                <p className="color-text-item-room">Chưa chuyền props gioiTinh</p>
                            }
                            {
                                dienTich ?
                                    <p className="color-text-item-room">Diện tích: {dienTich}m²</p>
                                    :
                                    <p className="color-text-item-room">Chưa chuyền props dienTich</p>
                            }
                            <div className="list-item-button">
                                {/* Chặn sự kiện nhấp chuột lan tới phần tử cha */}
                                <div className="item-button" onClick={(e) => e.stopPropagation()}>
                                    <img className="icon-button" src={imgBinhLuan} alt="" onClick={openComment} />
                                    {
                                        demComment || demComment >= 0 ?
                                            <span>{demComment}</span> :
                                            <span>Chưa chuyền props demComment</span>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            {
                                gia ?
                                    <div className="price-room-m">
                                        {gia > 999999 ? gia / 1000000 : gia} {gia >= 999999 ? "Tr" : "đồng"}
                                    </div>
                                    :
                                    <div className="price-room-m">
                                        Chưa chuyền prop gia
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}