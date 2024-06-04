import React, { useEffect, useState } from 'react';
import { getAllBannerApi } from '../../services/admin/PhucService';
import { baseURL } from '../../services/my-axios';
export default function ImagesBanner (){
    const[listBanner,setListBanner]= useState([]);
    useEffect(() => {
         fetchData();
    }, []);
    const fetchData = async()=>{
        let res = await getAllBannerApi();
        if(res!=null){
         setListBanner(res);
        }
    }
    const scrollAutoImages = () => {
        let position = 1;
        const time = 5000;
        const imgContainer = document.querySelector('.image-container');
        const listItemImages = document.querySelectorAll('.item-img');
        const itemImage = document.querySelector('.item-img');
        setInterval(() => {
            if (position < listItemImages.length) {
                listItemImages.forEach(element => {
                    element.style.transform = `translateX(-${100 * position}%)`;
                    element.style.transition = 'transform 0.5s ease-in-out';
                });
                position++;
            }
            else {
                position = 0;
                listItemImages.forEach(element => {
                    element.style.transform = `translateX(${100 * position}%)`;
                    element.style.transition = 'transform 0.5s ease-in-out';
                });
            }
        }, time);
    }
    scrollAutoImages();
    return (
        <>
            <div className="image-container">
                    {
                        listBanner&&listBanner.length>0?listBanner.map((item,index)=>{
                            return(
                                <img className="the_img_banner item-img" src={baseURL+item.hinhBanner} alt={baseURL+item.hinhBanner} key={index}/>
                            )
                        })
                        :<>
                        </>
                    }
                </div>
        </>
    );
}