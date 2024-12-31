import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useGetRatingsByCompanyIdQuery } from "../../redux/rtk/rating.service";
import CompanyRatingCard from "./RatingCard";

const CompanyRatingNoEdit = ({ companyId }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [reviews, setReviews] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const { data, isLoading, isFetching, error } = useGetRatingsByCompanyIdQuery({
    companyId,
    page,
    limit: 3,
    sortBy,
  });

  useEffect(() => {
    if (data?.data) {
      setReviews((prevReviews) => [...prevReviews, ...data.data]);
      setTotalRatings(data.totalCount); // Assuming `totalCount` comes from API metadata.
    }
  }, [data]);

  const averageRating =
    reviews.reduce((sum, review) => sum + Number(review?.RatingValue || 0), 0) / reviews.length || 0;

  const loadMoreReviews = () => {
    if (reviews.length < totalRatings) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading && reviews.length === 0) return <p>Loading ratings...</p>;
  if (error) return <p>Failed to fetch ratings. Please try again later.</p>;

  return (
    <div className="flex flex-col gap-[10px] my-10 text-gray-500 bg-white p-5">
      {/* Summary Section */}
      <div className="summary flex text-xl gap-[10px] w-full">
        <FaStar className="text-yellow-400 fill-yellow-400 w-[24px] h-[24px]" />
        <p className="text-text/lg/semibold flex gap-10">
          {averageRating.toFixed(1)} xếp hạng công ty • {totalRatings} đánh giá
        </p>
      </div>

      {/* Ratings List */}
      <div className="content flex flex-col gap-[10px] ">
        {reviews.length > 0 ? (
          reviews.map((review) => <CompanyRatingCard key={review.id} review={review} />)
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {/* Load More Button */}
      {reviews.length < totalRatings && (
        <div className="more-btn flex justify-center">
          <button
            onClick={loadMoreReviews}
            className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Xem thêm đánh giá"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyRatingNoEdit;
