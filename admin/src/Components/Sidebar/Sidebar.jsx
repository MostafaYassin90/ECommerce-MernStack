import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="links">
        <NavLink to={"add"} className="link">
          <img src={assets.add_icon} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={"list"} className="link">
          <img src={assets.order_icon} />
          <p>List Items</p>
        </NavLink>
        <NavLink to={"orders"} className="link">
          <img src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>
      </div>

    </div>
  );
}

export default Sidebar;