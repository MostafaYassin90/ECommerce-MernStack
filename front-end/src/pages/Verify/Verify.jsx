import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContect } from "../../context/shopContect";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../App";

const Verify = () => {
  const { setCartItems } = useContext(ShopContect);
  const token = window.localStorage.getItem("Token");
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  console.log(success);
  const navigate = useNavigate();

  // Vrify Function
  const verifyPayment = async () => {
    try {

      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + "/api/order/verifyStripe", { success, orderId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);


  return (
    <div>
      Verify Page
    </div>
  );
};

export default Verify;
