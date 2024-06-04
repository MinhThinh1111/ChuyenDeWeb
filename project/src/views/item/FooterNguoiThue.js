import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfileAdmin } from '../../services/admin/NghiemService';
function FooterNguoiThue(props) {
    const [profile,setProfile]= useState({});

    useEffect(() => {
        fetchDataPhong();
    }, []);
    const fetchDataPhong = async () => {
       let res = await getProfileAdmin(1);
       if(res!=null){
        setProfile(res);
       }
    };
    const {title,name, phoneNumber, email} = props;
    return (
        <>
            <footer>
                <div className="container">
                    <div className="col-lg-12">
                        {
                            profile!==null?<>
                             <p className='ft_nt'>Web: 3T Tìm Tốt</p>
                             <p className='ft_nt'>Liên Hệ: {profile.soDienThoai}</p>
                            </>:
                            <>
                            <p className='ft_nt'>Chưa Có Dữ Liệu!</p>
                            </>
                        }
                    </div>
                </div>
            </footer>
        </>
    )
}
export default FooterNguoiThue;