import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schema for Validation
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience is required"),
  schedule: z.string().min(1, "Schedule is required"),
  salary_from: z.number().min(1, "Salary from is required"),
  salary_to: z.number().optional(),
  valid_date: z.string().min(1, "Valid date is required"),
  expired_date: z.string().min(1, "Expired date is required"),
  company_id: z.number().min(1, "Company ID is required"),
  jobType_id: z.number().min(1, "Job Type ID is required"),
});

export default function AddJobForm() {
  const initialValues = {
    title: "",
    position: "",
    experience: "",
    schedule: "",
    salary_from: 60000, // Example initial value
    salary_to: 80000, // Example initial value
    valid_date: "2024-01-01", // Example initial value
    expired_date: "2024-12-31", // Example initial value
    company_id: 1, // Example initial value
    jobType_id: 1, // Example initial value
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    // Handle form submission, for example, send data to the backend
    console.log(data);
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Job</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-8 grid grid-cols-2"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            {...register("position")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.position && (
            <span className="text-red-500 text-sm">
              {errors.position.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <input
            {...register("experience")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.experience && (
            <span className="text-red-500 text-sm">
              {errors.experience.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Schedule
          </label>
          <input
            {...register("schedule")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.schedule && (
            <span className="text-red-500 text-sm">
              {errors.schedule.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary From
          </label>
          <input
            type="number"
            {...register("salary_from")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.salary_from && (
            <span className="text-red-500 text-sm">
              {errors.salary_from.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary To
          </label>
          <input
            type="number"
            {...register("salary_to")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.salary_to && (
            <span className="text-red-500 text-sm">
              {errors.salary_to.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valid Date
          </label>
          <input
            type="date"
            {...register("valid_date")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.valid_date && (
            <span className="text-red-500 text-sm">
              {errors.valid_date.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expired Date
          </label>
          <input
            type="date"
            {...register("expired_date")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.expired_date && (
            <span className="text-red-500 text-sm">
              {errors.expired_date.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company ID
          </label>
          <input
            type="number"
            {...register("company_id")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.company_id && (
            <span className="text-red-500 text-sm">
              {errors.company_id.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type ID
          </label>
          <input
            type="number"
            {...register("jobType_id")}
            placeholder="Enter value..."
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2"
          />
          {errors.jobType_id && (
            <span className="text-red-500 text-sm">
              {errors.jobType_id.message}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
