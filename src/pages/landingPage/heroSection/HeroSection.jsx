import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className="flex items-center justify-between bg-[#F2F2F2] md:px-[3rem] px-[1.5rem] md:py-[4rem] py-[2rem] w-full">
      <div className={`hero-content md:w-[50%]`}>
        <div className="flex flex-col items-start justify-center md:gap-[1.5rem] gap-[1rem]">
          <h1 className="md:text-[40px] text-[20px] font-bold">
            Your Health, Just One Click Away
          </h1>
          <p className="font-medium sm:text-lg">
            Access quality healthcare from the comfort of your home. Connect
            with verified doctors, order medicines, and get professional care
            delivered to your doorstep.
          </p>
          <Link to='/register' className="text-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] duration-400 rounded-[25px] sm:px-[0.8rem] sm:py-[0.5rem] font-medium">
            Sign up
          </Link>
        </div>
      </div>
      <div className="overflow-hidden md:w-[40%]">
        <img src="./hero.jpg" alt="" className="rounded-[50px]" />
      </div>
    </div>
  );
};

export default HeroSection;
