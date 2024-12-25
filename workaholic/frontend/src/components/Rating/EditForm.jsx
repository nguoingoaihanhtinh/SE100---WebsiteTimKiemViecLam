import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useUpdateRatingMutation } from "../../redux/rtk/rating.service";
import toast from "react-hot-toast";

const EditForm = ({ review, onClose }) => {
  const [content, setContent] = useState(review?.Content || "");
  const [ratingPoint, setRatingPoint] = useState(review?.RatingValue || 0);
  const [updateRating, { isLoading, isError, error }] = useUpdateRatingMutation();

  const handleRatingChange = (value) => {
    setRatingPoint(value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!content.trim() || ratingPoint === 0) {
      toast.error("Please provide a rating and a comment.");
      return;
    }

    const payload = {
      RatingValue: ratingPoint,
      Content: content.trim(),
    };

    try {
      await updateRating({ id: review?.id, updatedData: payload }).unwrap();
      toast.success("Rating updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("Failed to update the rating. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold text-center mb-4">Edit Your Rating</h3>

        {/* Rating Stars */}
        <div className="flex gap-2 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`cursor-pointer text-2xl ${ratingPoint >= star ? "text-yellow-500" : "text-gray-400"}`}
            />
          ))}
        </div>

        {/* Textarea for Content */}
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your comment here..."
          className="w-full h-24 p-2 border rounded-md resize-none mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button onClick={onClose} className="text-red-500 font-semibold">
            Close
          </button>
        </div>

        {/* API Error Display */}
        {isError && <p className="text-red-500 text-sm mt-2">{error?.data?.message || "An error occurred."}</p>}
      </div>
    </div>
  );
};

export default EditForm;
