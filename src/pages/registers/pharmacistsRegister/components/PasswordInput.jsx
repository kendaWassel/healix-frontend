import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      icon={() => <Lock className="icon lock-icon" />}
      placeholder="Type Password.."
      type={showPassword ? "text" : "password"}
      extraIcon={() =>
        showPassword ? (
          <EyeOff
            className="icon eye-icon"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="icon eye-icon"
            onClick={() => setShowPassword(true)}
          />
        )
      }
    />
  );
};

export default PasswordInput;
