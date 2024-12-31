import { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import EditForm from "./EditForm";
import {
  useCreateRatingMutation,
  useGetRatingsByCompanyIdQuery,
  useUpdateRatingMutation,
} from "../../redux/rtk/rating.service";
import CompanyRatingCard from "./RatingCard";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { Pagination, Select } from "antd";

const CompanyRating = ({ companyId }) => {
  const { userData } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [ratingPoint, setRatingPoint] = useState(1);
  const [editingRatingId, setEditingRatingId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("-createdAt");

  const { data, isLoading } = useGetRatingsByCompanyIdQuery({
    companyId,
    page,
    limit: 4,
    sortBy,
  });
  const [createRating] = useCreateRatingMutation();
  const [updateRating] = useUpdateRatingMutation();

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);
  const totalPages = data?.pagination?.totalPages;

  const handleRatingContentChange = (e) => setContent(e.target.value);
  const handleRatingChange = (value) => setRatingPoint(value);

  const handleRatingSubmit = async () => {
    if (!content || !ratingPoint) {
      toast.error("Content and rating value are required!");
      return;
    }

    try {
      const payload = {
        UserId: userData?.id,
        CompanyId: companyId,
        RatingValue: ratingPoint,
        Content: content,
      };

      if (editingRatingId) {
        const updatedReview = await updateRating({ id: editingRatingId, updatedData: payload }).unwrap();
        setReviews(reviews.map((review) => (review.id === editingRatingId ? updatedReview : review)));
        setEditingRatingId(null);
      } else {
        await createRating(payload).unwrap();
      }

      setContent("");
      setRatingPoint(0);
      toast.success("Rating submitted successfully!"); // Show success toast
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating!"); // Show error toast
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setEditingRatingId(review.id);
    setContent(review.Content);
    setRatingPoint(review.RatingValue);
  };

  const handleCloseEditForm = () => {
    setSelectedReview(null);
    setEditingRatingId(null);
  };

  const handleDeleteSuccess = (deletedReviewId) => {
    setReviews(reviews.filter((review) => review.id !== deletedReviewId));
  };

  const totalRatings = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + Number(review?.RatingValue || 0), 0) / totalRatings || 0;

  if (isLoading) return <p>Loading ratings...</p>;

  return (
    <div className="flex flex-col gap-[10px] my-10 p-4 border-[1px] rounded-[8px] bg-white">
      {/* Summary Section */}
      <div className="summary flex text-xl gap-[10px] w-full">
        <FaStar className="text-yellow-400 fill-yellow-400 w-[24px] h-[24px]" />
        <p className="text-text/lg/semibold flex gap-10">
          {averageRating.toFixed(1)} xếp hạng công ty • {totalRatings} đánh giá
        </p>
      </div>

      {/* Rating Form (Only if user is logged in) */}
      {userData ? (
        <div className="flex flex-col gap-5">
          <div className="header pl-10 text-center">
            <h4 className="text-xl font-semibold py-3">Đánh giá công ty</h4>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((el) => (
                <FaStar
                  key={el}
                  onClick={() => handleRatingChange(el)}
                  className={`cursor-pointer text-2xl ${ratingPoint >= el ? "text-yellow-500" : "text-gray-500"}`}
                />
              ))}
            </div>
          </div>

          <textarea
            value={content}
            onChange={handleRatingContentChange}
            placeholder="Write your comment here..."
            className="border h-[150px] p-2 w-full bg-gray-200 rounded-xl"
          />
          <div className="flex justify-end">
            <div
              onClick={handleRatingSubmit}
              className="bg-blue-600 text-white text-center cursor-pointer py-2 px-4 rounded-[4px] "
            >
              {editingRatingId ? "Update" : "Submit"}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Bạn cần phải đăng nhập để đánh giá</p> // Show message if not logged in
      )}

      {/* Ratings List */}
      <div className="content flex flex-col gap-[10px]">
        <div className="flex">
          <Select
            defaultValue="-createdAt"
            style={{ width: 120 }}
            onChange={(vl) => setSortBy(vl)}
            options={[
              { value: "-createdAt", label: "Newest" },
              { value: "createdAt", label: "Oldest" },
              { value: "-RatingValue", label: "Most rating" },
              { value: "RatingValue", label: "Lowest rating" },
            ]}
          />
        </div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <CompanyRatingCard
                review={review}
                userId={userData?.id}
                onEdit={handleEdit}
                onDeleteSuccess={handleDeleteSuccess}
              />
              {selectedReview && selectedReview?.id === review?.id && (
                <EditForm review={selectedReview} onClose={handleCloseEditForm} />
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
        <div className="flex items-center justify-center">
          <Pagination current={page} total={totalPages} onChange={(e) => setPage(e)} pageSize={2} />
        </div>
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

export default CompanyRating;
