import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ShopContectProvider from './context/shopContect';
import WishlistContextProvider from './context/wishlistContext.jsx';


createRoot(document.getElementById('root')).render(
  <ShopContectProvider>
    <WishlistContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WishlistContextProvider>
  </ShopContectProvider>
);
