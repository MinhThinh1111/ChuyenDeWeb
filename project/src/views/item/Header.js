import React from 'react';
import { Link } from 'react-router-dom';
function Header(props) {

    return (
        <>
            <div className="page-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>{props.tenManHinh}</h3>
                            <span className="breadcrumb"><a>Xin chào: </a>{props.tenChuTro} </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;