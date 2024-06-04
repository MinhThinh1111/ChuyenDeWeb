import React from 'react';
import anhnhatro from '../../images/anhnhatro.jpg';
import { baseURL } from '../../services/my-axios';
import { layDanhSachPhongGoiY,layTongDanhSachGoiY } from '../../services/admin/NghiemService';
import ReactPaginate from 'react-paginate';
import { Link, NavLink } from 'react-router-dom';
import ImagesBanner from '../item/ImagesBanner';
class DanhSachPhongGoiY extends React.Component {
    
    state = {
        tongSoPage:[],
        listRoomGoiY:[],
        numberObjectin1Page:3,
        currentPage:1,
        idAccount:""

    }
    async componentDidMount(){
        let idAccount = sessionStorage.getItem("accountId");
        this.setState({
            idAccount:idAccount
        })
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const pageCr = params.get('page');
        if(pageCr!=null){
            let pageCu = +pageCr
            this.setState({
                currentPage:pageCu
            })
           
            let res = await layDanhSachPhongGoiY(idAccount,pageCu,this.state.numberObjectin1Page);
            if(res!=null){
                this.setState({
                    listRoomGoiY:res
                })
            }
        }else{
            let res = await layDanhSachPhongGoiY(idAccount,this.state.currentPage,this.state.numberObjectin1Page);
            if(res!=null){
                this.setState({
                    listRoomGoiY:res
                })
            }
        }
        let res1 = await layTongDanhSachGoiY(idAccount);
        if(res1!=null){
            let soTrang = res1.length/this.state.numberObjectin1Page;
            let tongSoTrangCopy = [...this.state.tongSoPage];
            if(tongSoTrangCopy.length==0){
                for (let index = 0; index < soTrang; index++) {
                    tongSoTrangCopy[tongSoTrangCopy.length]= index+1;
                }
                this.setState({
                    tongSoPage:tongSoTrangCopy
                })
            }
           
            
            
        }
       
    }
    async onChangeCurrentPage(e){
        let res = await layDanhSachPhongGoiY(this.state.idAccount,+e.target.text,this.state.numberObjectin1Page);
        if(res!=null){
            this.setState({
                listRoomGoiY:res,
                currentPage:+e.target.text
            })
        }
        
    }
   
    render() {
        let {listRoomGoiY,numberObjectin1Page,currentPage,tongSoPage}= this.state;
        return (
                <>
                <header>
                <ImagesBanner/>
                </header>
                    
                    <div className="section container">
                        <div className='danhsachgoiy'>
                            <h3 className='tieuDe'>
                                Gợi Ý
                            </h3>
                            <div className='listgoiy'>
                                {
                                    
                                    listRoomGoiY.length!==0?
                                    listRoomGoiY && listRoomGoiY.length>0 && listRoomGoiY.map((item,index)=>{
                                        if(index<3){
                                            return (
                                            
                                                <div className='card_view_item_goi_y' key={index}>
                                                    <div className='div_card_view_left' >
                                                        <img src={Object.keys(item.hinhAnhPhongTro).length===0?anhnhatro:baseURL+item.hinhAnhPhongTro[0].hinh} className='img_nha_tro_goi_y'/>
                                                    </div>
                                                    <div className='div_card_view_right'>
                                                        <div className='ten_phong_goi_y'>
                                                            Phòng {item.diaChiChiTiet}
                                                        </div>
                                                        <div className='infor_card_view_phong_goi_y'>
                                                            <div className='infor_card_view_phong_goi_y_left'>
                                                                <div className='gioitinh_dientich' >
                                                                    <div className='gioitinh_dientich_left'>
                                                                        <div className='gioitinh_dientich_left_1'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path  d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                                                                        </div>
                                                                        <div className='gioitinh_dientich_left_2'>{item.gioiTinh===0?"Nam & Nữ":(item.gioiTinh===1?"Nam":"Nữ")}</div>
                                                                    </div>
                                                                    <div className='gioitinh_dientich_right'>
                                                                    <div className='gioitinh_dientich_left_1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z"/></svg>  </div>
                                                                        <div className='gioitinh_dientich_left_2'>{item.dienTich}m²</div>
                                                                    </div>
                                                                </div>
                                                                <div className='gioitinh_dientich' >
                                                                    <div className='gioitinh_dientich_left'>
                                                                        <div className='gioitinh_dientich_left_1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                                                                                </svg> </div>
                                                                        <div className='gioitinh_dientich_left_2'>{item.soLuongToiDa} Người</div>
                                                                    </div>
                                                                </div>
                                                                <div className='gioitinh_dientich' >
                                                                    <div className='gioitinh_dientich_left'>
                                                                        <div className='gioitinh_dientich_left_1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                                        </svg></div>
                                                                        <div className='gioitinh_dientich_left_2'>{item.diaChiChiTiet}</div>
                                                                    </div>
                                                                </div>
                                                                <div className='gioitinh_dientich' >
                                                                    <div className='gioitinh_dientich_left'>
                                                                    <div className='gioitinh_dientich_left_1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                                                                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                                                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                                                                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                                                    </svg></div>
                                                                        <div className='gioitinh_dientich_left_2_2'>{item.gia} VND /1 phòng</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='infor_card_view_phong_goi_y_right'>
                                                                <NavLink to={`/nguoithue/chitietphongtro/${item.id}`}>
                                                                <span className='xem_chi_tiet'>Xem</span>
                                                                </NavLink>
                                                                
                                                            </div>
                                                            

                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            
                                        )
                                        }
                                    
                                       
                                        
                                    })
                                    :<> Hay Xem Thu Phong Bat Ki Nao Do!</>

                                }
                                
                                
                            </div>
                            
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        
                            {
                                tongSoPage.length!=0?
                                tongSoPage && tongSoPage.length>0&&tongSoPage.map((item,index)=>{
                                    return (
                                        <li  className={this.state.currentPage==index+1?"page-item active":"page-item"} key={index+1}><Link className="page-link" to={`?page=${index+1}`} onClick={(e)=>this.onChangeCurrentPage(e)}>{index+1}</Link></li>
                                    )
                                })
                                :<>
                                <li className="page-item" ><Link className="page-link" >1</Link></li>
                                </>
                                
                            }
                    </ul>
                    </nav>
                </>
        )
    }
}
export default DanhSachPhongGoiY;