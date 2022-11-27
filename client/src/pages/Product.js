import React from "react";
import Category from "../components/Category";
import ProductsList from "../components/Products/ProductsList";
import { useParams } from "react-router-dom";

const Product = () => {
  const { category } = useParams();

  return (
    <div className="container mt-4">
      <div className="flex-col md:flex-row flex gap-2 py-4">
        <Category />

        <ProductsList paginate={true} category={category} title="Products" />
      </div>
    </div>
  );
};

export default Product;
