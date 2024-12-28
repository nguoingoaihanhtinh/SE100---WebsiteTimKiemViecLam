import { useGetCVByUserIdQuery } from "../../redux/rtk/cv.service"; // Import the hook
import { useParams } from "react-router-dom";
import CVDisplay from "./CVDisplay";

const CVPage = () => {
  const { id } = useParams();
  const { data: response, error, isLoading } = useGetCVByUserIdQuery(id);

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
    <div className="flex justify-center">
      <div className="w-1/2">
        <CVDisplay data={cvData} />
      </div>
    </div>
  );
};

export default CVPage;
