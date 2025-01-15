import BestSeller from "../../components/BestSeller/BestSeller";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import LatestCollection from "../../components/LatestCollection/LatestCollection";
import OurPolicy from "../../components/OurPolicy/OurPolicy";
import Subscribe from "../../components/Subscribe/Subscribe";
import "./Home.css";

function Home() {
  return (
    <div>
      <Hero autoSlideInterva={3000} autoSlide={true} />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <Subscribe />
    </div>
  );
}
export default Home;