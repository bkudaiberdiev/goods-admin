import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import Home from "./components/home/Home";
import AddProduct from "./components/add-product/Add-product";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css"
import ProductDetail from "./components/product-detail/Product-detail";
import toast, { Toaster } from 'react-hot-toast';
import Producers from "./components/producers/Producers";

function App() {
  const params = useParams();
  return (
    <div className="main">
      <Sidebar />
      <div style={{ padding: "60px", width: "100%"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/add-product" element={<AddProduct />}/>
          <Route  path="/:id" element={<ProductDetail />}/>
          <Route path="/producers" element={<Producers />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
