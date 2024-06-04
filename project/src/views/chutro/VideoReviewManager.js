import React from "react";
import youtube from "../../images/logo_youtube.png";
import thumuc from "../../images/thumuc.png";
import huongdan  from "../../images/huongdan.jpg";
import { layVideoXuong,uploadVideoFile, uploadVideoFileYoutube,deleteVideoReview } from "../../services/admin/NghiemService";
import { baseURL } from "../../services/my-axios";
import { toast,ToastContainer } from "react-toastify";
class VideoReviewManager extends React.Component {

    state={
        idPhong:0,
        loaiVideo:-1,
        linkVideo:"",
        loaiVideoUpload:0,
        fileVideo:null,
        linkVideoYoutube:""
    }
    async componentDidMount(){
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const idPhong = params.get('idPhong');
        if(idPhong!=null){
            let idPhog = +idPhong;
            this.setState({
                idPhong:idPhog
            })
            let res = await layVideoXuong(idPhog);
            if(res!=null){
                this.setState({
                    linkVideo:res.linkVideo,
                    loaiVideo:res.loaiVideo
                })
            }
        }
        let choose_file_video = document.querySelector(".choose_file_video");
        choose_file_video.style.display = `none`;
    }
    onClickFile (){
        let choose_file_video = document.querySelector(".choose_file_video");
        choose_file_video.click();

    }
    onChangeFile(e){
        if(e.target.files[0]!=null){
            let dungLuong =   e.target.files[0].size / 1024 / 1024 ;
            if(dungLuong<2){
                this.setState({
                    loaiVideoUpload:0,
                    fileVideo:e.target.files[0]
                })
            }else{
                this.setState({
                    fileVideo:null
                })
                toast.warning("File Video Dung Lượng Tối Đa 2MB!")
            }
        }
    }
    async onCLickUpdate(){
        if(this.state.loaiVideoUpload===0){
            if(this.state.fileVideo!==null){
                let res = await uploadVideoFile(this.state.idPhong,this.state.loaiVideoUpload,this.state.fileVideo);
                if(res!=null){
                    if(res===1){
                        toast.success("Upload Thành Công!")
                        this.setState({
                            fileVideo:null
                        })
                    }else{
                        toast.error("Upload Xảy Ra Lỗi!")
                    }
                }
            }else{
                toast.warning("Chưa Có Dữ Liệu Upload!")
            }
            
        }else if(this.state.loaiVideoUpload===1){
            if(this.state.linkVideoYoutube!==""){
                let res = await uploadVideoFileYoutube(this.state.idPhong,this.state.loaiVideoUpload,this.state.linkVideoYoutube);
                if(res!=null){
                    if(res===1){
                        toast.success("Upload Thành Công!")
                        this.setState({
                            linkVideoYoutube:"",
                            loaiVideoUpload:0
                        })
                    }else{
                        toast.error("Upload Xảy Ra Lỗi!")
                    }
                }
            }else{
                toast.warning("Chưa Có Dữ Liệu Upload!")
            }
        }
    }
    moModal(){
        let modal = document.querySelector(".modal");
        modal.style.display = "block"
       
      }
    
    dongModal(){
        this.setState({
            linkVideoYoutube:""
        })
        let modal = document.querySelector(".modal");
        modal.style.display = "none"
    }
    xacNhan(){
        let modal = document.querySelector(".modal");
        modal.style.display = "none"
    }
    onChangeLinkVideoYoutube(event){
        this.setState({
            linkVideoYoutube:event.target.value
        })
    }
    onClickXacNhan(){
        if(this.state.linkVideoYoutube.trim()!==""){
            this.setState({
                loaiVideoUpload:1
            })
            this.xacNhan();
            toast.success("Hãy Ấn Cập Nhật!");
        }else{
            this.dongModal();
            toast.warning("Chưa Có Link!");
        }
    }
    async deleteVideo(){
        if(this.state.linkVideo!=="Video_Rong"){
            let res = await deleteVideoReview(this.state.idPhong);
            if(res!=null){
                if(res===1){
                    this.setState({
                        linkVideo:"Video_Rong"
                    })
                    toast.success("Xóa Video Thành Công!")
                }else{
                    toast.error("Xóa Video Thất Bại!");
                }
            }
        }else{
            toast.warning("Không Có Video Để Xóa!")
        }
    }
    render(){
        let {idPhong,loaiVideo,linkVideo,linkVideoYoutube}= this.state
        return(
            <>
                <div className="page-heading header-text">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <h3>Quản Lý Video Review</h3>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="area_video_review container">
                    <div className="area_video_review_left">
                        <div className="video_review">
                            {
                                linkVideo!=="Video_Rong"?
                                <iframe width="100%" height="100%" src={loaiVideo===0?baseURL+linkVideo:"https://www.youtube.com/embed/"+linkVideo} className="if_video"  
                                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                :<div className="chua_co_video">Chưa Có Video</div>

                            }
                                    
                        </div>
                    </div>
                    
                    <div className="area_video_review_right">
                    
                        <div className="title_video_review">
                            Quản lý Video Review 
                        </div>
                        <ToastContainer
                                position="top-right"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                            />
                        <div className="area_edit_video_review">
                            <div className="card_view_video_choose" onClick={()=>this.onClickFile()}>
                                <div className="image_card_view_video_choose" >
                                    <img src={thumuc} className="img_card_view_choose"/>
                                </div>
                                <div className="text_card_view_video_choose">
                                    Up File Video
                                </div>
                            </div>
                            
                            <div className="card_view_video_choose" onClick={()=>this.moModal()}>
                                <div className="image_card_view_video_choose">
                                    <img src={youtube} className="img_card_view_choose"/>
                                </div>
                                <div className="text_card_view_video_choose">
                                    Dùng Video Youtube
                                </div>
                            </div>
                            <div className="card_view_video_choose cap_nhat_card" onClick={()=>this.onCLickUpdate()}>
                                <div className="cap_nhat_card_view_video_choose">
                                    Cập Nhật
                                </div>
                            </div>
                            <div className="card_view_video_choose cap_nhat_card_xoa" onClick={()=>this.deleteVideo()}>
                                <div className="cap_nhat_card_view_video_choose">
                                    Xóa
                                </div>
                            </div>
                            <input accept="video/mp4,video/x-m4v,video/*" type="file" className="choose_file_video" onChange={(e)=>this.onChangeFile(e)}/>
                        </div>
                        
                    </div>
                    <div className="modal">
                        
                        <div className="modal_content_youtube">
                            <div className="content_youtube_left">
                                <img className="img_content_youtube_left" src={huongdan}/>
                            </div>
                            <div className="content_youtube_right">
                                <input placeholder="Thả Link Vào Đây..." className="form-control link_video_youtube" type="text" value={linkVideoYoutube} onChange={(e)=>this.onChangeLinkVideoYoutube(e)}/>
                                
                                <div className="card_view_video_choose cap_nhat_card" onClick={()=>this.onClickXacNhan()}>
                                    <div className="cap_nhat_card_view_video_choose">
                                        Xác Nhận
                                    </div>
                                </div>
                                <div className="huong_dan">
                                    Hướng dẫn
                                </div>
                                <br/>
                                <div className="noi_dung_huong_dan">
                                    * Bước 1: Copy kí tự của video sau 'https://youtu.be/'<br/>* Bước 2: Dán vào ô bên trên.
                                </div>
                                <div className="card_view_video_choose dong_modal" onClick={()=>this.dongModal()}>
                                    Đóng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default VideoReviewManager;