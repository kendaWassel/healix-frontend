import Footer from "../../components/footer/Footer";
import LandingHeader from "../../components/headers/LandingHeader";
import HeroSection from "./heroSection/HeroSection";
import OurServices from "./ourServices/OurServices";

const LandingPage = () => {
  return (
    <div>
      <LandingHeader />
      <HeroSection />
      <OurServices />
      <Footer />
    </div>
  );
};

export default LandingPage;
