import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductsNoJinja from "./pages/ProductsNoJinja";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ListProducts />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/productsNoJinja" element={<ProductsNoJinja />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
