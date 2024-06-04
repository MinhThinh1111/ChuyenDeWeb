import React, { useState } from 'react';
function InputText(props) {
    // const [text, setText] = useState(props.value !== "" ? props.value : "");
    // if (text !== "") {
    //     props.changeValue(text);
    // }
    const changeText = (e) => {
        console.log(">>>> changeText");
        // setText(e.target.value)
        if (props.changeValue){
            props.changeValue(e.target.value);
        }
        
    }
    return (
        <>
            {
                props.newParent ?
                    <input type={props.type} value={props.value} onChange={changeText} className={"form-control " + (props.class ? props.class : "")} placeholder={props.placeholder} aria-label={props.placeholder} aria-describedby="basic-addon1" />
                    :
                    <div className="input-group">
                        {props.label ?
                            <span className="input-group-text" id="basic-addon1">{props.label}</span>
                            : <></>
                        }
                        <input type={props.type} value={props.value} onChange={changeText} className={"form-control " + (props.class ? props.class : "")} placeholder={props.placeholder} aria-label={props.placeholder} aria-describedby="basic-addon1" />
                    </div>
            }
        </>
    )
}
export default InputText;