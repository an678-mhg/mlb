import React, { useState } from "react";
import NumberFormat from "react-number-format";
import Option from "./Option";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import { toast } from "react-toastify";

const ProductInfo = ({ data }) => {
  const [colors, setColors] = useState([]);
  const [memorys, setMemorys] = useState([]);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (colors.length === 0 || memorys.length === 0)
      return toast.warn("Hãy chọn màu và phiên bản bộ nhớ !");
    dispatch(
      addToCart({
        ...product,
        colors: colors[0],
        memorys: memorys[0],
        quanty: 1,
      })
    );
    return toast.success("Đã thêm vào giỏ hàng !");
  };

  return (
    <div className="flex-1 mt-4 bg-white p-2">
      <div className="flex items-center">
        <p className="ml-1 text-[30px] text-red-500 font-semibold">
          <NumberFormat
            value={data.newPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"đ"}
          />
        </p>
        <p className="text-gray-500 text-md ml-2 line-through">
          <NumberFormat
            value={data.oldPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"đ"}
          />
        </p>
      </div>
      <button className="bg-[#ffd400] mt-3 w-full px-2 py-1 justify-center text-white rounded-md flex items-center">
        <i className="bx bxs-train text-2xl mr-2"></i> Miễn phí giao hàng
      </button>
      <div className="mt-2">
        <p className="text-sm my-1 font-semibold">Lựa chọn màu sắc</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.colors?.map((p) => (
            <Option
              checkedInput={colors}
              setCheckedInput={setColors}
              key={p}
              content={p}
            />
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm my-1 font-semibold">Lựa chọn phiên bản</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.memorys?.map((p) => (
            <Option
              key={p}
              content={p}
              checkedInput={memorys}
              setCheckedInput={setMemorys}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold mt-2">Khuyến mãi</p>
        <div>
          <button className="p-1 bg-red-400 text-white my-1 rounded-md">
            KM1
          </button>
          <p className="text-xs mt-2">
            Ưu đãi mua kèm: Giảm 100.000 Microsoft 365 Personal 32/64bit 1 năm 1
            user Win/Mac khi mua kèm các sản phẩm laptop và macbook
          </p>
        </div>
        <div>
          <button className="p-1 bg-red-400 text-white my-1 rounded-md">
            KM2
          </button>
          <p className="text-xs mt-2">
            Ưu đãi mua kèm: Giảm 100.000 Office Home & Student 2021 (Vĩnh viễn;
            cho 01 Windows/Mac) khi mua kèm các sản phẩm laptop và macbook
          </p>
        </div>
      </div>
      <button
        onClick={() => handleAddToCart(data)}
        className="bg-[#ffd400] my-3 w-full p-2 justify-center text-white rounded-md flex items-center"
      >
        Thêm sản phẩm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductInfo;
