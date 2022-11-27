import React from "react";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { totalUsers } = useSelector((state) => state.managerUsers);
  const { totalProduct } = useSelector((state) => state.product);
  const { totalOrder } = useSelector((state) => state.order);

  const dashBoard = [
    {
      name: "Products",
      count: totalProduct || 0,
      icon: "bx bx-code-alt",
    },
    {
      name: "Users",
      count: totalUsers || 0,
      icon: "bx bx-user",
    },
    {
      name: "Order",
      count: totalOrder || 0,
      icon: "bx bx-barcode",
    },
  ];

  return (
    <div className="p-3 grid lg:grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
      {dashBoard.map((p) => (
        <div
          key={p.name}
          className="bg-[#ffd400] rounded-md px-2 py-4 flex-col flex items-center text-white"
        >
          <i className={`${p.icon} text-2xl`}></i>
          <p className="text-2xl font-semibold my-4">{p.count}</p>
          <p className="text-2xl font-semibold">{p.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DashBoard;
