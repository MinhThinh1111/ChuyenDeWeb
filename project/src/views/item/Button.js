import React, {useState} from 'react';
function Button(props) {
    return (
        <>
            <button onClick={props.onClickButton} className="btn btn-primary" type="button">{props.label}</button>
        </>
    )
}
export default Button;