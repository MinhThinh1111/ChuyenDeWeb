import React, { useState } from 'react';
import Item1 from './Item1';
function InputMultipleFile(props) {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        // Get selected files from the input element
        const files = Array.from(e.target.files);
        setSelectedImages(files);
        props.onChangeFile(files);
    };
    return (
        <>
            <div className="mb-3">
                <label for="formFile" className="form-label">{props.label}</label>
                <input className="form-control" type="file" id="formFile" multiple onChange={handleImageChange} />
            </div>
            {/* <div className='row'>

                {selectedImages.map((image, index) => (
                    <div className="col-md-3">
                        <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div> */}
            <b>Hình mới chọn</b>
            <div className="quan-m">
                <div className="row">
                    {
                        selectedImages.map((image, index) =>  {
                            return (
                                <Item1
                                    // idItem={item.id}
                                    imgItem={URL.createObjectURL(image)}
                                    // tenItem={item.ten}
                                    // onClickItemQuanListener={clickQuan}
                                    // onClickDeleteItemListener={onClickDeleteImage}
                                />
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}
export default InputMultipleFile;