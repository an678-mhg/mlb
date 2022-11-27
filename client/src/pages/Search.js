import React, { useEffect, useState } from "react";
import { searchProductApi } from "../api/productApi";
import LoadingCenter from "../components/Loading/LoadingCenter";
import ProductItem from "../components/Products/ProductItem";
import { useSearchParams } from "../hooks/useSearchParams";

const Search = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await searchProductApi(searchParams.get("q"));
        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [searchParams.get("q")]);

  if (loading) {
    return (
      <div className="mt-10">
        <div className="min-h-[600px] flex items-center justify-center">
          <LoadingCenter />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="container">
        <div className="min-h-[600px]">
          <h1 className="font-semibold text-[20px] mb-6 text-center">
            Kết quả tìm kiếm cho: {searchParams.get("q")}
          </h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {results.map((result) => (
              <ProductItem data={result} key={result._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
