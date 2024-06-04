import React, { useState, useEffect } from 'react';
function SelectOption(props) {
    const { convertName } = props;
    const { convertID } = props;
    const { label } = props;
    const { list } = props;
    const { changeValue } = props;
    const { defaultId } = props;
    const [text, setText] = useState();
    useEffect(() => {

    }, []);
    const changeText = (e) => {
        setText(e.target.value);
        changeValue(e.target.value);
    }
    return (
        <>
            <div className="form-floating">
                <select value={text} onChange={changeText} className="form-select" aria-label="Default select example">
                    {
                        defaultId ?
                            <></> :
                            <option selected>{label}</option>
                    }
                    {
                        list && list.length > 0 && list.map((item, index) => {
                            return (
                                <>
                                    {
                                        defaultId ?
                                            (convertID ?
                                                (convertID(item) === defaultId ?
                                                    <option seleted value={convertID ? convertID(item) : item.id} >{convertName ? convertName(item) : item.value}</option>
                                                    :
                                                    <option value={convertID ? convertID(item) : item.id}>{convertName ? convertName(item) : item.value}</option>
                                                )
                                                :
                                                (item.id === defaultId ?
                                                    <option selected value={convertID ? convertID(item) : item.id} >{convertName ? convertName(item) : item.value}</option>
                                                    :
                                                    <option value={convertID ? convertID(item) : item.id} >{convertName ? convertName(item) : item.value}</option>
                                                )
                                            )
                                            :
                                            <option value={convertID ? convertID(item) : item.id} >{convertName ? convertName(item) : item.value}</option>
                                    }
                                </>
                            )
                        })
                    }
                </select>
                <label for="floatingSelect">{label}</label>
            </div>
        </>
    )
}
export default SelectOption;