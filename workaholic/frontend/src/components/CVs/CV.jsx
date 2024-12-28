import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useCreateCVMutation, useGetCVsQuery, useUpdateCVMutation } from "../../redux/rtk/cv.service";
import CVDisplay from "./CVDisplay";

const CV = () => {
  const { data: existingCV, isLoading } = useGetCVsQuery();
  console.log("exist", existingCV);
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
  const [updateCV] = useUpdateCVMutation();
  const [sectionsVisibility, setSectionsVisibility] = useState({
    experience: false,
    education: false,
    certifications: false,
  });
  useEffect(() => {
    if (existingCV) {
      // Filter out unnecessary fields and format the data
      const transformedData = {
        title: existingCV.title || "",
        summary: existingCV.summary || "",
        skills: existingCV.skills || [""], // Ensure skills is an array
        experience: existingCV.experience || [
          { company: "", position: "", start_date: "", end_date: "", description: "" },
        ], // Ensure experience is an array
        education: existingCV.education || [{ degree: "", institution: "", start_date: "", end_date: "" }],
        certifications: existingCV.certifications || [{ name: "", date_obtained: "" }],
      };

      // Set the form data with the transformed data
      setFormData(transformedData);

      // Set preview data to match the desired format
      setPreviewData(transformedData);
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
      if (existingCV) {
        result = await updateCV({ id: existingCV.id, body: formData }).unwrap();
        alert("CV updated successfully!");
      } else {
        result = await createCV(formData).unwrap();
        alert("CV created successfully!");
      }
      // After successful update or creation, update preview data with the result
      setPreviewData(result); // This assumes the result contains the updated CV data
    } catch (error) {
      alert(error.data?.message || "An error occurred while saving the CV.");
    }
  };
  return (
    <div className="container mx-auto p-6 space-y-6 flex">
      <div className="display w-1/2">
        <CVDisplay data={previewData} />
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
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Experience</p>
            <button onClick={() => toggleSection("experience")}>
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.experience ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {sectionsVisibility.experience && (
            <>
              {formData.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, "experience", index, "company")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleChange(e, "experience", index, "position")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.start_date}
                    onChange={(e) => handleChange(e, "experience", index, "start_date")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.end_date}
                    onChange={(e) => handleChange(e, "experience", index, "end_date")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, "experience", index, "description")}
                    className="col-span-2 p-2 border border-gray-300 rounded"
                    rows="2"
                  />
                </div>
              ))}
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
            </>
          )}
        </div>

        {/* Education */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Education</p>
            <button onClick={() => toggleSection("education")}>
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.education ? "rotate-180" : ""}`}
              />
            </button>
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
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleChange(e, "education", index, "institution")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={edu.start_date}
                    onChange={(e) => handleChange(e, "education", index, "start_date")}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={edu.end_date}
                    onChange={(e) => handleChange(e, "education", index, "end_date")}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
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
            </>
          )}
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Certifications</p>
            <button onClick={() => toggleSection("certifications")}>
              <FaAngleDown
                className={`transform transition-transform ${sectionsVisibility.certifications ? "rotate-180" : ""}`}
              />
            </button>
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
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    placeholder="Date Obtained"
                    value={cert.date_obtained}
                    onChange={(e) => handleChange(e, "certifications", index, "date_obtained")}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
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
