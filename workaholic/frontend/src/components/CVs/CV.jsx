import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useCreateCVMutation, useGetCVsQuery, useUpdateCVMutation } from "../../redux/rtk/cv.service";
import CVDisplay from "./CVDisplay";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const CV = () => {
  const { data: existingCV, isLoading } = useGetCVsQuery();
  const { userData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    skills: [""],
    experience: [{ company: "", position: "", start_date: "", end_date: "", description: "" }],
    education: [{ degree: "", institution: "", start_date: "", end_date: "" }],
    certifications: [{ name: "", date_obtained: "" }],
  });
  const [previewData, setPreviewData] = useState(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation(existingCV?.id);
  const [sectionsVisibility, setSectionsVisibility] = useState({
    experience: true,
    education: true,
    certifications: false,
  });

  useEffect(() => {
    if (existingCV?.data) {
      const transformedData = {
        title: existingCV.data.title || "",
        summary: existingCV.data.summary || "",
        skills: existingCV.data.skills || [""],
        experience: existingCV.data.experience || [
          { company: "", position: "", start_date: "", end_date: "", description: "" },
        ],
        education: existingCV.data.education || [{ degree: "", institution: "", start_date: "", end_date: "" }],
        certifications: existingCV.data.certifications || [{ name: "", date_obtained: "" }],
      };

      setFormData(transformedData);
      setPreviewData(existingCV.data);
    }
  }, [existingCV]);

  const handleChange = (e, section, index, field) => {
    const value = e.target.value;

    if (section) {
      setFormData((prev) => {
        const updatedSection = [...prev[section]];
        updatedSection[index] = { ...updatedSection[index], [field]: value };
        return { ...prev, [section]: updatedSection };
      });
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: value }));
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return null; // Or redirect logic
  }
  const handleSkillChange = (e, index) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };
  const toggleSection = (section) => {
    setSectionsVisibility((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePreview = () => {
    setPreviewData(formData);
  };

  const handleSubmit = async () => {
    try {
      let result;
      if (existingCV?.data?.id) {
        result = await updateCV({ id: existingCV.data.id, body: formData }).unwrap();
        alert("CV updated successfully!");
      } else {
        result = await createCV(formData).unwrap();
        alert("CV created successfully!");
        const newCV = result.data;
        setFormData({
          title: newCV.title || "",
          summary: newCV.summary || "",
          skills: newCV.skills || [""],
          experience: newCV.experience || [
            { company: "", position: "", start_date: "", end_date: "", description: "" },
          ],
          education: newCV.education || [{ degree: "", institution: "", start_date: "", end_date: "" }],
          certifications: newCV.certifications || [{ name: "", date_obtained: "" }],
        });
        setPreviewData(newCV);
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      alert(error.data?.message || "An error occurred while saving the CV.");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 flex bg-gray-100">
      <div className="display w-1/2">
        <CVDisplay data={previewData || existingCV?.data} />
      </div>
      <div className="add w-1/2 p-5 bg-gray-100">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            CV Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="CV Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black bg-gray-200"
          />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label htmlFor="summary" className="block text-gray-700 font-medium">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black bg-gray-200"
            rows="4"
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-gray-700 font-medium">Skills</p>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(e, index)}
                className="w-full p-2 border border-gray-300 rounded text-black bg-gray-200"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: prev.skills.filter((_, i) => i !== index),
                  }))
                }
                className="p-2 text-white bg-red-500 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }))}
            className="p-2 text-white bg-blue-500 rounded"
          >
            Add Skill
          </button>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-5">
            <p className="text-gray-700 font-medium">Experience</p>
            <p
              onClick={() => toggleSection("experience")}
              className="p-2 text-black bg-transparent rounded hover:cursor-pointer"
            >
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.experience ? "rotate-180" : ""}`}
              />
            </p>
          </div>
          {sectionsVisibility.experience && (
            <>
              {formData.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, "experience", index, "company")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleChange(e, "experience", index, "position")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.start_date}
                    onChange={(e) => handleChange(e, "experience", index, "start_date")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.end_date}
                    onChange={(e) => handleChange(e, "experience", index, "end_date")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, "experience", index, "description")}
                    className="col-span-2 p-2 border border-gray-300 rounded text-black bg-gray-200"
                    rows="2"
                  />
                </div>
              ))}
              <div className="buttons flex justify-between w-full">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: [
                        ...prev.experience,
                        { company: "", position: "", start_date: "", end_date: "", description: "" },
                      ],
                    }))
                  }
                  className="p-2 text-white bg-blue-500 rounded"
                >
                  Add Experience
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: prev.experience.slice(0, -1),
                    }))
                  }
                  className="p-2 text-white bg-red-500 rounded"
                >
                  Remove Experience
                </button>
              </div>
            </>
          )}
        </div>

        {/* Education */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Education</p>
            <p
              onClick={() => toggleSection("education")}
              className="p-2 text-black bg-transparent rounded hover:cursor-pointer"
            >
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.education ? "rotate-180" : ""}`}
              />
            </p>
          </div>
          {sectionsVisibility.education && (
            <>
              {formData.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, "education", index, "degree")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleChange(e, "education", index, "institution")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={edu.start_date}
                    onChange={(e) => handleChange(e, "education", index, "start_date")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={edu.end_date}
                    onChange={(e) => handleChange(e, "education", index, "end_date")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      education: [...prev.education, { degree: "", institution: "", start_date: "", end_date: "" }],
                    }))
                  }
                  className="p-2 text-white bg-blue-500 rounded"
                >
                  Add Education
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      education: prev.education.slice(0, -1),
                    }))
                  }
                  className="p-2 text-white bg-red-500 rounded"
                >
                  Remove Education
                </button>
              </div>
            </>
          )}
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Certifications</p>
            <p
              onClick={() => toggleSection("certifications")}
              className="p-2 text-black bg-transparent rounded hover:cursor-pointer"
            >
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.certifications ? "rotate-180" : ""}`}
              />
            </p>
          </div>
          {sectionsVisibility.certifications && (
            <>
              {formData.certifications.map((cert, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleChange(e, "certifications", index, "name")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                  <input
                    type="date"
                    placeholder="Date Obtained"
                    value={cert.date_obtained}
                    onChange={(e) => handleChange(e, "certifications", index, "date_obtained")}
                    className="p-2 border border-gray-300 rounded text-black bg-gray-200"
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      certifications: [...prev.certifications, { name: "", date_obtained: "" }],
                    }))
                  }
                  className="p-2 text-white bg-blue-500 rounded"
                >
                  Add Certification
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      certifications: prev.certifications.slice(0, -1),
                    }))
                  }
                  className="p-2 text-white bg-red-500 rounded"
                >
                  Remove Certification
                </button>
              </div>
            </>
          )}
        </div>

        <div className="buttons flex justify-between gap-20 px-20 py-5">
          {/* Preview Button */}
          <button type="button" onClick={handlePreview} className="w-full p-2 text-white bg-blue-500 rounded">
            Preview CV
          </button>
          {/* Submit Button */}
          <button type="button" onClick={handleSubmit} className="w-full p-2 text-white bg-green-500 rounded">
            {existingCV ? "Update CV" : "Create CV"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CV;
