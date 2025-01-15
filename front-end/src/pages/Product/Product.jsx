import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContect } from './../../context/shopContect';
import { assets } from "../../assets/assets";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { toast } from "react-toastify";
import { WishlistContext } from "../../context/wishlistContext";
import "./Product.css";


const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContect);
  const { productId } = useParams("");
  const [singleProduct, setSingleProduct] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Wishlist Context
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);

  // Get Single Product
  const getSingleProduct = () => {
    const productsCopy = products.slice();
    products.map((product) => {
      if (product._id === productId) {
        setSingleProduct(product);
        setMainImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    getSingleProduct();
  }, [productId, products]);

  return (
    <>
      <hr />
      <div className="py-10">
        <div className="flex flex-col sm:flex-row gap-10 single-product mb-20">
          {/* Left Side Product Image */}
          <div className="w-full sm:w-1/2 flex flex-col-reverse sm:flex-row gap-3">
            <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-col sm:gap-y-3 w-full sm:w-1/5">
              {
                singleProduct && singleProduct.image.map((item, index) => (
                  <img src={item} alt="product-image" key={index} className="cursor-pointer p-1 bg-gray-200"
                    onClick={() => { setMainImage(item); }}
                  />
                ))
              }
            </div>
            <div className="w-full sm:w-4/5">
              <img src={mainImage} alt="product-image" className="h-auto w-full" />
            </div>
          </div>
          {/* Right Side Product Details */}
          <div className="w-full sm:w-1/2 right-side">
            {/* Title */}
            <p className="font-semibold text-2xl mb-4">{singleProduct.title}</p>
            {/* Start */}
            <div className="flex item-center gap-3">
              <div className="flex items-center gap-1">
                <img src={assets.star_icon} alt="star" className="w-4 h-4" />
                <img src={assets.star_icon} alt="star" className="w-4 h-4" />
                <img src={assets.star_icon} alt="star" className="w-4 h-4" />
                <img src={assets.star_icon} alt="star" className="w-4 h-4" />
                <img src={assets.star_dull_icon} alt="star" className="w-4 h-4" />
              </div>
              <p className="font-semibold m-0">(122)</p>
            </div>
            {/* Price */}
            <p className="mt-5 text-3xl font-bold">{currency}{singleProduct.price}</p>
            {/* Description */}
            <p className="mt-5 text-gray-600 w-[80%]">{singleProduct.description}</p>
            {/* Size */}
            <div>
              <p className="mb-3">Select Size</p>
              <div className="flex items-center gap-2 sizes">
                {
                  singleProduct && singleProduct.size.map((item, index) => (
                    <p key={index} className={`py-3 px-4 border border-gray-300 cursor-pointer rounded bg-gray-200 text-center leading-5 ${size === item ? "active" : ""} transition-all`}
                      onClick={() => { setSize(item); }}
                    >{item}</p>
                  ))
                }
              </div>
            </div>
            {/* Add To Cart */}
            <div className="flex items-center gap-3 mt-8">
              <button className="bg-black text-sm text-white py-2 px-5 uppercase font-semibold transition-all hover:bg-slate-700 border-2 border-transparent rounded-full"
                onClick={() => {
                  if (size) {
                    addToCart(singleProduct._id, size);
                  } else {
                    toast.info("Please Select Your Product Size");
                  }
                }}
              >Add To Cart</button>
              {/* Wisht List */}
              <button onClick={() => { addToWishlist(singleProduct); }} className="text-sm uppercase font-semibold py-2 px-5 bg-slate-700 transition duration-300 hover:bg-white hover:text-black border-2 border-transparent hover:border-black rounded-full  text-white">Add To Wishlist</button>
            </div>
            {/* Seperator */}
            <p className="w-full my-7 h-[1px] bg-gray-300"></p>
            {/* Origin */}
            <p className="w-1/2 text-sm font-medium text-gray-500">100% Original product. Cash on delivery is available on this product. Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
        {/* End Of Products */}
        {/* Start Bottom Section */}
        <div>
          <div className="flex items-center border border-gray-200 border-b-0 w-fit">
            <p className="w-1/2 py-3 px-5 border-r border-gray-200 font-medium">Description</p>
            <p className="w-1/2 py-3 px-5 text-gray-900">Reviews(122)</p>
          </div>
          <div className="border border-gray-200 py-5 px-4 mb-20">
            <p className="text-gray-600 text-sm mb-3">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p className="text-gray-600 text-sm">E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
        </div>
        {/* Related Products */}
        <RelatedProducts category={singleProduct.category} subCategory={singleProduct.subCategory} />

      </div>
    </>
  );
};

export default Product;

