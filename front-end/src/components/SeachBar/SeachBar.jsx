import { useContext, useEffect, useState } from "react";
import { ShopContect } from './../../context/shopContect';
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import "./SeachBar.css";

const SeachBar = () => {
  const { setSearch, showSearch, setShowSearch } = useContext(ShopContect);
  const [visible, setVidible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVidible(true);
    } else {
      setVidible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b py-5 bg-gray-50">
      <div className="flex items-center justify-center gap-5">
        {/* Input Search */}
        <div className="w-3/4 sm:w-1/2 border border-gray-800 relative h-[40px] rounded-3xl overflow-hidden">
          <input type="text" placeholder="Search" className="block w-full h-full  py-2 px-4 outline-none"
            onChange={(event) => { setSearch(event.target.value); }}
          />
          <img src={assets.search_icon} alt="search-image" className="absolute top-1/2 translate-y-[-50%] right-[10px] h-5" />
        </div>
        {/* Close Search Icon */}
        <img src={assets.cross_icon} alt="close-icon" className="h-3 cursor-pointer" onClick={() => {
          setShowSearch(false);
        }} />
      </div>
    </div>
  ) : null;
};

export default SeachBar;
