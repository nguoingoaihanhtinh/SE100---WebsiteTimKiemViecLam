import { FaEdit } from "react-icons/fa";
import Rating from "./Rating";
import { formatDate } from "../../libs/utils";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteRatingMutation } from "../../redux/rtk/rating.service";
import toast from "react-hot-toast";

const CompanyRatingCard = ({ review, userId, onEdit, onDeleteSuccess }) => {
  const [deleteRating] = useDeleteRatingMutation();
  const handleEditClick = () => {
    if (onEdit) onEdit(review);
  };
  const handleDelete = async () => {
    try {
      await deleteRating(review.id).unwrap();
      toast.success("Rating deleted successfully!");
      if (onDeleteSuccess) onDeleteSuccess(review.id);
    } catch (error) {
      toast.success("Error when deleting rating");
      console.error("Error deleting rating:", error);
    }
  };

  const avatar = review?.User?.avatar || "https://via.placeholder.com/32";
  const name = review?.User?.user_name || "Anonymous";

  return (
    <div className="flex flex-col gap-4 bg-gray-100 rounded-[8px] p-4 w-full">
      <div className="flex gap-4">
        <img src={avatar} alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-md font-semibold">{name}</p>
              <div className="flex items-center gap-2">
                <Rating rating={review.RatingValue} />
                <p className="text-sm text-gray-600">{formatDate(review.updatedAt)}</p>
              </div>
            </div>
            {review.UserId === userId && (
              <div className="buttons flex gap-2 items-center">
                <button onClick={handleEditClick} className="hover:text-blue-500 flex items-center bg-transparent">
                  <FaEdit className="mr-1" />
                </button>
                <button onClick={handleDelete} className="hover:text-red-600 flex items-center bg-transparent">
                  <FaRegTrashCan className="mr-1" />
                </button>
              </div>
            )}
          </div>
          <p className="mt-2 text-sm">{review.Content}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRatingCard;
