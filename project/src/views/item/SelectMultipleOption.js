import React, { useState } from 'react';
function SelectMultipleOption(props) {
    const { list } = props;
    const { label } = props;
    const { convertName } = props;
    const { convertID } = props;
    const { changeValue } = props;
    const changeSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        changeValue(value);
    }
    return (
        <>
            <label for="floatingSelect">{label}</label>
            <select onChange={changeSelect} className="form-select" multiple aria-label="Multiple select example">
                <option selected>{label}</option>
                {
                    list && list.length > 0 && list.map((item, index) => {
                        return (
                            <option value={convertID ? convertID(item) : item.id}>{convertName ? convertName(item) : "convert value converName={(item)=>item.key}.  Please..."}</option>
                        )
                    })
                }
            </select>
        </>
    )
}
export default SelectMultipleOption;