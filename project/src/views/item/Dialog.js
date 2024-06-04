/*
Hướng dẫn sử dụng component Dialog function component
const [showDialog, setShowDialog] = useState(false); Bắt buộc
const [id, setId] = useState(-1); Dòng này có thể không cần. Nếu cần sử lý sự kiện nút OK theo id nào đó có thể tạo id như này nếu chỉ là dialog thông báo thông thường bật tắt thì không cần
const onCloseDialog = () => {
    setShowDialog(false);
} Cái này bắt buộc có để tắt dialog

Trong function bật dialog có 2 dòng này:
setIdPhong(id gì đó); Dòng này có thể không cần nếu đây là dialog chỉ bật tắt không sử lý gì liên quan đến id
setShowDialog(true); Dòng này bắt buộc có để mở dialog

Khi render 
VD1 đây là khi dùng dialog khi nhấn OK có sự kiện xảy ra
<Dialog
id={idPhong}
show={showDialog}
onClickCANCAL={onCloseDialog}
title="Bạn có muốn xóa phòng không"
content={`Nếu bạn nhấn xóa ${idPhong} thì nhấn OK nếu không thì hãy nhấn CANCAL`}
onClickOK={xacNhanXoaPhong}/>
VD2 đây là dialog không có nút OK
<Dialog
show={showDialog}
onClickCANCAL={onCloseDialog}
title="Thông báo"
content={`Thêm thành công`}/>
Nếu muốn tắt luôn nút CANCAL thì dùng thuộc tính 
closeButtonCancal={true}
*/ 
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
export default function Dialog(props) {
    const { id, title, content, show, onClickCANCAL } = props;

    const handleClose = () => onClickCANCAL();
    const handleOK = () => {
        if (props.onClickOK) {
            props.onClickOK(id);
        }
        onClickCANCAL();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    {props.closeButtonCancal === true ?
                        <></>
                        :
                        <Button variant="secondary" onClick={handleClose}>
                            CANCAL
                        </Button>
                    }
                    {props.onClickOK ?
                        <Button variant="primary" onClick={handleOK}>
                            OK
                        </Button>
                        :
                        <></>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}