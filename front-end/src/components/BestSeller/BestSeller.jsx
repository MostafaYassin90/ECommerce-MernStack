import { useContext, useEffect, useState } from "react";
import Title from "../Title/Title";
import { ShopContect } from './../../context/shopContect';

import "./BestSeller.css";
import ProductItem from "../ProductItem/ProductItem";

const BestSeller = () => {

  const { products } = useContext(ShopContect);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);


  useEffect(() => {
    setBestSellerProducts(products.filter((product) => product.bestseller === true));
  }, [products]);


  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="mt-4 text-gray-600 text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. reprehenderit, dolorum magni fugiat aliquam deleniti eos distinctio iste impedit vitae.</p>
      </div>
      {/* Show Best Seller Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          bestSellerProducts.map((product) => (
            <ProductItem key={product._id} id={product._id} title={product.title} price={product.price} image={product.image} />
          ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
