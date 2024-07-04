// Button.js
import React from "react";
import "../styles/Button.css";

const Button = ({ onClick, disabled, children }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
