import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="pt-10">
      {/* Info */}
      <div className="pb-10 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10">
        <div>
          <img src={assets.logo} alt="logo-image" className="w-36 mb-4" />
          <p className="text-gray-500 text-sm w-3/4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div>
          <p className="text-2xl font-semibold mb-4">COMPANY</p>
          <ul>
            <li><NavLink to={"/"} className="block mb-2 text-gray-500">Home</NavLink></li>
            <li><NavLink to={"/#"} className="block mb-2 text-gray-500">About</NavLink></li>
            <li><NavLink to={"/#"} className="block mb-2 text-gray-500">Delivery</NavLink></li>
            <li><NavLink to={"/#"} className="block  text-gray-500">Privacy Policee</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="text-2xl font-semibold mb-4">GET IN TOUCH</p>
          <p className="block mb-2 text-gray-500">+1-000-000-0000</p>
          <p className="block mb-2 text-gray-500">HightLight@gmail.com</p>
          <p className="block text-gray-500">Instagram</p>
          <p></p>
        </div>

      </div>
      {/* Copy Right */}
      <p className="py-4 text-center text-sm border-t">Copyright 2024@ HightLight.dev - All Right Reversed.</p>
    </div>
  );
};

export default Footer;
