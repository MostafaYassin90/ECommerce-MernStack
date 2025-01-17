import Header from './Components/Header/Header';
import Add from "./Pages/Add/Add";
import Others from './Pages/Others/Others';
import List from './Pages/List/List';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Home from "./Pages/Home/Home";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");


  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className='app'>
      <ToastContainer position='top-center' theme='colored' />
      {
        token === ""
          ?
          <Login setToken={setToken} />
          :
          <>
            <Header setToken={setToken} />
            <hr style={{ margin: 0 }} />
            <div className='content'>
              <Sidebar />
              <div className='holder-routes'>
                <Routes>
                  <Route path={"/"} element={<Home token={token} />} />
                  <Route path={"/add"} element={<Add token={token} />} />
                  <Route path={"/list"} element={<List token={token} />} />
                  <Route path={"/orders"} element={<Others token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  );
}

export default App;
