import React from "react";
import { useSelector } from "react-redux";
import Paginate from "../../components/Paginate";
import OrderTable from "../../components/Table/OrderTable";

const Oder = () => {
  const { order, totalPageOrder } = useSelector((state) => state.order);

  return (
    <div>
      <OrderTable order={order} />
      <Paginate totalPage={totalPageOrder} />
    </div>
  );
};

export default Oder;
