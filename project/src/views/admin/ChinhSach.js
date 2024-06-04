import React, { version } from 'react';
import './styleNghiem.css';
import {  baseURL } from '../../services/my-axios.js';
import { getProfileAdmin } from '../../services/admin/NghiemService.js';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {getChinhSach,capNhatChinhSach } from '../../services/admin/NghiemService.js';
class ChinhSach extends React.Component {
    state ={
        admin:{},
        chinhSach:"",
        text:""
    }
    async componentDidMount(){
        let idTaiKhoan = sessionStorage.getItem("accountId");
        let res = await getProfileAdmin(idTaiKhoan);
        if (res != null) {
            this.setState({
                admin: res
            })
        }
        let resChinhSach = await getChinhSach(1);
        // Vì id của chính sách trung với id của admin
        if (resChinhSach != null) {
            this.setState({
                chinhSach: resChinhSach.noiDungChinhSach,
            })
           
        }
    }  
    async moModal(){
      let modal = document.querySelector(".modal");
      modal.style.display = "block"
      let resChinhSach = await getChinhSach(1);
      if (resChinhSach != null) {
        this.setState({
            text:resChinhSach.noiDungChinhSach
        })
    }
    }
    dongModal(){
      let modal = document.querySelector(".modal");
      modal.style.display = "none"
    }

    kiemTraRong(){
      if(this.state.text===""){
        return false;
      }
      return true;
    }
    thayDoiDuLieu(event){
        this.setState({
          text: event.target.value
        })
    }
    async capNhat(){
      if(this.kiemTraRong()){
        let res = await capNhatChinhSach(1,this.state.text);
        if(res!=null){
          this.setState({
            chinhSach: this.state.text
          })
          toast.success("Cập Nhật Thành Công!")
        }
      }else{
        toast.error("Không Được Để Rỗng!")
      }
    }

    render() {
        let {admin,chinhSach,text} = this.state;
        let isObject = Object.keys(admin).length === 0
        let isObjectChinhSach = Object.keys(chinhSach).length === 0
        return (
            <>
                <div className="main">
                    <main className="content">
                    <div className="manhinhadmin">

                    <img  src={isObject===false?baseURL+admin.hinh:""} className="avt_admin_nghiem"/>
                    <div className="bg_admin">
                    
                    </div>
                    <div className="thongtin_content">
                      <p className="title_admin">Thông Tin Chính Sách</p>
                      <button type="button" className="btn btn-primary bbt btnChinhSua" onClick={()=>this.moModal()}>Chỉnh Sửa</button>
                      <div className="noidung_content">
                      <textarea className="form_chinhsach" value={isObjectChinhSach===false?chinhSach:""}/>
                      </div>
                    </div>
                    <div className="modal">
                        
                        <div className="modal-content">
                              <p className='tieudechinhsach'>Chỉnh Sửa Thông Tin Chính Sách</p>
                              <textarea className="form_edit_chinh_sach" value={text} onChange={(event)=>this.thayDoiDuLieu(event)}>
                              </textarea>
                              <button className='btn btn-primary bbt' onClick={()=>this.capNhat()}>Xác Nhận Thay Đổi</button>
                              <button className='btn btn-danger bbt' onClick={()=>this.dongModal()}>Đóng</button>
                        </div>
                    </div>
                    </div>
                    </main>
                </div>
            </>
        )
    }
}
export default ChinhSach;