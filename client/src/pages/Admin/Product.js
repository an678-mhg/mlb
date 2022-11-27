import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FormCreateProduct from "../../components/Forms/FormCreateProduct";
import ProductTable from "../../components/Table/ProductTable";
import Paginate from "../../components/Paginate";
import FormEditProduct from "../../components/Forms/FormEditProduct";

const Product = () => {
  const { products, page, setPage, totalPage } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <div>
              <ProductTable product={products} />
              <Paginate page={page} setPage={setPage} totalPage={totalPage} />
            </div>
          }
        />
        <Route path="add" element={<FormCreateProduct />} />
        <Route path="edit/:id" element={<FormEditProduct />} />
      </Routes>
    </>
  );
};

export default Product;
