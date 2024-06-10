import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import Home from "./components/home/Home";
import AddProduct from "./components/add-product/Add-product";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css"
import ProductDetail from "./components/product-detail/Product-detail";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const params = useParams();
  return (
    <div className="main">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/add-product" element={<AddProduct />}/>
        <Route  path="/:id" element={<ProductDetail />}/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
