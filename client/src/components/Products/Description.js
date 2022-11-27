import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getDescriptionApi } from "../../api/productApi";

const Description = () => {
  const htmlRef = useRef(null);
  const [description, setDescription] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async (id) => {
      try {
        const res = await getDescriptionApi(id);
        if (res.data.success) {
          setDescription(res.data.description);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    if (description?.contentHtml.length > 0) {
      htmlRef.current.innerHTML = description?.contentHtml;
    }
  }, [description]);

  if (!description?.contentHtml.length) {
    return (
      <div className="bg-white mt-4 p-6 rounded-md aspect-[16/9]">
        <img
          className="w-full h-full object-cover"
          src="https://hoanghamobile.com/Content/web/content-icon/no-item.png"
        />
        <p className="mt-6 text-green-500 text-center">
          - - - - - - -Dang Cap Nhat !- - - - - - -
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white mt-4 p-6 rounded-md description">
      <h2 className="font-semibold text-[30px] text-center mb-5">
        Mô tả sản phẩm
      </h2>
      <div className="w-[700px] mx-auto max-w-full" ref={htmlRef}></div>
    </div>
  );
};

export default Description;
