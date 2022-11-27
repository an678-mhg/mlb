import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConfigurationApi } from "../../api/ProductApi";

const Configuration = ({ img }) => {
  const [configuration, setConfiguration] = useState({});

  const { id } = useParams();

  useEffect(() => {
    (async (id) => {
      try {
        const res = await getConfigurationApi(id);
        if (res.data.success) {
          setConfiguration(res.data.configuration);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  return (
    <div className="bg-white py-6 px-2 rounded-md shadow-md overflow-hidden">
      <div className="w-full h-[350px] flex justify-center mb-4">
        <img className="w-full md:w-[350px] h-full object-cover" src={img} />
      </div>
      <div className="w-[400px] flex text-[13px]">
        <div>
          <div className="flex items-start justify-start">
            <p className="p-2">
              Màn hình: {configuration?.display || "Đang cập nhật"}
            </p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">
              Độ phân giải: {configuration?.resolution || "Đang cập nhật"}
            </p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">
              Hệ điều hành: {configuration?.operatingSystem || "Đang cập nhật"}
            </p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">
              Chip xử lí: {configuration?.chipset || "Đang cập nhật"}
            </p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Ram: {configuration?.ram || "Đang cập nhật"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Pin: {configuration?.pin || "Đang cập nhật"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">
              Mạng: {configuration?.mobileNetwork || "Đang cập nhật"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
