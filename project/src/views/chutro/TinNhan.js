import React from 'react';
import { getProfileChuTro,getListTinNhan ,getListNoiDungTinNhan,guiTinNhan,capNhatTinNhanMoiNhat} from '../../services/admin/NghiemService';
import { baseURL } from '../../services/my-axios.js';
import { getDatabase, ref, onValue } from "firebase/database";
class TinNhan extends React.Component {
    state={
        listNguoiNhanTin:[],
        listTinNhan:[],
        chuTro:{},
        doiTuongChat:{},
        tinNhan:"",
        idPhongTinNhan:"",
    }
    setUpLucDau(){
        let btn_send = document.querySelector(".btn_send");
        btn_send.style.display="none";
    }
    setUpHienThiButton(){
        let btn_send = document.querySelector(".btn_send");
        btn_send.style.display="unset";
    }
    thayDoiTinNhan(event){
        this.setState({
            tinNhan:event.target.value
        })
    }
    cuon() {
        let vung_hien_thi_tin_nhan = document.querySelector(".vung_hien_thi_tin_nhan");
        vung_hien_thi_tin_nhan.scrollTop= Number.MAX_SAFE_INTEGER;
    }

    componentDidUpdate(){

        if(this.state.listTinNhan.length!=0){
            this.cuon()
        }
    }
    async componentDidMount(){
        let idTaiKhoan = sessionStorage.getItem("accountId");
         let res = await getProfileChuTro(idTaiKhoan);
        if(res!=null){
            this.setState({
                chuTro: res
            })
        }
        let resTn = await getListTinNhan(idTaiKhoan);
        if(res!=null){
            this.setState({
                listNguoiNhanTin:resTn
            })
        }
        this.setUpLucDau()
        if(this.state.idPhongTinNhan!=""){
            this.realTime(this.state.idPhongTinNhan)
        }
    }


    realTime(idPhongNhanTin){
        const data= getDatabase();
        const starCountRef = ref(data, 'phongTinNhan/'+idPhongNhanTin);
        if(idPhongNhanTin!=null){
            onValue(starCountRef, (snapshot) => {
                this.loadTinNhan(idPhongNhanTin)
                console.log("Có Dữ Liệu Thay Đổi")
                });
        }
        
    }
    async loadTinNhan(idPhong){
        let res = await getListNoiDungTinNhan(idPhong);
        if(res!=null){
            this.setState({
                listTinNhan:res
            })
        }
    }

    async openDoanChat(idPhong){
        let res = await getListNoiDungTinNhan(idPhong);
        if(res!=null){
            this.setState({
                tinNhan:"",
                listTinNhan:res
            })
            this.setUpHienThiButton();
        }
    }
    async openChat(doiTuong,idPhong){
        this.setState({
            doiTuongChat:doiTuong,
            idPhongTinNhan:idPhong
        })
         this.openDoanChat(idPhong)
    }
    kiemTraRong(){
        if(this.state.tinNhan===""){
            return false;
        }
        let chuoi = this.state.tinNhan.trim();
        if(chuoi===""){
            return false;
        }
        return true;
    }
    tstampHienTai(){
        let date = new Date();
        let gio = date.getHours();
        let phut  = date.getMinutes();
        return gio+":"+phut;
    }
    async guiTinNhan(){
        let idTaiKhoanSend = sessionStorage.getItem("accountId");
        let res = await guiTinNhan(this.state.idPhongTinNhan,idTaiKhoanSend,this.state.tinNhan);
        if(res!=null){

            let resmn = await capNhatTinNhanMoiNhat(
                idTaiKhoanSend,
                this.state.idPhongTinNhan,
                this.state.tinNhan,
                this.tstampHienTai()
                )
            if(resmn!=null){
                let listCopy = [...this.state.listTinNhan];
                if(listCopy.length!=0){
                    let tinNhan = {idPhong:this.state.idPhongTinNhan,idTaiKhoan:+idTaiKhoanSend,noiDung:this.state.tinNhan}
                    listCopy[listCopy.length]= tinNhan
                    this.setState({
                        listTinNhan:listCopy,
                        tinNhan:""
                    })
                }
            }
        }
    }

    async setSuKienGuiTinNhanVaCapNhatTinNhanMoiNhat(){
        if(this.kiemTraRong()){
            this.guiTinNhan();
        }
    }

    render() {
        let{listNguoiNhanTin,
            listTinNhan,
            chuTro,
            doiTuongChat,
            tinNhan
        } = this.state;
        let isObject = Object.keys(chuTro).length === 0
        let isObject1 = Object.keys(doiTuongChat).length === 0
        return (
                <>
                <div className="page-heading header-text">
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-12">
                                <h3>Tin Nhắn</h3>
                                <span className="cl"><a href="#">Chủ Trọ: </a>{isObject===false?chuTro.ten:"Chưa Có Dữ Liệu"} </span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className='section'>
                            <div className="row man_hinh_nhan_tin">
                                    {
                                        listNguoiNhanTin.length!==0?
                                        <>
                                        <div className='col-4 list_nguoi_nhan_tin'>
                                    <div className='tieude_tinNhan'>
                                    <h2>Chats</h2>
                                    </div>

                                    {
                                        listNguoiNhanTin && listNguoiNhanTin.length>0&& listNguoiNhanTin.map((item,index)=>{

                                            return(
                                                <div className="card_nhan_tin" key={index} onClick={item.chuTro===null?()=>this.openChat(item.nguoiThue,item.id):()=>this.openChat(item.chuTro,item.id)}>
                                    
                                                        <div className='img_card_nhan_tin col-md-3'>
                                                            <img className='img_avt_nhan_tin' src={ item.chuTro===null?baseURL+item.nguoiThue.hinh:baseURL+item.chuTro.hinh} alt={item.chuTro===null?"Chưa Có Dữ Liệu":baseURL+item.chuTro.hinh}/>
                                                        </div>
                                                        <div className='content_card_nhan_tin col-md-9'>
                                                            <div className='content_top_nhan_tin'>
                                                                <div className='col-md-9 ten_nhan_tin' >
                                                                    {item.chuTro===null?item.nguoiThue.ten:item.chuTro.ten}
                                                                </div>
                                                                <div className='col-md-3 thoi_gian_tin_nhan'>
                                                                   {item.thoiGianCuaTinNhan}
                                                                </div>
                                                            </div>
                                                            <div className='content_bottom_nhan_tin'>
                                                                {item.tinNhanMoiNhat}
                                                            </div>
                                                        </div>
                                                    </div>
                                            )
                                        })

                                    }
                                    
                                

                                </div>
                                
                                        </>:<>
                                        <div className='col-4 list_nguoi_nhan_tin'>
                                    <div className='tieude_tinNhan'>
                                    <h2>Chats</h2>
                                    </div>
                                    <div className="card_nhan_tin">
                                        <h3>
                                        Chưa Có Dữ Liệu
                                        </h3>
                                      

                                    </div>

                                </div>
                                
                                        </>
                                   }
                                   {/* Hiển thị tin nhắn */}
                                   <div className='col-8 hien_thi_tin_nhan'>
                                        <div className='tieu_de_ten_nguoi_nhan'>
                                        <div className='img_doi_phuong'>
                                                <img className='src_avt_doi_phuong' src={isObject1===false?baseURL+doiTuongChat.hinh:"Chưa Có Dữ Liệu"} alt={isObject1===false?baseURL+doiTuongChat.hinh:"Chưa Có Dữ Liệu"}/>
                                        </div>
                                        <div className='ten_doi_phuong'>
                                        {isObject1===false?doiTuongChat.ten:"Chưa Có Dữ Liệu"}
                                        </div>
                                        </div>
                                        <div className='vung_hien_thi_tin_nhan'>
                                            <div className='vung_hien_thi_tin_nhan_child'>

                                            {
                                                listTinNhan.length>0?<>
                                                {
                                                    listTinNhan&&listTinNhan.length>0&&
                                                    listTinNhan.map((item,index)=>{
                                                        return(
                                                            item.idTaiKhoan === chuTro.idTaiKhoan ? <div className='card_view_send' key={index}>
                                                            <div className='card_view_item_send'>{item.noiDung}</div>
                                                            </div>:
                                                            <div className='card_view_receive' key={index}>
                                                            <div className='card_view_item_receive'>{item.noiDung}</div>
                                                             </div>
                                                        )
                                                    })
                                                    
                                                    //     return(
                                                    //         item.idTaiKhoan!=chuTro.idTaiKhoan? 
                                                    //         
                                                    //         :
                                                            

                                                    //     )
                                                    // })
                                                   
                                                }
                                                
                                                
                                                </>:<div>Chưa có tin nhắn!</div>

                                            }
                                            </div>
                                        </div>
                                        <div className='vung_gui_tin_nhan'>
                                            <textarea type="text" className='input_tin_nhan' rows={1} value={tinNhan} placeholder='Nhập tin nhắn...' onChange={(e)=>this.thayDoiTinNhan(e)}/>

                                            <button className='btn_send' onClick={()=>this.setSuKienGuiTinNhanVaCapNhatTinNhanMoiNhat()} >

                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                            </div>

                        </div>
                
                </>
        )
    }
}
export default TinNhan;