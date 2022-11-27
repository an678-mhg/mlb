import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getReviews, postReview } from "../../api/reviewApi";
import ReviewItem from "./ReviewItem";

const reviews = [
  {
    label: "Rất tệ",
    value: 1,
  },
  {
    label: "Tệ",
    value: 2,
  },
  {
    label: "Bình thường",
    value: 3,
  },
  {
    label: "Tốt",
    value: 4,
  },
  {
    label: "Rất tốt",
    value: 5,
  },
];

const Reviews = () => {
  const [review, setReview] = useState({
    review: "1",
    text: "",
  });

  const [reviewList, setReviewList] = useState([]);

  const params = useParams();

  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();

  const handleOnChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newReview = {
        ...review,
        user: currentUser,
        productId: params.id,
      };
      const res = await postReview({ ...newReview, user: currentUser._id });
      if (res.data.success) {
        return toast.success("Nhận xét thành công!");
      }
      setReviewList([...reviewList, newReview]);
      setReview({
        review: "1",
        text: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Nhận xét thất bại!");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getReviews(params.id);
        if (res.data.success) {
          setReviewList(res.data.reviews);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-semibold font-[20px] bg-white p-2 my-3 rounded-md">
        Đánh giá sản phẩm
      </div>
      <div>
        {currentUser ? (
          <div>
            <div className="flex items-center rounded-md overflow-hidden">
              <input
                required
                onChange={handleOnChange}
                name="text"
                className="bg-white w-full p-2 outline-none flex-1"
                placeholder="Để lại nhận xét của bạn về sản phẩm này!"
                value={review.text}
              />
              <button
                disabled={loading}
                className="py-2 px-3 h-full bg-[#ffd400] text-white"
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
            <div className="mt-3 w-full overflow-hidden">
              <select
                value={review.review}
                required
                onChange={handleOnChange}
                name="review"
                className="w-full p-2 border-none rounded-md outline-none"
              >
                {reviews.map((review) => (
                  <option key={review.value} value={review.value}>
                    {review.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="mt-3 bg-white p-3 text-center rounded-md">
            <h2>
              Bạn cần{" "}
              <Link
                to={`/auth/login?redirect=${encodeURIComponent(
                  location.pathname
                )}`}
                className="text-blue-500"
              >
                đăng nhập
              </Link>{" "}
              để có thể nhận xét!
            </h2>
          </div>
        )}
      </div>
      <div
        className={`${
          reviewList.length >= 3 &&
          "h-[395px] overflow-y-scroll show-scroll-bar"
        }`}
      >
        {reviewList.length > 0 ? (
          reviewList.map((review) => (
            <ReviewItem review={review} key={review._id} />
          ))
        ) : (
          <div className="bg-white text-center p-3 mt-3 rounded-md">
            Chưa có nhận xét nào
          </div>
        )}
      </div>
    </form>
  );
};

export default Reviews;
