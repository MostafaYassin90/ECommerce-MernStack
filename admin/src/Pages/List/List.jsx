import { useEffect, useState } from "react";
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from './../../App';

function List(props) {

  const token = props.token;

  // Products List State
  const [productList, setProductsList] = useState([]);

  // Get All Products List
  const getProductsList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setProductsList(response.data.productList);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  };

  // Delete Single Products
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post(backendUrl + "/api/products/remove", { id: productId },
        { headers: { authorization: "Bearer " + token } }
      );
      if (response.data.success) {
        getProductsList();
        toast.success("Product Deleted");
      } else {
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);


  return (
    <div className="products-list">
      <p className="title">All Products List</p>

      {/* ********* Table Products List ************ */}
      <div className="table">
        {/* Head */}
        <div className="head">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b style={{ textAlign: "center" }}>Action</b>
        </div>
        {/* Body */}
        {
          productList.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image[0]} alt="product-image" />
              <p>{product.title}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <p className="remove-btn" onClick={() => {
                deleteProduct(product._id);
              }}>X</p>
            </div>
          ))
        }
      </div>
      {/* ********* Table Products List ************ */}

    </div>
  );
}
export default List;