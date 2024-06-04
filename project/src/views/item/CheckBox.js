import React, { useState } from 'react';
function CheckBox(props) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                {
                    props.list && props.list.length > 0 && props.list.map((item, index) => {
                        return (
                            <>
                                <input type="checkbox" className="btn-check" id={item.id} autocomplete="off" />
                                <label className="btn btn-outline-primary" for={item.id}>{item.ten}</label>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
export default CheckBox;