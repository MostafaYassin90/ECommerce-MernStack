import { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from "../../App";
import "./Add.css";

function Add(props) {
  const token = props.token;

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);


  // onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/products/add", formData, {
        headers: {
          authorization: "Bearer " + token
        }
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        setCategory("Men");
        setSubCategory("TopWear");
        setPrice("");
        setSizes([]);
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }

    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }

  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>

        {/* Upload Image */}
        <div className="field-group">
          <p className="upload-title">Upload Image</p>
          {/* Start Holder Uploads */}
          <div className="holder-uploads">
            <label htmlFor="image1">
              <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload-image" />
              <input type="file" id="image1" hidden onChange={(event) => {
                setImage1(event.target.files[0]);
              }} />
            </label>
            <label htmlFor="image2">
              <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload-image" />
              <input type="file" id="image2" hidden onChange={(event) => {
                setImage2(event.target.files[0]);
              }} />
            </label>
            <label htmlFor="image3">
              <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload-image" />
              <input type="file" id="image3" hidden onChange={(event) => {
                setImage3(event.target.files[0]);
              }} />
            </label>
            <label htmlFor="image4">
              <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload-image" />
              <input type="file" id="image4" hidden onChange={(event) => {
                setImage4(event.target.files[0]);
              }} />
            </label>
          </div>
        </div>
        {/* End Holder Uploads */}
        {/* Product Title */}
        <div className="field-group control-group">
          <label htmlFor="title">Product Title</label>
          <input type="text" placeholder="Type Your Product Title" required id="title"
            onChange={(event) => { setTitle(event.target.value); }}
          />
        </div>
        {/* Product Description */}
        <div className="field-group control-group">
          <label htmlFor="description">Product Description</label>
          <textarea type="text" placeholder="Type Your Product Description" required
            id="description" onChange={(event) => { setDescription(event.target.value); }} />
        </div>
        {/* Start Holder Select Field And Price */}
        <div className="holder-select">
          {/* Product Categories */}
          <div className="field-group control-group">
            <label>Category</label>
            <select onChange={(event) => { setCategory(event.target.value); }}>
              <option value={"Men"}>Men</option>
              <option value={"Woman"}>Women</option>
              <option value={"Kids"}>Kids</option>
            </select>
          </div>
          {/* Product Sub Category */}
          <div className="field-group control-group">
            <label>SubCategory</label>
            <select onChange={(event) => { setSubCategory(event.target.value); }}>
              <option value={"TopWear"}>TopWear</option>
              <option value={"BottomWear"}>BottomWear</option>
              <option value={"WinterWear"}>WinterWear</option>
            </select>
          </div>
          {/* Product Price */}
          <div className="field-group control-group">
            <label htmlFor="price">Price</label>
            <input type="number" placeholder="0.0" required id="price"
              onChange={(event) => { setPrice(event.target.value); }}
            />
          </div>
        </div>
        {/* End Holder Select Field And Price */}
        {/* Product Sizes */}
        <div className="product-sizes">
          <p className="title">Product Sizes</p>
          <div className="holder-sizes">
            <div>
              <p onClick={() => {
                setSizes(prev => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"]);
              }}
                className={sizes.includes("S") ? "active" : ""}
              >S</p>
            </div>
            <div>
              <p onClick={() => {
                setSizes(prev => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]);
              }}
                className={sizes.includes("M") ? "active" : ""}
              >M</p>
            </div>
            <div>
              <p onClick={() => {
                setSizes(prev => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]);
              }}
                className={sizes.includes("L") ? "active" : ""}
              >L</p>
            </div>
            <div>
              <p onClick={() => {
                setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]);
              }}
                className={`${sizes.includes("XL") ? "active" : ""}`}
              >XL</p>
            </div>
            <div>
              <p onClick={() => {
                setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]);
              }}
                className={`${sizes.includes("XXL") ? "active" : ""}`}
              >XXL</p>
            </div>
          </div>
        </div>

        {/* Product BestSeller */}
        <div className="field-group holder-bestseller">
          <input type="checkbox" id="bestseller" checked={bestSeller}
            onChange={() => {
              setBestSeller((prev) => !prev);
            }}
          />
          <label htmlFor="bestseller">Add To BestSeller</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn btn btn-dark">Add Item</button>


      </form>
    </div>
  );
}
export default Add;