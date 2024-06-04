import React from 'react';
export default function QuanItem(props) {
    const {imgQuan} = props;
    const {tenQuan} = props;
    const {idQuan} = props;
    const onClickQuan = () => {
        props?.onClickItemQuanListener(idQuan);
    };
    return (
        <>
            <div className="col-md-3">
                <div className="item-quan" onClick={onClickQuan}>
                    <img className="image-quan" src={imgQuan? imgQuan: ""} alt="Overlay Image" />
                    <div className="quan-gradient"></div>
                    <div className="quan-name">{tenQuan? tenQuan:""}</div>
                </div>
            </div>
        </>
    )
}