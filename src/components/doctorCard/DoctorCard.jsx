import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faClock,
  faStar
} from "@fortawesome/free-solid-svg-icons";
const DoctorCard = ({
  doctor_image,
  name,
  specialization,
  rating,
  available_from,
  available_to,
  consultation_fee,
  onSelect,
  isActive,
  isDimmed,
}) => {
  return (
    <div
      className={`bg-[var(--white)] py-[2rem] px-[1rem] border-[2px] rounded-[8px] cursor-pointer duration-200 ${
        isActive
          ? "border-[var(--cyan)] border-[2px]"
          : "border-[var(--card-border)]"
      } ${isDimmed ? "opacity-60" : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect && onSelect();
      }}
      aria-pressed={!!isActive}
    >
      <div className="flex justify-between items-center border-b-[2px] border-b-[var(--card-border)] gap-[2rem] pb-[0.5rem]">
      <div className="flex items-start gap-[0.5rem]">
        {/* doctor's image  */}
        <div className="w-[50px] h-[50px] overflow-hidden rounded-[50%] flex-shrink-0">
          <img src={doctor_image || '../../../public/no-photo.png'} className="w-full h-full object-cover" alt="doctor's image" />
        </div>
        {/* name and spec  */}
        <div>
            <h3 className="text-[18px] font-medium">{name}</h3>
            <p>{specialization}</p>
        </div>
      </div>
      {/* rating  */}
        <div className="bg-[#ebfafa] flex items-center p-[0.3rem_0.5rem] rounded-[10px] gap-1">
        <FontAwesomeIcon icon={faStar} className="text-[var(--cyan)]"/>
        {rating}
        </div>
      </div>
      <div className="flex items-center gap-[0.8rem] mt-[0.5rem]">
        {/* working hours  */}
        <div className="flex items-center gap-[0.2rem]">
        <FontAwesomeIcon icon={faClock} className="text-[var(--cyan)]"/>
        <span>from {available_from} </span>
        <span>to {available_to} </span>
        </div>
        {/* consultation fee */}
        <div className="flex items-center gap-[0.2rem]">
        <FontAwesomeIcon icon={faTag} className="text-[var(--cyan)]"/>
        <span>{consultation_fee}$ Consultation fee</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
