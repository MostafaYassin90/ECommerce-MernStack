import { useContext, useEffect, useState } from "react";
import { ShopContect } from "../../context/shopContect";
import Title from "../Title/Title";
import ProductItem from "../ProductItem/ProductItem";
import "./LatestCollection.css";

const LatestCollection = () => {

  const { products } = useContext(ShopContect);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className="mt-4 text-gray-600 text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. reprehenderit, dolorum magni fugiat aliquam deleniti eos distinctio iste impedit vitae.</p>
      </div>
      {/* Show Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          latestProducts.map((product) => (
            <ProductItem key={product._id} id={product._id} title={product.title} price={product.price} image={product.image} />
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
