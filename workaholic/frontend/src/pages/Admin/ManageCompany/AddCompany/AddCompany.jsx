import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useCreateCompanyMutation, useUpdateCompanyMutation } from "../../../../redux/rtk/company.service";

const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  img: z.string().url("Must be a valid URL"),
  feild: z.string().min(1, "Field is required"),
  //   description: z.string().min(1, "Description is required"),
  rating: z.coerce.number({ invalid_type_error: "Enter valid number" }).min(0, "Rating is required"),
  number_rating: z.coerce.number({ invalid_type_error: "Enter valid number" }).min(0, "Number of ratings is required"),
  longitude: z.coerce.number({ invalid_type_error: "Enter valid number" }).min(-180).max(180, "Invalid longitude"),
  lattidue: z.coerce.number({ invalid_type_error: "Enter valid number" }).min(-90).max(90, "Invalid latitude"),
  address: z.string().min(1, "Address is required"),
  user_id: z.coerce.number({ invalid_type_error: "Enter valid number" }).min(1, "User ID is required"),
});

export default function AddCompanyForm({ onClose, refetch, editCompany }) {
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [text, setText] = useState("");

  const initialValues = {
    name: "",
    img: "",
    feild: "",
    description: "",
    rating: 0,
    number_rating: 0,
    longitude: 0,
    lattidue: 0,
    address: "",
    user_id: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    const payload = { ...data, description: text || "Empty" };

    if (editCompany) {
      const res = await updateCompany({ id: editCompany.id, updatedCompany: payload });
      if (res) {
        window.alert("Update company success");
        refetch();
        onClose();
      }
    } else {
      const res = await createCompany(payload);
      if (res) {
        window.alert("Add company success");
        refetch();
        onClose();
      }
    }
  };

  useEffect(() => {
    if (editCompany) {
      Object.keys(editCompany).forEach((key) => {
        if (key in initialValues) {
          setValue(key, editCompany[key]);
        }
      });
      setText(editCompany.description);
    }
  }, [editCompany]);

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md text-white">
      <div className="flex items-center gap-2 mb-4">
        <div onClick={onClose} className="flex items-center cursor-pointer w-[40px] h-[40px] justify-center">
          <FaChevronLeft />
        </div>
        <h2 className="text-2xl font-bold">{editCompany ? "Update Company" : "Add Company"}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-8 grid grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("name")}
            placeholder="Enter name..."
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            {...register("img")}
            placeholder="Enter image URL..."
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.img && <span className="text-red-500 text-sm">{errors.img.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Field</label>
          <input
            {...register("feild")}
            placeholder="Enter field..."
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.feild && <span className="text-red-500 text-sm">{errors.feild.message}</span>}
        </div>
        <div className="col-span-2 text-black">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <ReactQuill value={text} onChange={setText} className="mt-1 h-[200px]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input {...register("rating")} type="number" className="mt-1 block w-full p-2 border rounded-md" />
          {errors.rating && <span className="text-red-500 text-sm">{errors.rating.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Ratings</label>
          <input {...register("number_rating")} type="number" className="mt-1 block w-full p-2 border rounded-md" />
          {errors.number_rating && <span className="text-red-500 text-sm">{errors.number_rating.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input {...register("longitude")} type="number" className="mt-1 block w-full p-2 border rounded-md" />
          {errors.longitude && <span className="text-red-500 text-sm">{errors.longitude.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input {...register("lattidue")} type="number" className="mt-1 block w-full p-2 border rounded-md" />
          {errors.lattidue && <span className="text-red-500 text-sm">{errors.lattidue.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register("address")}
            placeholder="Enter address..."
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input {...register("user_id")} type="number" className="mt-1 block w-full p-2 border rounded-md" />
          {errors.user_id && <span className="text-red-500 text-sm">{errors.user_id.message}</span>}
        </div>
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            {editCompany ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
