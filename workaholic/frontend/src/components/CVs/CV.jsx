import React, { useState } from "react";
import { useCreateCVMutation, useUpdateCVMutation } from "../../redux/rtk/cv.service";
import CVDisplay from "./CVDisplay";

const CV = ({ existingCV }) => {
  const [formData, setFormData] = useState(
    existingCV || {
      title: "",
      summary: "",
      skills: [""],
      experience: [{ company: "", position: "", start_date: "", end_date: "", description: "" }],
      education: [{ degree: "", institution: "", start_date: "", end_date: "" }],
      certifications: [{ name: "", date_obtained: "" }],
    }
  );
  const [previewData, setPreviewData] = useState(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();

  const handleChange = (e, section, index, field) => {
    const value = e.target.value;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };
  const handlePreview = () => {
    setPreviewData(formData);
  };

  const handleSubmit = async () => {
    if (existingCV) {
      await updateCV({ id: existingCV.id, body: formData });
    } else {
      await createCV(formData);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 flex">
      <div className="display w-1/2">
        <CVDisplay data={previewData} />
      </div>
      <div className="add w-1/2">
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
                onChange={(e) => handleChange(e, "skills", index)}
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
          <p className="text-gray-700 font-medium">Experience</p>
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
        </div>
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
  );
};

export default CV;
