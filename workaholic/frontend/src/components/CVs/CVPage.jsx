import { useGetCVByUserIdQuery } from "../../redux/rtk/cv.service"; // Import the hook
import { useNavigate, useParams } from "react-router-dom";
import CVDisplay from "./CVDisplay";

const CVPage = () => {
  const { id } = useParams();
  const { data: response, error, isLoading } = useGetCVByUserIdQuery(id);
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading CV data.</p>;
  }
  const cvData = response?.data?.[0];
  if (!cvData) {
    return <p>No CV data available.</p>;
  }
  return (
    <div className="flex justify-center p-5">
      <div className="w-1/2">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded h-10"
        >
          Back
        </button>
        <CVDisplay data={cvData} />
      </div>
    </div>
  );
};

export default CVPage;
