import React from "react";
import { img_url } from "../utils/contans";
import NumberFormat from "react-number-format";
import { increase, decrease, deleteCart } from "../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cart, showQuanty }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border-t-2 border-b-2 p-6 flex-wrap">
      <div className="flex items-center">
        <div className="w-[100px] rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={cart?.thumnail}
            alt="image"
          />
        </div>
        <div className="text-sm text-[#222] py-2 ml-6">
          <p className="mb-2">
            {cart?.name?.length > 54
              ? cart?.name.slice(0, 54) + "..."
              : cart?.name}
          </p>
          <p className="mb-2">{cart?.memorys}</p>
          <p className="mb-2">{cart?.colors}</p>
          {!showQuanty && <p>Số lượng: {cart.quanty}</p>}
        </div>
      </div>

      {showQuanty && (
        <div className="flex items-center mt-6 md:mt-0">
          <div className="flex items-center justify-center border-2">
            <p
              className="px-2 border-r-2 cursor-pointer"
              onClick={() =>
                dispatch(increase({ key: cart.colors + cart.memorys }))
              }
            >
              <i className="bx bx-plus text-lg"></i>
            </p>
            <p className="text-md px-3">{cart?.quanty}</p>
            <p
              className="px-2 border-l-2 cursor-pointer"
              onClick={() =>
                dispatch(decrease({ key: cart.colors + cart.memorys }))
              }
            >
              <i className="bx bx-minus text-lg"></i>
            </p>
          </div>
          <div className="ml-6">
            <p>
              <NumberFormat
                value={cart?.newPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>
          <div
            className="ml-6"
            onClick={() => dispatch(deleteCart(cart.colors + cart.memorys))}
          >
            <i className="bx bx-x text-2xl"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
