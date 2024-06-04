import React, { useState } from 'react';
function InputFile(props) {
    const [file, setFile] = useState();
   
    const changeText = (e) => {
        setFile(e.target.value);
        props.changeValue(e.target.value);
    }
    return (
        <>
            <div className="input-group mb-3">
                <input type="file" value={file} onChange={changeText} className="form-control" placeholder={props.placeholder} aria-label={props.placeholder} aria-describedby="basic-addon1" />
            </div>
        </>
    )
}
export default InputFile;