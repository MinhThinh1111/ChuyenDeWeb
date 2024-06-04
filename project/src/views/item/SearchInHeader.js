import React from 'react';

export default function SearchInHeader(props) {
    const {city, content} = props;
    const onClickSearch = ()=>{
        if (props.onClickSearchListener){
            props.onClickSearchListener();
        }
    }
    return (
        <>
            <div className="search">
                <div className="search-form" onClick={onClickSearch}>
                    <div className="search-city">{city}</div>
                    <div className="search-content">{content}</div>
                </div>
            </div>
        </>
    )
}