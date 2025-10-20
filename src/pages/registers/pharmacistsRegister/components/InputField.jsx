import React from "react";
import "./InputField.css";

const InputField = ({ icon: Icon, placeholder, type = "text", extraIcon: ExtraIcon }) => {
  return (
    <div className="input-field">
      {Icon && <Icon className="icon" />}
      <input
        type={type}
        placeholder={placeholder}
        className="input"
      />
      {ExtraIcon && <ExtraIcon className="icon extra-icon" />}
    </div>
  );
};

export default InputField;