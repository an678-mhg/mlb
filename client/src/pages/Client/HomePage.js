import React from "react";
import Banner from "../../components/Banner/Banner";
import ProductsList from "../../components/Products/ProductsList";

const HomePage = () => {
  return (
    <div className="container">
      <Banner />
      <ProductsList category="Phone" title="Điện thoại di động" limit={5} />
      <ProductsList category="Laptop" title="Máy tính xách tay" limit={5} />
      <ProductsList category="Watch" title="Đồng hồ" limit={5} />
      <ProductsList category="Tablet" title="Máy tính bảng" limit={5} />
      <ProductsList category="Loa" title="Loa" limit={5} />
      <ProductsList category="Chuột" title="Chuột" limit={5} />
      <ProductsList category="Bàn phím" title="Bàn phím" limit={5} />
    </div>
  );
};

export default HomePage;
