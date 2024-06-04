import React from 'react';
import imgDelete from "./imgs/icon_close.png";
export default function Item1(props) {
    const { imgItem } = props;
    const { tenItem } = props;
    const { idItem } = props;
    const onClickItem = () => {
        if (props.onClickItemQuanListener) {
            props?.onClickItemQuanListener(idItem);
        }
    };
    const onClickDeleteItem = () => {
        if (props.onClickDeleteItemListener) {
            props?.onClickDeleteItemListener(idItem);
        }
    };
    return (
        <>
            <div className="col-md-3">
                <div className="item-quan" onClick={onClickItem}>
                    <img className="image-quan" src={imgItem ? imgItem : ""} alt="Overlay Image" />
                    <div className="quan-gradient"></div>
                    {props.onClickDeleteItemListener ?
                        <div className="quan-delete" onClick={onClickDeleteItem}>
                            <img src={imgDelete} />
                        </div>
                        :
                        <></>
                    }
                    <div className="quan-name">{tenItem ? tenItem : ""}</div>
                </div>
            </div>
        </>
    )
}