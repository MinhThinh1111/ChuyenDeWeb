import React, { useState } from 'react';
export default function ItemComment(props) {
    const {image} = props;
    const {name} = props;
    const {loaiTaiKhoan} = props;
    const {content} = props;
    return (
        <>
            <div className="item-comment">
                <img className='image-account-comment' src={image} />

                <div className="content-comment">
                    <b className="name-account-comment">{name}</b>
                    <br />
                    <span className='loaiTaiKhoan'>{loaiTaiKhoan}</span>
                    <br/>
                    <span>{content}</span>
                </div>
            </div>
        </>
    )
}
