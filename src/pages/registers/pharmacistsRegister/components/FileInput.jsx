import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import './InputField.css';

const FileInput = ({ placeholder }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleClick = () => inputRef.current.click();
  const handleChange = (e) => setFileName(e.target.files[0]?.name || "");

  return (
    <div className="input-field" onClick={handleClick} style={{ justifyContent: "center" }}>
      <Upload className="icon" />
      <span className={`file-placeholder ${fileName ? "has-file" : ""}`}>
        {fileName || placeholder}
      </span>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
