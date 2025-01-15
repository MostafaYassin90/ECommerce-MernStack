import { useContext, useEffect, useState } from "react";
import { ShopContect } from "../../context/shopContect";
import "./RelatedProducts.css";
import ProductItem from "../ProductItem/ProductItem";
import Title from "../Title/Title";

const RelatedProducts = (props) => {
  const { category, subCategory } = props;
  const { products } = useContext(ShopContect);
  const [relProducts, setRelProducts] = useState([]);


  const getRelatedProducts = () => {

    let productsCopy = products.slice();

    if (products.length > 0 && category && subCategory) {
      productsCopy = productsCopy.filter((product) => product.category === category);
      productsCopy = productsCopy.filter((product) => product.subCategory === subCategory);
      setRelProducts(productsCopy.slice(0, 5));
    }
  };

  useEffect(() => {
    getRelatedProducts();
  }, [products, category, subCategory]);

  return (
    <div className="text-center py-24">
      <Title text1={"RELATED"} text2={"PRODUCTS"} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
        {
          relProducts.map((product) => (
            <ProductItem key={product._id} id={product._id} title={product.title} price={product.price} image={product.image} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
