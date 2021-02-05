import React from "react";
import "./spinner.css";
// import spinner from '../../../public/img/spinner.gif'
export const Spinner = () => {
  return (
    <div className="spinner">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
};
