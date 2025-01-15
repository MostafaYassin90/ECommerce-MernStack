import { useContext, useEffect, useState } from "react";
import { ShopContect } from "../../context/shopContect";
import "./Collection.css";
import { assets } from "../../assets/assets";
import Title from "../../components/Title/Title";
import ProductItem from "../../components/ProductItem/ProductItem";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContect);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relavent");


  // Toggle Category
  const toggleCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter((item) => item !== e.target.value));
    } else {
      setCategories([...categories, e.target.value]);
    }
  };
  // Toggle SubCategories
  const toggleSubCategories = (e) => {
    if (subCategories.includes(e.target.value)) {
      setSubCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategories((prev) => [...prev, e.target.value]);
    }
  };

  // Aply Filtering
  const applyFilteringProducts = () => {
    let productsCopy = products.slice(); // ["Men", "Kids"]

    if (categories.length > 0) {
      productsCopy = productsCopy.filter((product) => categories.includes(product.category));
    }

    if (subCategories.length > 0) {
      productsCopy = productsCopy.filter((product) => subCategories.includes(product.subCategory));
    }
    setFilterProducts(productsCopy);
  };

  // SortinN Products
  function sortingProducts() {
    const productsCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(productsCopy.sort((a, b) => (a.price - b.price)));
        break;
      case "hight-low":
        setFilterProducts(productsCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilteringProducts();
        break;
    }
  }

  // Search Product Handler
  const searchProducts = () => {

    let productsCopy = filterProducts.slice();

    if (search.length > 0) {
      setFilterProducts(productsCopy.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())));
    } else {
      applyFilteringProducts();
    }

  };



  useEffect(() => {
    applyFilteringProducts();
  }, [categories, subCategories, products]);

  useEffect(() => {
    sortingProducts();
  }, [sortType]);

  useEffect(() => {
    searchProducts();
  }, [search]);

  return (
    <div className="py-10 border-t flex flex-col sm:flex-row gap-2 sm:gap-10">

      {/* Filters */}
      <div className="w-full sm:w-1/4">
        <p className="font-semibold text-xl mb-6 flex items-center gap-2 cursor-pointer"
          onClick={() => { setShowFilters((prev) => !prev); }}
        >
          FILTERS
          <img src={assets.dropdown_icon} alt="dropdown-image" className={`h-4 ${showFilters ? "rotate-90" : ""} transition ease-in-out sm:hidden`} />
        </p>

        {/* Categories */}
        <div className={`py-3 px-4 border mb-6  ${showFilters ? "block" : "hidden"} sm:block`}>
          <p className="font-semibold mb-4">Categories</p>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="men" value={"Men"} onChange={toggleCategory} />
            <label htmlFor="men">Men</label>
          </div>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="women" value={"Women"} onChange={toggleCategory} />
            <label htmlFor="women">Women</label>
          </div>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="kids" value={"Kids"} onChange={toggleCategory} />
            <label htmlFor="kids">Kids</label>
          </div>
        </div>
        {/* SubCategory */}
        <div className={`py-3 px-4 border mb-6  ${showFilters ? "block" : "hidden"} sm:block`}>
          <p className="font-semibold mb-4">SubCategory</p>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="Topwear" value={"Topwear"} onChange={toggleSubCategories} />
            <label htmlFor="Topwear">Topwear</label>
          </div>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="Bottomwear" value={"Bottomwear"} onChange={toggleSubCategories} />
            <label htmlFor="Bottomwear">Bottomwear</label>
          </div>
          <div className="flex gap-3 items-center mb-3">
            <input type="checkbox" id="Winterwear" value={"Winterwear"} onChange={toggleSubCategories} />
            <label htmlFor="Winterwear">Winterwear</label>
          </div>
        </div>
      </div>
      {/* Collection Right Side */}
      <div className="w-full sm:w-3/4">
        {/* Top Right Side */}
        <div className="flex justify-between items-center gap-2">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Sort Products */}
          <select className="border-2 border-gray-500 p-2" onChange={(event) => {
            setSortType(event.target.value);
          }}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low To High</option>
            <option value="high-low">Sort by: High To Low</option>
          </select>
        </div>
        {/* Show Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 mt-4">
          {
            filterProducts.map((product) => (
              <ProductItem key={product._id} id={product._id} title={product.title} price={product.price} image={product.image} />
            ))
          }
        </div>

      </div>



    </div>
  );
}
export default Collection;