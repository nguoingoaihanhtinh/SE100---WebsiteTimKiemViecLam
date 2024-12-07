import React, { useState } from "react";
import { FaUser, FaEnvelope, FaBriefcase, FaPaperPlane } from "react-icons/fa";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    jobName: "Software Developer",
    name: "John Smith",
    email: "john.smith@example.com",
    coverLetter: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setFormData(prev => ({
        ...prev,
        coverLetter: ""
      }));
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Application Form
        </h2>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Application submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
              <FaBriefcase className="mr-2" />
              Job Name
            </label>
            <input
              type="text"
              name="jobName"
              value={formData.jobName}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
              <FaUser className="mr-2" />
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
              <FaEnvelope className="mr-2" />
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
              <FaPaperPlane className="mr-2" />
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.coverLetter ? "border-red-500" : "border-gray-300"}`}
              placeholder="Write your letter to the employer..."
            ></textarea>
            {errors.coverLetter && (
              <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;