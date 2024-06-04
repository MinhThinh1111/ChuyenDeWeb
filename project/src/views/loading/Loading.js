import React from 'react';
import "./style.css";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
function loading() {
  return (
    <div className='loading'>
      <div className="ring">
        loading
        <span className='loading'></span>
      </div>
    </div>
  );
}

export default loading;
