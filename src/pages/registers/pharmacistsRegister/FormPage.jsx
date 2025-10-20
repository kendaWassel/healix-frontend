import React, { useState } from "react";
import InputField from "./components/InputField";
import PasswordInput from "./components/PasswordInput";
import FileInput from "./components/FileInput";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  Calendar,
  MapPin,
  Upload,
  ArrowLeft,
  UserSearchIcon,
  Award,
  MapPinned,
  Clock,
  Pill,
} from "lucide-react";
import "./FormPage.css";

const FormPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
    
        <div className="form-header">
          <div className="back-arrow" onClick={handleBack}>
            <ArrowLeft className="arrow-icon" /> 
          </div>
          <h1>Pharmacists Account Setup</h1>
          <p>Fill Your Information to register</p>
        </div>

        {/* Form */}
        <form className="form-container">
          {/* Row 1 */}
          <div className="row">
            <InputField icon={User} placeholder="Type Full Name" />
            <InputField icon={Phone} placeholder="Type Phone Number" type="tel" />
          </div>

          {/* Row 2 */}
          <InputField icon={Mail} placeholder="Type Email" type="email" />
          {/* Row 3 */}
         <PasswordInput />


          {/* Row 4 */}
          <div className="row">
            <InputField icon={Clock} placeholder="From:..." type="time" />
            <InputField icon={Clock} placeholder="To:..." type="time" />
          </div>

          {/* Row 5 */}
          <div className="row">
            <InputField icon={MapPin} placeholder="Type Location.." />
            <InputField icon={MapPinned} placeholder="Location in Map" />
          </div>

          {/* Row 6 */}
<FileInput placeholder="Upload License File" />

          {/* Row 7 */}
          <div className="row">
            <InputField icon={Pill} placeholder="Pharmacy Name" />{/* cross - pill - HeartPulse */}
            <InputField icon={Award} placeholder="CR Number .." type="tel" />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
