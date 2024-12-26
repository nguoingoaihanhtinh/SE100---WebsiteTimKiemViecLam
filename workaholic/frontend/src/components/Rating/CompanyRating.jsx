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

const CompanyRating = ({ companyId }) => {
  const { userData } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [ratingPoint, setRatingPoint] = useState(1);
  const [editingRatingId, setEditingRatingId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { data, isLoading } = useGetRatingsByCompanyIdQuery(companyId);
  const [createRating] = useCreateRatingMutation();
  const [updateRating] = useUpdateRatingMutation();

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);

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
        const newReview = await createRating(payload).unwrap();
        setReviews([newReview, ...reviews]);
      }

      setContent("");
      setRatingPoint(5);
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
    <div className="flex flex-col gap-[10px] my-10">
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
          <button onClick={handleRatingSubmit} className="bg-blue-600 text-white py-2 px-4 rounded-md w-1/12">
            {editingRatingId ? "Update" : "Submit"}
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">Bạn cần phải đăng nhập để đánh giá</p> // Show message if not logged in
      )}

      {/* Ratings List */}
      <div className="content flex flex-col gap-[10px]">
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
