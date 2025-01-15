import { assets } from "../../assets/assets";
import "./OurPolicy.css";

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center py-10">
      <div className="text-center">
        <img src={assets.exchange_icon} alt="exchange-image" className="mb-4 w-14 mx-auto" />
        <p className="text-sm sm:text-md text-gray-900 font-semibold tracking-wide">Easy Exchange Policy</p>
        <p className="text-sm sm:text-md text-gray-600 font-semibold tracking-wide">We offer hassle free exchange policy</p>
      </div>
      <div className="text-center">
        <img src={assets.quality_icon} alt="exchange-image" className="mb-4 w-14 mx-auto" />
        <p className="text-sm sm:text-md text-gray-900 font-semibold tracking-wide">7 Days Return Policy</p>
        <p className="text-sm sm:text-md text-gray-600 font-semibold tracking-wide">We provide 7 days free return policy</p>
      </div>
      <div className="text-center">
        <img src={assets.support_img} alt="exchange-image" className="mb-4 w-14 mx-auto" />
        <p className="text-sm sm:text-md text-gray-900 font-semibold tracking-wide">Best customer support</p>
        <p className="text-sm sm:text-md text-gray-600 font-semibold tracking-wide">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
