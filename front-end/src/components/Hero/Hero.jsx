import "./Hero.css";
import { assets } from './../../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-700">
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center flex-col gap-4 py-10 sm:py-0">
        <div className="flex items-center gap-2 w-[220px] justify-start">
          <hr className="m-0 border-0 bg-gray-700 w-16 h-[1.5px]" />
          <p className="prata-regular text-xl font-semibold text-gray-700">Our BesrSeller</p>
        </div>
        <div className="text-5xl text-gray-700">Latest Arrivals</div>
        <div className="flex items-center gap-2  w-[220px] justify-start">
          <p className="text-xl font-semibold text-gray-700">Show Now </p>
          <hr className="m-0 border-0 bg-gray-700 w-16 h-[1.5px]" />
        </div>
      </div>
      {/* Hero Left */}
      <div className="w-full sm:w-1/2">
        <img src={assets.landing_img} alt="hero-image" className="w-full" />
      </div>
    </div>
  );
};

export default Hero;
