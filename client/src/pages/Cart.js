import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import NumberFormat from "react-number-format";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const VAT = 10;

  const result = useMemo(() => {
    const totalMoney = cart.reduce((cur, p) => cur + p.quanty * p.newPrice, 0);

    return {
      total: totalMoney + (totalMoney * VAT) / 100,
      totalNotVAT: totalMoney,
    };
  }, [cart]);

  const navigate = useNavigate();

  const handleNavigateCheckout = () => {
    if (cart.length === 0) return;
    navigate("/check-out");
  };

  return (
    <div className="flex items-center justify-center py-10 container flex-col rounded-md">
      <div className="w-full h-[100%] bg-white overflow-auto flex justify-center">
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <div className="mt-6 overflow-auto">
            {cart.length > 0 ? (
              cart?.map((p) => (
                <CartItem showQuanty key={p.colors + p.memorys} cart={p} />
              ))
            ) : (
              <div className="aspect-[16/9] flex justify-center pb-4 flex-col">
                <img
                  className="h-full object-cover"
                  src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"
                />

                <Link
                  to="/product?page=1"
                  className="text-xl text-blue-500 my-4 text-center"
                >
                  Shoping Now !
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-[#dff9fb] p-4">
        <h1 className="text-2xl font-semibold">Sumary</h1>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Total Products</p>
          <p className="text-md">{cart.length}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Giá chưa bao gồm thuế</p>
          <p className="text-md">
            <NumberFormat
              value={result.totalNotVAT}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Thuế VAT</p>
          <p className="text-md">{VAT + "%"}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Total</p>
          <p className="text-md">
            <NumberFormat
              value={result.total}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
      </div>
      <button
        onClick={handleNavigateCheckout}
        className="p-2 bg-[#ffd400] text-black w-[100%] text-xl transition-colors"
      >
        Check Out
      </button>
    </div>
  );
};

export default Cart;
