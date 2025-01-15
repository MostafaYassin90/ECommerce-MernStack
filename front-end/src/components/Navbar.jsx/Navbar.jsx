import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from './../../assets/assets';
import { useContext, useState } from 'react';
import { ShopContect } from '../../context/shopContect';
import { SlHeart } from "react-icons/sl";
import { WishlistContext } from '../../context/wishlistContext';

function Navbar() {
  const { setShowSearch, cartItemsCount, setCartItems } = useContext(ShopContect);
  const [visible, setVisible] = useState(false);
  const token = window.localStorage.getItem("Token");

  // Wishlist Context
  const { wishlistItems } = useContext(WishlistContext);


  // Navigation
  const navigate = useNavigate();

  // Logout Hander
  const logoutHandler = () => {
    window.localStorage.removeItem("Token");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className='navbar flex items-center justify-between py-5 font-medium'>
      <Link to={"/"}>
        {/* <img src={assets.logo} alt='logo-image' className='w-36' /> */}
        <p className='w-36 text-2xl font-semibold'>E-Commerce</p>
      </Link>
      {/* ul */}
      <ul className='hidden sm:flex items-center gap-5'>
        <NavLink to={"/"} className="flex flex-col gap-1 items-center">
          <p>Home</p>
          <hr className='m-0 w-2/4 h-[1.5px] bg-gray-700 border-none hidden' />
        </NavLink>
        <NavLink to={"/collection"} className="flex flex-col gap-1 items-center">
          <p>Collection</p>
          <hr className='m-0 w-2/4 h-[1.5px] bg-gray-700 border-none hidden' />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col gap-1 items-center">
          <p>About</p>
          <hr className='m-0 w-2/4 h-[1.5px] bg-gray-700 border-none hidden' />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col gap-1 items-center">
          <p>Contact</p>
          <hr className='m-0 w-2/4 h-[1.5px] bg-gray-700 border-none hidden' />
        </NavLink>
      </ul>
      {/* ul */}
      {/* Start Right Elements */}
      <div className='flex gap-3 items-center'>
        <div className='flex items-center gap-2'>
          {/* Search Icon */}
          <img src={assets.search_icon} alt='search-icon' className='w-5 cursor-pointer' onClick={() => {
            navigate("/collection");
            setShowSearch(true);
          }} />
          {/* Profile Icon */}
          <div className='relative group'>
            <Link to={token ? null : "/login"}> <img src={assets.profile_icon} alt='profile-icon' className='w-5 cursor-pointer' /></Link>
            {
              token
                ?
                <div className='group-hover:block dropdown-menu absolute hidden right-0 p-4'>
                  <div className='flex flex-col gap-2 py-3 w-36 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black' onClick={() => { navigate("/orders"); }}>Orders</p>
                    <p className='cursor-pointer hover:text-black' onClick={logoutHandler}>Logout</p>
                  </div>
                </div>
                :
                null
            }
          </div>
        </div>
        {/* Seperator */}
        <p className='m-0 w-[1px] h-[30px] bg-gray-400'></p>
        {/* Div For Cart And Wishlist */}
        <div className='flex items-center gap-2'>
          {/* Cart */}
          <Link to={"/cart"} className='relative'>
            <img src={assets.cart_icon} className='w-5 cursor-pointer' />
            <p className='absolute w-4 h-4 aspect-square rounded-full bg-black text-white right-[-5px] bottom-[-5px] text-center leading-4 text-[12px]'>{cartItemsCount()}</p>
          </Link>
          {/* Wishlist */}
          <Link to={"/wishlist"} className='relative'>
            <SlHeart className='text-xl' />
            <p className='absolute w-4 h-4 rounded-full bg-black text-white leading-4 text-center text-sm  top-[9px] right-[-6px]'>{wishlistItems.length}</p>
          </Link>
        </div>
        {/* Menu Icon */}
        <img onClick={() => { setVisible(true); }} src={assets.menu_icon} alt='menu-icon' className='w-5 cursor-pointer sm:hidden' />
      </div>
      {/* End Right Elements */}
      {/* ------ SideBar For Small Screen */}
      <div className={`dropdown-response absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-700'>
          <div className='flex gap-4 items-center cursor-pointer p-3' onClick={() => { setVisible(false); }}>
            <img src={assets.dropdown_icon} alt='drop-icon' className='h-4 rotate-180' />
            <p>Back</p>
          </div>
          <NavLink to={"/"} className="py-3 border pl-6 border-b-0" onClick={() => { setVisible(false); }}>Home</NavLink>
          <NavLink to={"/collection"} className="py-3 border pl-6 border-b-0" onClick={() => { setVisible(false); }}>Collection</NavLink>
          <NavLink to={"/about"} className="py-3 border pl-6 border-b-0" onClick={() => { setVisible(false); }}>About</NavLink>
          <NavLink to={"/contact"} className="py-3 border pl-6 border-b-0" onClick={() => { setVisible(false); }}>Contact</NavLink>
        </div>

      </div>

    </div >
  );
}
export default Navbar;