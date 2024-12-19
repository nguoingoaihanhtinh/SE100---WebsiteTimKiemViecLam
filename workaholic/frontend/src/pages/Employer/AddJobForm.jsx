import { useForm } from "react-hook-form";
import { z } from 'zod'; // Import Zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateJobMutation, useGetAllJobTypesQuery, useUpdateJobMutation } from "../../redux/rtk/job.service";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.coerce
    .number({
      invalid_type_error: "Enter valid number",
    })
    .min(0, {
      message: "Enter year experience",
    }),
  schedule: z.string().min(1, "Schedule is required"),
  salary_from: z.coerce
    .number({
      invalid_type_error: "Enter valid number",
    })
    .min(0, {
      message: "Enter salary from",
    }),
  salary_to: z.coerce
    .number({
      invalid_type_error: "Enter valid number",
    })
    .optional(),
  valid_date: z.string().min(1, "Valid date is required"),
  expired_date: z.string().min(1, "Expired date is required"),
  jobType_id: z.number().min(1, "Job Type ID is required"),
});

export default function AddJobForm({ onClose, companyId, refetch, editJob }) {
  const { data: jobTypesRes } = useGetAllJobTypesQuery();
  const [jobTypes, setJobTypes] = useState([]);
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [text, setText] = useState("");

  const initialValues = {
    title: "",
    position: "",
    experience: 0,
    schedule: "",
    salary_from: 60000, // Example initial value
    salary_to: 80000, // Example initial value
    valid_date: "2024-01-01", // Example initial value
    expired_date: "2024-12-31", // Example initial value
    jobType_id: 1, // Example initial value
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data) => {
    const payload = { ...data, company_id: companyId, description: text || "Empty" };
    if (editJob) {
      const res = await updateJob({ payload, id: editJob.id });
      if (res) {
        window.alert("Update job success");
        refetch();
        onClose();
      }
    } else {
      const res = await createJob(payload);
      if (res) {
        window.alert("Add job success");
        refetch();
        onClose();
      }
    }
  };
  useEffect(() => {
    if (jobTypesRes?.data) {
      const tmp = jobTypesRes?.data.map((job) => ({
        value: job.id,
        label: job.name,
      }));
      setJobTypes(tmp);
    }
  }, [jobTypesRes]);
  useEffect(() => {
    if (editJob) {
      setValue("title", editJob.title);
      setValue("description", editJob.description);
      setValue("position", editJob.position);
      setValue("experience", editJob.experience);
      setValue("schedule", editJob.schedule);
      setValue("salary_from", editJob.salary_from);
      setValue("salary_to", editJob.salary_to);
      setValue("valid_date", editJob.valid_date);
      setValue("expired_date", editJob.expired_date);
      setValue("jobType_id", editJob.jobType_id);
      setText(editJob.description);
    }
  }, [editJob]);
  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div onClick={() => onClose()} className="flex items-center cursor-pointer w-[40px] h-[40px] justify-center">
          <FaChevronLeft />
        </div>
        <h2 className="text-2xl font-bold">{editJob ? "Update job" : "Add Job"}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-8 grid grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register("title")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            {...register("position")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.position && <span className="text-red-500 text-sm">{errors.position.message}</span>}
        </div>
        <div className="max-h-[200px] min-h-[200px] mb-8">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          {/* <input
            {...register("description")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          /> */}
          <ReactQuill theme="snow" className="h-[200px] " value={text} onChange={setText} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            {...register("experience")}
            placeholder="Enter value..."
            type="number"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Schedule</label>
          <input
            {...register("schedule")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.schedule && <span className="text-red-500 text-sm">{errors.schedule.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary From</label>
          <input
            type="number"
            {...register("salary_from")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.salary_from && <span className="text-red-500 text-sm">{errors.salary_from.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary To</label>
          <input
            type="number"
            {...register("salary_to")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.salary_to && <span className="text-red-500 text-sm">{errors.salary_to.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valid Date</label>
          <input
            type="date"
            {...register("valid_date")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.valid_date && <span className="text-red-500 text-sm">{errors.valid_date.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expired Date</label>
          <input
            type="date"
            {...register("expired_date")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.expired_date && <span className="text-red-500 text-sm">{errors.expired_date.message}</span>}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Job Types</label>

          <Select
            onChange={(e) => setValue("jobType_id", e)}
            style={{ height: "40px" }}
            options={jobTypes}
            className="w-full mt-1"
          />
        </div>
        <div></div>

        <div className="">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
          >
            {editJob ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
