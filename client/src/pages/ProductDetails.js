import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Configuration from "../components/Products/Configuration";
import Description from "../components/Products/Description";
import ProductInfo from "../components/Products/ProductInfo";
import SliderPriviewImg from "../components/SliderPreview/SliderPriviewImg";
import { getOneProductApi } from "../api/ProductApi";
import Loading from "../components/Loading/Loading";
import ProductList from "../components/Products/ProductsList";
import Reviews from "../components/Reviews/Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async (id) => {
      try {
        setLoading(true);
        const res = await getOneProductApi(id);
        if (res.data.success) {
          setProduct(res.data.product);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })(id);
  }, [id]);

  return (
    <div className="container">
      <div className="flex gap-4 mt-10 flex-col lg:flex-row md:flex-col">
        <div className="flex-1 bg-white px-2 pt-6 rounded-md shadow-md">
          <h1 className="text-[25px] font-semibold text-center">
            {product?.name}
          </h1>
          <div className="w-full flex gap-3 flex-col md:flex-row">
            <SliderPriviewImg
              thumnail={product?.thumnail}
              listImg={product?.image}
            />
            <ProductInfo data={product} />
          </div>
        </div>
        <Configuration img={product.thumnail} />
      </div>

      <Description />

      <Reviews />

      <ProductList title="Sản phẩm liên quan" category={product?.category} />

      {loading && <Loading />}
    </div>
  );
};

export default ProductDetails;
