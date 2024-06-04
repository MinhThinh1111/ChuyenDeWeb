import React from 'react';
import { getProfileNguoiThue, getProfileReceiver, getListTinNhan, taoPhongTinNhan, layIdPhongTinNhan, getListNoiDungTinNhan, guiTinNhan, capNhatTinNhanMoiNhat } from '../../services/admin/NghiemService.js';
import { baseURL } from '../../services/my-axios.js';
import { getDatabase, ref, onValue, set } from "firebase/database";
import Footer from '../item/Footer.js';
import ImagesBanner from '../item/ImagesBanner.js';
class TinNhanRealTime extends React.Component {
    state = {
        listUser: [],
        listMessage: [],
        sender: {},
        receiver: {},
        message: "",
        idRoomMessage: "",
    }
    // Giữ Lại Ban Đầu
    setUpLucDau() {
        let btn_send = document.querySelector(".btn_send");
        btn_send.style.display = "none";
    }
    setUpHienThiButton() {
        let btn_send = document.querySelector(".btn_send");
        btn_send.style.display = "unset";
    }
    onChangeMessage(event) {
        this.setState({
            message: event.target.value
        })
    }
    cuon() {
        let vung_hien_thi_tin_nhan = document.querySelector(".vung_hien_thi_tin_nhan");
        vung_hien_thi_tin_nhan.scrollTop = Number.MAX_SAFE_INTEGER;
    }
    componentDidUpdate() {
        if (this.state.listMessage.length != 0) {
            this.cuon()
        }
    }
    // Giữ Lại Ban Đầu
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const idReceiver = params.get('id');
        let idAccount = sessionStorage.getItem("accountId");
        let typeAccount = sessionStorage.getItem("accountType");
        // Trang Người Thuê Nên Load Thông Tin Của Người Thuê
        if (+typeAccount === 0) {
            let res = await getProfileNguoiThue(idAccount);
            if (res != null) {
                this.setState({
                    sender: res
                })
            }
        }
        if (idReceiver != null) {
            let res = await getProfileReceiver(idReceiver);
            if (res != null) {
                this.setState({
                    receiver: res
                })
            }
        }
        let isObject = Object.keys(this.state.receiver).length === 0
        if (isObject === false) {
            let resPhong = await layIdPhongTinNhan(this.state.sender.idTaiKhoan, this.state.receiver.idTaiKhoan);
            if (resPhong != null) {
                if (resPhong == -1) {
                    let result = await taoPhongTinNhan(this.state.sender.idTaiKhoan, this.state.receiver.idTaiKhoan);
                    if (result != null) {
                        this.setState({
                            idRoomMessage: result.id
                        })
                    }
                } else {
                    let res = await getListNoiDungTinNhan(resPhong);
                    if (res != null) {
                        this.setState({
                            listMessage: res,
                            idRoomMessage: resPhong
                        })
                    }
                }
            }
            this.setUpHienThiButton()
        } else {
            this.setUpLucDau()
        }
        // Ở đây else sẽ là người thuê
        
        let resTn = await getListTinNhan(idAccount);
        if (resTn != null) {
            this.setState({
                listUser: resTn
            })
        }

        this.realTime(idAccount)
    }

    broadcastRoomMessage(idRoomMessage, message, idObject) {
        const db = getDatabase();
        set(ref(db, 'phongTinNhan/' + idRoomMessage),
            message
        );
        set(ref(db, 'thongBaoReset/' + idObject),
            message
        );
        this.loadListUser(this.state.sender.idTaiKhoan)
    }

    realTime(idAccount) {
        const data = getDatabase();
        if (idAccount != "") {
            const starCountRef = ref(data, 'thongBaoReset/' + idAccount);
            onValue(starCountRef, (snapshot) => {

                this.loadListUser(idAccount)
            });
        }

        if (this.state.idRoomMessage != "") {
            const starCountRef = ref(data, 'phongTinNhan/' + this.state.idRoomMessage);
            onValue(starCountRef, (snapshot) => {

                this.loadTinNhan(+this.state.idRoomMessage);
            });
        }
    }
    async loadListUser(idAccount) {
        let resTn = await getListTinNhan(idAccount);
        if (resTn != null) {
            this.setState({
                listUser: resTn
            })
        }
    }
    async loadTinNhan(idRoomMessage) {
        if (idRoomMessage != "") {
            let res = await getListNoiDungTinNhan(idRoomMessage);
            if (res != null) {
                this.setState({
                    listMessage: res
                })
            }
        }
    }

    // async openDoanChat(idPhong){
    //     let res = await getListNoiDungTinNhan(idPhong);
    //     if(res!=null){
    //         this.setState({
    //             tinNhan:"",
    //             listTinNhan:res
    //         })
    //         this.setUpHienThiButton();
    //     }
    // }
    getIdRoomMessage(object, idRoom) {
        this.setState({
            receiver: object,
            idRoomMessage: idRoom
        })
    }
    async openChat(object, idRoom) {
        this.getIdRoomMessage(object, idRoom)
        let res = await getListNoiDungTinNhan(idRoom);
        if (res != null) {
            this.setState({
                message: "",
                listMessage: res
            })
            this.setUpHienThiButton();
        }

        this.realTime(this.state.sender.idTaiKhoan, idRoom)
        // }
    }
    kiemTraRong() {
        if (this.state.message === "") {
            return false;
        }
        let chuoi = this.state.message.trim();
        if (chuoi === "") {
            return false;
        }
        return true;
    }
    tstampHienTai() {
        let date = new Date();
        let gio = date.getHours();
        let phut = date.getMinutes();
        return gio + ":" + phut;
    }

    async eventSendMessage() {
        if (this.kiemTraRong()) {
            let res = await guiTinNhan(this.state.idRoomMessage, this.state.sender.idTaiKhoan, this.state.message);
            if (res != null) {

                let resmn = await capNhatTinNhanMoiNhat(
                    this.state.sender.idTaiKhoan,
                    this.state.idRoomMessage,
                    this.state.message,
                    this.tstampHienTai()
                )
                if (resmn != null) {
                    let listCopy = [...this.state.listMessage];
                    let tinNhan = { idPhong: this.state.idRoomMessage, idTaiKhoan: +this.state.sender.idTaiKhoan, noiDung: this.state.message }
                    listCopy[listCopy.length] = tinNhan
                    if (this.state.idRoomMessage != "") {
                        this.broadcastRoomMessage(this.state.idRoomMessage, this.state.message, this.state.receiver.idTaiKhoan);
                    }
                    this.setState({
                        listMessage: listCopy,
                        message: ""
                    })

                }
            }
        }
    }

    render() {
        let { listUser,
            listMessage,
            sender,
            receiver,
            message
        } = this.state;
        let isObjectSender = Object.keys(sender).length === 0
        let isObjectReceiver = Object.keys(receiver).length === 0
        return (
            <>
                <header>
                <ImagesBanner/>
                </header>
                <div className='section activity_tin_nhan'>
                    <div className="row man_hinh_nhan_tin">
                        {
                            listUser.length !== 0 ?
                                <>
                                    <div className='col-4 list_nguoi_nhan_tin'>
                                        <div className='tieude_tinNhan'>
                                            <h2>Chats</h2>
                                        </div>

                                        {
                                            listUser && listUser.length > 0 && listUser.map((item, index) => {

                                                return (

                                                    <div className="card_nhan_tin" key={index} onClick={item.chuTro === null ? () => this.openChat(item.nguoiThue, item.id) : () => this.openChat(item.chuTro, item.id)}>

                                                        <div className='img_card_nhan_tin col-md-3'>
                                                            <img className='img_avt_nhan_tin' src={item.chuTro === null ? baseURL + item.nguoiThue.hinh : baseURL + item.chuTro.hinh} alt={item.chuTro != null ? baseURL + item.chuTro.hinh : (item.nguoiThue != null ? baseURL + item.nguoiThue.hinh : "Chưa Có Dữ Liệu")} />
                                                        </div>
                                                        <div className='content_card_nhan_tin col-md-9'>
                                                            <div className='content_top_nhan_tin'>
                                                                <div className='col-md-9 ten_nhan_tin' >
                                                                    {item.chuTro === null ? item.nguoiThue.ten : item.chuTro.ten}
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

                                </> : <>
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
                                    <img className='src_avt_doi_phuong' src={isObjectReceiver === false ? baseURL + receiver.hinh : "Chưa Có Dữ Liệu"} alt={isObjectReceiver === false ? baseURL + receiver.hinh : "Chưa Có Dữ Liệu"} />
                                </div>
                                <div className='ten_doi_phuong'>
                                    {isObjectReceiver === false ? receiver.ten : "Chưa Có Dữ Liệu"}
                                </div>
                            </div>
                            <div className='vung_hien_thi_tin_nhan'>
                                <div className='vung_hien_thi_tin_nhan_child'>
                                    {
                                        listMessage.length > 0 ? <>
                                            {
                                                listMessage && listMessage.length > 0 &&
                                                listMessage.map((item, index) => {

                                                    return (
                                                        item.idTaiKhoan === sender.idTaiKhoan ? <div className='card_view_send' key={index}>
                                                            <div className='card_view_item_send'>{item.noiDung}</div>
                                                        </div> :
                                                            <div className='card_view_receive' key={index}>
                                                                <div className='card_view_item_receive'>{item.noiDung}</div>
                                                            </div>
                                                    )
                                                })
                                            }
                                        </> : <div>Chưa có tin nhắn!</div>
                                    }
                                </div>
                            </div>
                            <div className='vung_gui_tin_nhan'>
                                <textarea type="text" className='input_tin_nhan' rows={1} value={message} placeholder='Nhập tin nhắn...' onChange={(e) => this.onChangeMessage(e)} />

                                <button className='btn_send' onClick={() => this.eventSendMessage()} >

                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
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
export default TinNhanRealTime;