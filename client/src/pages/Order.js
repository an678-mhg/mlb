import React, { useEffect, useState } from "react";
import { getMyOrderApi } from "../api/orderApi";
import OrderTable from "../components/Table/OrderTable";
import Paginate from "../components/Paginate";
import { useSearchParams } from "../hooks/useSearchParams";
import LoadingCenter from "../components/Loading/LoadingCenter";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getMyOrderApi(searchParams.get("page"));
        if (res.data.success) {
          setOrder(res.data.order);
          setTotalPage(res.data.totalPage);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [searchParams.get("page")]);

  if (loading)
    return (
      <div className="mt-10">
        <div className="container flex items-center justify-center h-[600px] bg-white">
          <LoadingCenter />
        </div>
      </div>
    );

  return (
    <div className="mt-10">
      <div className="container">
        <OrderTable order={order} />
        <Paginate totalPage={totalPage} />
      </div>
    </div>
  );
};

export default Order;
