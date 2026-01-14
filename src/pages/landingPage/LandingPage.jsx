import Footer from "../../components/footer/Footer";
import LandingHeader from "../../components/headers/LandingHeader";
import FAQ from "./FAQ/FAQ";
import HeroSection from "./heroSection/HeroSection";
import OurServices from "./ourServices/OurServices";

const LandingPage = () => {
  return (
    <div>
      <LandingHeader />
      <HeroSection />
      <OurServices />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
