/*
Đây là của function component. Nếu dùng classComponent thì làm tương tự
Cách sử dụng component này
Cần có sẵn
const [idPhong, setIdPhong] = useState(-1);
const [show, setShow] = useState(false);
trong hàm mở model comment tức là khi click mở comment thêm {     setIdPhong(idPhong); setShow(true);     } hoặc xem ví dụ bên dưới
const functionName = () =>{
    setIdPhong(idPhong);
    setShow(true);
}
Thêm hàm phía dưới để tắt comment
const onCloseComment = () => {
   setShow(false);
}
Gắn component này vào trang mở comment phải để ở phần render
<Comment
idPhong={idPhong}
show={show}
onHide={onCloseComment} />


// Nếu đọc ở trên chưa hiểu thì 
B1: Copy vào
const [idPhong, setIdPhong] = useState(-1);
const [show, setShow] = useState(false);
const onCloseComment = () => {
   setShow(false);
}
//B2 Copy vào trong hàm click mở comment
setIdPhong(idPhong);
setShow(true);
//B3: Copy vào render
<Comment
idPhong={idPhong}
show={show}
onHide={onCloseComment} />
*/

import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import InputText from './InputText';
import ItemComment from './ItemComment';
import "./styles/modalcomment.css";
import firebase from '../../firebase/firebase.js';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { layTatCaBinhLuanCuaPhong, themBinhLuanChoPhong } from '../../services/chutro/MinhService';
import { baseURL } from '../../services/my-axios';
import imgSend from "./imgs/icon_send.png";
export default function Comment(props) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const { show } = props;
    const { onHide } = props;
    const { idPhong } = props;

    const handleComment = async () => {
        if (text != "") {
            const res = await themBinhLuanChoPhong(idPhong, sessionStorage.getItem('accountId'), text);
            console.log(res);
            if (res) {
                console.log(res);
                writeComment(idPhong, res.id);
                setText("");
            }
        }
        else {
            alert("Hãy nhập gì đó rồi comment");
        }
    }
    const writeComment = (idPhong, commentId) => {
        const db = getDatabase();
        const commentRef = ref(db, `comment/${idPhong}/${commentId}`);

        set(commentRef, commentId)
            .then(() => {
                console.log('ADD REALTIME OK');
            })
            .catch((error) => {
                console.error('Error adding data: ', error);
            });
    }
    const handleClose = () => {
        onHide();
        console.log(">>>Close");
        setComments(null);
        setText("");
    }
    const getText = (text) => {
        setText(text);
    }
    const fetchData = async () => {
        const db = getDatabase();
        const starCountRef = ref(db, `comment/${idPhong}`);
        onValue(starCountRef, (snapshot) => {
            fetchDataComment();
            console.log("GET REALTIME OK");
        });
    };
    const fetchDataComment = async () => {
        try {
            const res = await layTatCaBinhLuanCuaPhong(idPhong);
            if (res) {
                console.log("fetchDataComment");
                setComments(res);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {
        if (show) fetchData();
    }, [show]);

    return (
        <>
            <Modal show={show ? show : false} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Bình luận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="comment-body">
                        {
                            comments && comments.length > 0 && comments.map((item, index) => {
                                return (
                                    <ItemComment
                                        image={baseURL + item.nguoiGui.hinh}
                                        name={item.nguoiGui.ten}
                                        loaiTaiKhoan={item.loaiTaiKhoan}
                                        content={item.noiDungBinhLuan}
                                    />
                                )
                            })
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="form-send">
                        <InputText
                            value={text}
                            changeValue={getText}
                            class={"input-m"}
                            newParent={true}
                            placeholder="Hãy viết bình luận của bạn..." />
                        <img src={imgSend} onClick={handleComment} />
                    </div>


                </Modal.Footer>
            </Modal>
        </>
    )
}
