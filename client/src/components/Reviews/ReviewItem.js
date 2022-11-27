import React from "react";
import convertReview from "../../utils/convertReview";

const ReviewItem = ({ review }) => {
  return (
    <div className="bg-white p-3 rounded-md mt-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[25px] h-[25px] rounded-md bg-gray-400 flex items-center justify-center text-white">
            {review.user.name[0]}
          </div>
          <p className="ml-2">{review.user.name}</p>
        </div>
        <p className="text-gray-600 text-sm">{review.create_at}</p>
      </div>
      <div className="mt-4">
        <p className="mb-2">
          <span className="font-semibold">Đánh giá: </span>{" "}
          {convertReview(review.review)}
        </p>
        <p>
          <span className="font-semibold">Nhận xét: </span> {review.text}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
