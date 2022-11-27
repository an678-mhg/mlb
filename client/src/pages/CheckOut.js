import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { createOrderApi } from "../api/orderApi";
import { cleanCart } from "../redux/reducers/cartSlice";
import Loading from "../components/Loading/Loading";

const CheckOut = () => {
  const [newOrder, setNewOrder] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    note: "",
    totalOrder: "",
    statusOrder: "Đang xác nhận",
    payments: "Ship COD",
    isPaid: false,
  });

  const onChangeInput = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const { cart } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const VAT = 10;

  const result = useMemo(() => {
    const totalMoney = cart.reduce((cur, p) => cur + p.quanty * p.newPrice, 0);

    return {
      total: totalMoney + (totalMoney * VAT) / 100,
      totalNotVAT: totalMoney,
    };
  }, [cart]);

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createOrderApi({
        ...newOrder,
        products: cart,
        totalOrder: result.total,
      });
      if (res.data.success) {
        dispatch(cleanCart());
        setLoading(false);
        navigate("/thank-you");
        toast.success("Mua hàng thành công!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Mua hàng thất bại!");
      setLoading(false);
    }
  };

  if (cart.length === 0) return <Navigate to="/" />;

  return (
    <div className="mt-10">
      <div className="container flex bg-white justify-between md:flex-row flex-col py-4">
        <div className="md:w-[65%] w-full">
          <div className="shadow-md p-4">
            <h1 className="text-[20px] font-semibold">Tạo mới đơn hàng</h1>
            <form onSubmit={formSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block mb-3">Tên khách hàng</label>
                <input
                  type="text"
                  name="name"
                  value={newOrder.name}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: Nguyen Van A"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Số điện thoai</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={newOrder.phoneNumber}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: 0843050478"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newOrder.email}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: mlb@gmail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={newOrder.address}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: Viet Nam"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Phương thức thanh toán</label>
                <select
                  name="payments"
                  value={newOrder.payments}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: Viet Nam"
                  required
                >
                  <option value="Ship COD">Ship COD</option>
                  <option value="Bank card">Thẻ ngân hàng</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-3">Ghi chú</label>
                <textarea
                  rows={4}
                  type="text"
                  name="note"
                  value={newOrder.note}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>

              <button className="w-full px-2 py-1 text-white text-[18px] bg-[#ffd400] rounded-md">
                Mua hàng
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-[700px] overflow-auto shadow-md">
          <div className="p-4">
            <h1 className="text-[20px] font-semibold">Tổng giá trị đơn hàng</h1>
          </div>
          <div>
            {cart.map((p) => (
              <CartItem showQuanty key={p.colors + p.memorys} cart={p} />
            ))}
          </div>
          <div className="w-[100%] bg-[#ffd400] p-4 text-white">
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
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default CheckOut;
