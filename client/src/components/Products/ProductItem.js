import React from "react";
import { img_url } from "../../utils/contans";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

const ProductItem = ({ data }) => {
  return (
    <div className="w-full flex flex-col justify-between rounded-md p-3 bg-white">
      <Link
        to={`/product/details/${data._id}`}
        className="overflow-hidden block aspect-auto"
      >
        <img
          className="w-full h-full object-cover img-product"
          src={data.thumnail}
        />
      </Link>
      <div>
        <Link
          to={`/product/details/${data._id}`}
          className="mt-3 block hover:underline transition-all line-clamp-2"
        >
          {data.name}
        </Link>
        <div className="flex items-center justify-center flex-wrap mt-4">
          <p className="text-gray-500 text-xs mr-2 line-through">
            <NumberFormat
              value={data.oldPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
          <p className="ml-1">
            <NumberFormat
              value={data.newPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
        <Link
          to={`/product/details/${data._id}`}
          className="bg-[#ffd400]  text-white rounded-md mt-3 text-center py-2 block w-full"
        >
          View info
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
