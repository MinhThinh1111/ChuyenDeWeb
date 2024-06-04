import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function DangXuat() {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
    navigate("/");
  }, []);
  return <></>;
}
export default DangXuat;
