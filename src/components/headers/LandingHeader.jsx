// import { Link } from "react-router"

const LandingHeader = () => {
  return (
    <div
      className={`md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)]`}
    >
      <div className={`logo w-[125px]`}>
        <img src="./Logo-dark.png" alt="logo" />
      </div>
      <div
        className={`sign-buttons flex items-center md:gap-[1rem] gap-[0.5rem]`}
      >
        <button className="text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[25px] sm:px-[0.8rem] sm:py-[0.5rem] font-medium">
          Sign in
        </button>
        <button className="text-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] duration-400 rounded-[25px] sm:px-[0.8rem] sm:py-[0.5rem] font-medium">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;
