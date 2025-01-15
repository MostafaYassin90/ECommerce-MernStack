import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Collection from './pages/Collection/Collection';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Product from './pages/Product/Product';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Orders from './pages/Orders/Orders';
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar.jsx/Navbar";
import { ToastContainer } from "react-toastify";
import "./App.css";
import SeachBar from "./components/SeachBar/SeachBar";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import Verify from "./pages/Verify/Verify";

function App() {
  return (
    <div className="app px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="top-right" theme="colored" />
      <Navbar />
      <SeachBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <hr />
      <Footer />
    </div>
  );
}

export default App;