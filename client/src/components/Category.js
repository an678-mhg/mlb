import React from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  return (
    <div className="md:w-[200px] bg-white w-full my-3">
      <h1 className="mb-4 font-semibold font-[20px] bg-white border-b-2 p-2">
        Category
      </h1>
      <ul className="px-2">
        <Link
          to={`/product?page=1`}
          className={`p-2 border-b-2 block ${
            !category ? "bg-[#ffd400] text-white" : ""
          }`}
        >
          Tất cả sản phẩm
        </Link>
        <Link
          to={`/product/Phone?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Phone" ? "bg-[#ffd400] text-white" : ""
          }`}
        >
          Điện thoại di động
        </Link>
        <Link
          to={`/product/Tablet?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Tablet" ? "bg-[#ffd400] text-white" : ""
          }`}
        >
          Máy tính bảng
        </Link>
        <Link
          to={`/product/Laptop?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Laptop" ? "bg-[#ffd400] text-white" : ""
          }`}
        >
          Máy tính xách tay
        </Link>
        <Link
          to={`/product/Watch?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Watch" ? "bg-[#ffd400] text-white" : ""
          }`}
        >
          Đồng hồ
        </Link>
      </ul>
    </div>
  );
};

export default Category;
