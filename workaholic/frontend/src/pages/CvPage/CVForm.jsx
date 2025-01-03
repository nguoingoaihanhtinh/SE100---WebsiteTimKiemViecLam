import React, { useState, useEffect } from "react";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import axios from 'axios';

const CVForm = ({ viewOnly = false }) => {
  const [cvData, setCvData] = useState({
    title: "Software Developer CV",
    summary: "Experienced software developer specializing in backend development.",
    skills: ["JavaScript", "Node.js", "Sequelize", "MySQL"],
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Backend Developer",
        start_date: "2022-01-01",
        end_date: "2024-12-01",
        description: "Developed and maintained backend APIs for web applications."
      }
    ],
    education: [
      {
        degree: "B.Sc. in Computer Science",
        institution: "Tech University",
        start_date: "2018-09-01",
        end_date: "2022-06-01"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        date_obtained: "2023-05-15"
      }
    ]
  });

  const [cvExists, setCvExists] = useState(false); // Check if CV exists
  const userId = 1;

  useEffect(() => {
    // Fetch the CV if it exists for the user
    const fetchCV = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cv/${userId}`);
        if (response.data) {
          setCvData(response.data); // Populate the form with existing data
          setCvExists(true); // Mark that CV exists
        } else {
          setCvExists(false); // No CV found
        }
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    };

    fetchCV();
  }, [userId]);

  const handleDeleteCV = async () => {
    if (cvData && cvData._id) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/cv/${cvData._id}`);
        setCvData(null); // Clear the CV data
        setCvExists(false); // Mark that CV doesn't exist anymore
        alert("CV deleted successfully!");
      } catch (error) {
        console.error('Error deleting CV:', error);
        alert("Failed to delete CV. Please try again.");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleArrayChange = (index, field, value, section) => {
    const updatedSection = [...cvData[section]];
    updatedSection[index][field] = value;
    setCvData({ ...cvData, [section]: updatedSection });
  };

  const addNewItem = (section, newItem) => {
    setCvData({ ...cvData, [section]: [...cvData[section], newItem] });
  };

  const removeItem = (index, section) => {
    const updatedSection = [...cvData[section]];
    updatedSection.splice(index, 1);
    setCvData({ ...cvData, [section]: updatedSection });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["title", "skills"];
    let isValid = true;
    let errors = [];

    requiredFields.forEach(field => {
      if (Array.isArray(cvData[field]) && cvData[field].length === 0) {
        isValid = false;
        errors.push(`${field} cannot be empty.`);
      } else if (cvData[field] === "" || cvData[field] === null) {
        isValid = false;
        errors.push(`${field} is required.`);
      }
    });

    if (!isValid) {
      alert("Please fill in the required fields:\n" + errors.join("\n"));
      return;
    }

    const submitCV = async () => {
      try {
        const method = cvData._id ? "put" : "post";
        const url = cvData._id
          ? `http://localhost:5000/api/v1/cv/${cvData._id}`
          : "http://localhost:5000/api/v1/cv";
        const response = await axios[method](url, cvData);
        console.log('Success:', response.data);
        alert("CV saved successfully!");
      } catch (error) {
        console.error('Error saving CV:', error);
        alert("Failed to save CV. Please try again.");
      }
    };

    submitCV();
  };

  if (viewOnly) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
  {cvExists ? (
    <>
      {/* Display CV content if CV exists */}
      <h2 className="text-3xl font-semibold text-blue-500 mb-6 border-b-2 border-blue-200 pb-3">Your CV</h2>
      <div>
        {/* Title */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Title:</p>
          <div className="border p-5 rounded-lg border-gray-300">
            <p className="text-gray-700">{cvData.title}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Summary:</p>
          <div className="border p-5 rounded-lg border-gray-300">
            <p className="text-gray-700">{cvData.summary}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Skills:</p>
          <div className="border p-5 rounded-lg border-gray-300">
            <ul className="list-disc pl-6">
              {cvData.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          </div>
        </div>

         {/* Experience */}
         <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Experience:</p>
          {cvData.experience.map((job, index) => (
            <div key={index} className="border p-5 rounded-lg mb-4 border-gray-300">
              {/* Company */}
              <div className="mb-4">
                <p className="font-medium text-gray-700">Company:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{job.company}</p>
                </div>
              </div>

              {/* Position, Dates */}
              <div className="grid grid-cols-1 gap-6 mb-4">
                <div className="mb-4">
                  <p className="font-medium text-gray-700">Position:</p>
                  <div className="border-b pb-2">
                    <p className="text-gray-700">{job.position}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-gray-700">Start Date:</p>
                  <div className="border-b pb-2">
                    <p className="text-gray-700">{job.start_date}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-gray-700">End Date:</p>
                  <div className="border-b pb-2">
                    <p className="text-gray-700">{job.end_date}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-2">
                <p className="font-medium text-gray-700">Description:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{job.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Education:</p>
          {cvData.education.map((edu, index) => (
            <div key={index} className="border p-5 rounded-lg mb-4 border-gray-300">
              <div className="mb-4">
                <p className="font-medium text-gray-700">Degree:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{edu.degree}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium text-gray-700">Institution:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium text-gray-700">Start Date:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{edu.start_date}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium text-gray-700">End Date:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{edu.end_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-blue-500">Certifications:</p>
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="border p-5 rounded-lg mb-4 border-gray-300">
              <div className="mb-4">
                <p className="font-medium text-gray-700">Certification Name:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{cert.name}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium text-gray-700">Date Obtained:</p>
                <div className="border-b pb-2">
                  <p className="text-gray-700">{cert.date_obtained}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Delete Button */}
      <button
        onClick={handleDeleteCV}
        className="bg-red-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-red-700 flex items-center"
      >
        <FaTrash className="mr-2" /> Delete CV
      </button>
    </>
  ) : (
    // Display message if no CV exists
    <div className="text-center mt-6">
      <p className="text-xl text-gray-500">You haven't uploaded a CV yet</p>
    </div>
  )}
</div>
  );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 mr-4 overflow-hidden">
          <input type="file" className="opacity-0 w-full h-full cursor-pointer" title="Upload Picture" />
        </div>
        <div>
          <input
            type="text"
            name="title"
            value={cvData.title}
            onChange={handleChange}
            className="text-2xl font-bold mb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="summary"
            value={cvData.summary}
            onChange={handleChange}
            className="w-full bg-gray-100 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            rows="2"
          ></textarea>
        </div>
      </div>

      {/* Skills Section */}
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      {cvData.skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => handleArrayChange(index, "", e.target.value, "skills")}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => removeItem(index, "skills")}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addNewItem("skills", "")}
        className="text-blue-500 hover:text-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Skill
      </button>

      {/* Experience Section */}
      <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
      {cvData.experience.map((job, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg bg-white shadow-sm">
          <label className="block mb-2">
            Company:
            <input
              type="text"
              value={job.company}
              onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            Position:
            <input
              type="text"
              value={job.position}
              onChange={(e) => handleArrayChange(index, "position", e.target.value, "experience")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            Start Date:
            <input
              type="date"
              value={job.start_date}
              onChange={(e) => handleArrayChange(index, "start_date", e.target.value, "experience")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            End Date:
            <input
              type="date"
              value={job.end_date}
              onChange={(e) => handleArrayChange(index, "end_date", e.target.value, "experience")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              value={job.description}
              onChange={(e) => handleArrayChange(index, "description", e.target.value, "experience")}
              className="w-full p-2 border rounded-lg"
              rows="3"
            ></textarea>
          </label>
          <button
            type="button"
            onClick={() => removeItem(index, "experience")}
            className="text-red-500 hover:text-red-700 flex items-center mt-2"
          >
            <FaTrash className="mr-2" /> Remove Experience
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addNewItem("experience", {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: ""
          })
        }
        className="text-blue-500 hover:text-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Experience
      </button>

      {/* Education Section */}
      <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
      {cvData.education.map((edu, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg bg-white shadow-sm">
          <label className="block mb-2">
            Degree:
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleArrayChange(index, "degree", e.target.value, "education")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            Institution:
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleArrayChange(index, "institution", e.target.value, "education")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            Start Date:
            <input
              type="date"
              value={edu.start_date}
              onChange={(e) => handleArrayChange(index, "start_date", e.target.value, "education")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block mb-2">
            End Date:
            <input
              type="date"
              value={edu.end_date}
              onChange={(e) => handleArrayChange(index, "end_date", e.target.value, "education")}
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <button
            type="button"
            onClick={() => removeItem(index, "education")}
            className="text-red-500 hover:text-red-700 flex items-center mt-2"
          >
            <FaTrash className="mr-2" /> Remove Education
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addNewItem("education", {
            degree: "",
            institution: "",
            start_date: "",
            end_date: ""
          })
        }
        className="text-blue-500 hover:text-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Education
      </button>

      {/* Certifications Section */}
      <h2 className="text-xl font-bold mt-6 mb-4">Certifications</h2>
      {cvData.certifications.map((cert, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={cert.name}
            onChange={(e) => handleArrayChange(index, "name", e.target.value, "certifications")}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Certification Name"
          />
          <input
            type="date"
            value={cert.date_obtained}
            onChange={(e) => handleArrayChange(index, "date_obtained", e.target.value, "certifications")}
            className="p-2 border rounded-lg ml-2"
          />
          <button
            type="button"
            onClick={() => removeItem(index, "certifications")}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addNewItem("certifications", { name: "", date_obtained: "" })
        }
        className="text-blue-500 hover:text-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Certification
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-700 flex items-center"
      >
        <FaSave className="mr-2" /> Save CV
      </button>
    </form>
  );

};

export default CVForm;