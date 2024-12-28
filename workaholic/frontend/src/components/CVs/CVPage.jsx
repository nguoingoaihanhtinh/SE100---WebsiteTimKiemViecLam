import React, { useEffect } from "react";
import { useGetCVsQuery } from "../../redux/rtk/cv.service"; // Import the hook
import CV from "./CV";

const CVPage = () => {
  const { cvData, error, isLoading } = useGetCVsQuery(); // Fetch data using the hook

  const data = cvData?.Object;
  console.log("data", data);
  // Check for loading and error states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading CV data.</p>;
  }

  return (
    <div className="">
      <CV />
    </div>
  );
};

export default CVPage;
