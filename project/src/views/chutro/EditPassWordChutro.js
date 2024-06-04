import React, { useEffect, useState } from "react";
import Header from "../item/Header";
import InputText from "../item/InputText";
import {
  getAccountById,
  getChuTroById,
  updatePassWord,
} from "../../services/chutro/PhucService";
import { async } from "q";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

function EditPassWordChuTro() {
  const [id, setId] = useState(sessionStorage.getItem("accountId"));

  let nav = useNavigate();

  let [result, setResult] = useState({});
  let [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);

  const [passNow, setPassNow] = useState("");
  const [passNew, setPassNew] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  useEffect(() => {
    async function getDataAPI() {
      setResult(await getAccountById(id));
      setLoading(true);
    }
    getDataAPI();
  }, []);

  const doimatkhau = async (id, passNow, passNew) => {
    const res = await updatePassWord(id, passNow, passNew);
  };

  const onCLickChangePass = () => {
    if (checkEmpty(passNow, passNew, passConfirm)) {
      if (checkLength(passNow, passNew, passConfirm)) {
        if (checkCofirmPass(passNew, passConfirm)) {
          if (result.matKhau === passNow) {
            doimatkhau(id, passNow, passNew);
            toast.success("Đổi mật khẩu thành công");
            nav("/chutro/thongtin");
          } else {
            console.log(result.matKhau);
            toast.error("Mật khẩu hiện tại sai!!!");
          }
        } else {
          toast.warning("Nhập lại mật khẩu không đúng!!!");
        }
      } else {
        toast.warning("Mật khẩu ít nhất 6 số");
      }
    } else {
      toast.error("Chưa nhập đủ các trường!!!");
    }
  };
  const changePassNow = (text) => {
    setPassNow(text);
  };
  const changePassNew = (text) => {
    setPassNew(text);
  };
  const changePassConfirm = (text) => {
    setPassConfirm(text);
  };

  const checkCofirmPass = (passNew, passConfirm) => {
    if (passNew !== passConfirm) {
      return false;
    }
    return true;
  };

  const checkEmpty = (passNew, passNow, passConfirm) => {
    if (passNew === "" || passNow === "" || passConfirm === "") {
      return false;
    }
    return true;
  };
  const checkLength = (passNew, passNow, passConfirm) => {
    if (passNew.length < 6 || passNow.length < 6 || passConfirm.length < 6) {
      return false;
    }
    return true;
  };
  return (
    <>
      <Header tenManHinh={"Đổi mật khẩu"} tenChuTro={result.ten} />
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
      <div class="wrapperp rounded bg-white">
        <div class="form">
          <div class="row">
            <InputText
              label={"Mật khẩu hiện tại"}
              type={"password"}
              changeValue={changePassNow}
            />

            <InputText
              label={"Mật khẩu mới"}
              type={"password"}
              changeValue={changePassNew}
            />

            <InputText
              label={"Nhập lại mật khẩu"}
              type={"password"}
              changeValue={changePassConfirm}
            />
          </div>
          <button class="btn btn-primary mt-3" onClick={onCLickChangePass}>
            Cập nhật
          </button>
        </div>
      </div>
    </>
  );
}

export default EditPassWordChuTro;
