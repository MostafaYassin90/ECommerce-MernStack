import { assets } from './../../assets/assets';
import "./Header.css";

function Header(props) {
  const setToken = props.setToken;

  // Logout Handler
  const logoutHandler = async () => {
    setToken("");
  };

  return (
    <div className="header">
      {/* <img className="logo-img" src={assets.logo} alt="logo-image" /> */}
      <p className='text-2xl font-semibold'>Admin Panel</p>
      <button className="btn btn-dark logout-btn"
        onClick={logoutHandler}
      >Logout</button>
    </div>
  );
}

export default Header;