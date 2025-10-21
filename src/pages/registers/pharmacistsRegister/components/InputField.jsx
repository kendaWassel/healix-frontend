import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ icon: Icon, placeholder, type = "text", extraIcon: ExtraIcon }) => {
  return (
    <div className={`${styles.inputField}`}>
      {Icon && <Icon className={`${styles.icon}`} />}
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.input}`}
      />
      {ExtraIcon && <ExtraIcon className={`${styles.icon} ${styles.extraIcon}`} />}
    </div>
  );
};

export default InputField;