import { useContext } from "react";
import { ShopContect } from "../../context/shopContect";
import { Link } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ id, title, price, image }) {
  const { currency } = useContext(ShopContect);
  return (
    <Link to={`/product/${id}`} className="shadow rounded overflow-hidden border">
      <div className="overflow-hidden">
        <img src={image[0]} alt="product-image" className="hover:scale-110 transition ease-in-out h-[220px] bg-gray-200 w-full" />
      </div>
      <div className="py-3 px-3">
        <p className="text-sm mb-2 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{title}</p>
        <p className="text-sm mb-2 text-gray-900 font-bold">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
