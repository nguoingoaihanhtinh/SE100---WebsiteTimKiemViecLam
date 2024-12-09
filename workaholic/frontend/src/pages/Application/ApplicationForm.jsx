import React, { useState } from "react";
import { FaUser, FaEnvelope, FaBriefcase, FaPaperPlane } from "react-icons/fa";
import { useCreateApplicationMutation } from "../../redux/rtk/application.service";


const JobApplicationForm = ({ JobData, closeForm, user }) => {
  console.log("job", JobData);
  console.log("user", user);
  const [formData, setFormData] = useState({
    jobName: JobData.title, 
    name: user ? user.user_name : "", 
    email: user ? user.email : "", 
    coverLetter: "", 
  });


  const [errors, setErrors] = useState({});
  const [createApplication, { isLoading, isSuccess, isError, error }] =
    useCreateApplicationMutation();

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.coverLetter.trim()) {
      tempErrors.coverLetter = "Cover letter is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createApplication({
          job_id: JobData.id,
          user_id: user.id,
          letter: formData.coverLetter,
        }).unwrap();
        setFormData((prev) => ({ ...prev, coverLetter: "" }));
        if (closeForm) closeForm(); // Close form on success
      } catch (err) {
        console.error("Error creating application:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary-color">Job Application Form</h2>
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Application submitted successfully!
          </div>
        )}
        {isError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error?.data?.message || "Failed to submit the application."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-gray-700">Job Name</label>
            <input
              type="text"
              name="jobName"
              value={formData.jobName}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 bg-gray-200 ${
                errors.coverLetter ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
            ></textarea>
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverLetter}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
