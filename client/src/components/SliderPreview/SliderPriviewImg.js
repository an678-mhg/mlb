import React, { useRef, useState } from "react";
import { img_url } from "../../utils/contans";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const SliderPriviewImg = ({ listImg, thumnail }) => {
  const srcImg = useRef(null);

  const changeImg = (src) => {
    srcImg.current.setAttribute("src", src);
  };

  const [showLightBox, setShowLightBox] = useState({
    status: false,
    src: listImg && img_url + listImg[0],
  });

  const handleOpenLightBox = (e) => {
    setShowLightBox({ status: true, src: e.target.src });
  };

  const handleCloseLightBox = () => {
    setShowLightBox({ ...showLightBox, status: false });
  };

  return (
    <div className="w-full md:w-[50%] max-w-full mt-[55px] relative">
      <div className="w-full">
        <img
          ref={srcImg}
          className="w-full h-full object-cover"
          src={thumnail}
          onClick={handleOpenLightBox}
        />
        <div className="h-80px p-2 grid grid-cols-4 bg-gray-100 gap-1 mt-4 rounded-md text-center absolute bottom-0">
          {(listImg?.length > 0 ? [thumnail, ...listImg] : [thumnail])?.map(
            (p) => (
              <div
                onClick={() => changeImg(p)}
                key={p}
                className="border-2 p-2 aspect-[auto] overflow-hidden"
              >
                <img className="w-full h-full object-cover" src={p} />
              </div>
            )
          )}
        </div>
      </div>

      {showLightBox.status && (
        <Lightbox
          mainSrc={showLightBox.src}
          onCloseRequest={handleCloseLightBox}
        />
      )}
    </div>
  );
};

export default SliderPriviewImg;
