import { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useGetRatingsByCompanyIdQuery } from "../../redux/rtk/rating.service";
import CompanyRatingCard from "./RatingCard";

const CompanyRatingNoEdit = ({ companyId }) => {
  const [reviews, setReviews] = useState([]);
  const { data, isLoading } = useGetRatingsByCompanyIdQuery(companyId);

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);

  const totalRatings = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + Number(review?.RatingValue || 0), 0) / totalRatings || 0;

  if (isLoading) return <p>Loading ratings...</p>;

  return (
    <div className="flex flex-col gap-[10px] my-10 text-gray-500">
      {/* Summary Section */}
      <div className="summary flex text-xl gap-[10px] w-full">
        <FaStar className="text-yellow-400 fill-yellow-400 w-[24px] h-[24px]" />
        <p className="text-text/lg/semibold flex gap-10">
          {averageRating.toFixed(1)} xếp hạng công ty • {totalRatings} đánh giá
        </p>
      </div>

      {/* Ratings List */}
      <div className="content flex flex-col gap-[10px]">
        {reviews.length > 0 ? (
          reviews.map((review) => <CompanyRatingCard key={review.id} review={review} />)
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {/* Load More Button */}
      {totalRatings > reviews?.length && (
        <div className="more-btn flex justify-center">
          <button className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base">
            Xem thêm đánh giá
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyRatingNoEdit;
