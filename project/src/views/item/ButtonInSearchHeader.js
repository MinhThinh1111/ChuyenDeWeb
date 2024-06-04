import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function ButtonInSearchHeader(props) {
    const onClickItem = () => {
        if (props.onClickButtonIconListener) {
            props.onClickButtonIconListener();
        } else{
            console.log("Bạn chư sử dụng props onClickButtonIconListener ==>> lưu ý hãy sử dụng onClickButtonIconListener để có thể click");
        }
    }
    return (
        <>
            <div className="btn-m" onClick={onClickItem}>
                <div className="btn-icon">
                    <img src={props.imgIcon} />
                </div>
                <p>{props.title}</p>
            </div>
        </>
    )
}