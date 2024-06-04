import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ButtonInSearchHeader from './ButtonInSearchHeader.js';
import ImagesBanner from './ImagesBanner.js';
import imgGhep from "./imgs/icon_ghep.png";
import imgRandom from "./imgs/icon_random.png";
import imgRecomment from "./imgs/icon_recomment.png";
import imgLike from "./imgs/like.png";
import imgVDRoom from "./imgs/img2.jpg";
import SearchInHeader from './SearchInHeader.js';

export default function HeaderNguoiThue(props) {
    const navigation = useNavigate();

    const onClickSearch = () => {
        navigation("/nguoithue/timkiemboloc")
    }
    const chuyenManHinhGoiY = () => {
        navigation("/nguoithue/danhsachphonggoiy")
    }


    const chuyenQuaManHinhPhongGhep = () => {
        navigation("/nguoithue/danhsachphongghep")
    }
    const chuyenQuanManHinhYeuThich = () => {
        navigation("/nguoithue/danhsachyeuthich")
    }
    const chuyenQuaManHinhPhongNgauNhien = () => {
        navigation("/nguoithue/danhsachphongrandom")
    }

    return (
        <>
            <header>
                <ImagesBanner />
                <div className="container-search">
                    <SearchInHeader
                    city="HCM"
                    content="Bạn cần tìm gì..."
                    onClickSearchListener={onClickSearch}/>


                    <div className="button-form">
                        <ButtonInSearchHeader
                            imgIcon={imgGhep}
                            title="Phòng ghép"
                            onClickButtonIconListener={chuyenQuaManHinhPhongGhep}
                        />
                        <ButtonInSearchHeader
                            imgIcon={imgRecomment}
                            title="Gợi ý"
                            onClickButtonIconListener={chuyenManHinhGoiY}
                        />
                        <ButtonInSearchHeader
                            imgIcon={imgRandom}
                            title="Ngẫu nhiên"
                            onClickButtonIconListener={chuyenQuaManHinhPhongNgauNhien}
                        />
                        <ButtonInSearchHeader
                            imgIcon={imgLike}
                            title="Yêu thích"
                            onClickButtonIconListener ={chuyenQuanManHinhYeuThich}
                        />
                    </div>
                </div>
            </header>

        </>
    )
}