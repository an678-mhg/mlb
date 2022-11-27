import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editOderbyId } from "../../api/orderApi";
import { editOrder } from "../../redux/reducers/orderSlice";

const ModalEditOder = ({ data, handleClose }) => {
  const statusOrder = ["Đang xác nhận", "Đã xác nhận"];

  const [oder, setOder] = useState({
    statusOrder: data.statusOrder,
    isPaid: data.isPaid,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setOder({ ...oder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editOderbyId({
        ...data,
        statusOrder: oder.statusOrder,
        isPaid: Boolean(Number(oder.isPaid)),
      });
      if (res.data.success) {
        toast.success("Sửa thành công!");
        dispatch(
          editOrder({
            ...data,
            statusOrder: oder.statusOrder,
            isPaid: Boolean(Number(oder.isPaid)),
          })
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Sửa thất bại!");
    }
    setLoading(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 bottom-0 right-0 left-0 overlay flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] bg-white p-3 rounded-md max-w-full"
      >
        <p className="py-2 px-3">Mã đơn hàng: {data._id}</p>
        <p className="py-2 px-3">Tên khách hàng: {data.name}</p>
        <p className="py-2 px-3">Hình thức thanh toán: {data.payments}</p>
        <p className="py-2 px-3">
          Trạng thái đơn hàng:{" "}
          <select
            onChange={handleOnChange}
            name="statusOrder"
            value={oder.statusOrder}
            className="border p-2 outline-none"
          >
            {statusOrder.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </p>
        <p className="py-2 px-3">
          Trạng thái thanh toán:{" "}
          <select
            onChange={handleOnChange}
            name="isPaid"
            value={Number(oder.isPaid)}
            className="border p-2 outline-none"
          >
            <option value={0}>Chưa thanh toán</option>
            <option value={1}>Đã thanh toán</option>
          </select>
        </p>
        <button
          disabled={loading}
          className="w-full py-2 px-3 text-white text-center bg-[#ffd400] mt-4"
        >
          {loading ? "Loading..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default ModalEditOder;
