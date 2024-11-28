import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleNotch, FaEnvelope, FaKey, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/rtk/user.service";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [rtkRegister] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await rtkRegister({
        email: data.email,
        userName: data.firstName + data.lastName,
        password: data.password,
        role: "User",
      }).unwrap();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError("email", {
        type: "manual",
        message: "Email has already been used.",
      });
    }
    // const response = await authApi.register({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   password: data.password,
    //   passwordConfirm: data.passwordConfirm,
    // });
    // if (response?.status === "success") {
    //   window.location.reload();
    // } else if (response?.status === "failed" && response?.message === "Email has been used!") {
    // setError("email", {
    //   type: "manual",
    //   message: "Email has already been used.",
    // });
    // }
  };

  const handleRegister = () => {};

  const password = watch("password"); // Watch the password field to compare

  return (
    <div className="!text-gray-800 w-[500px] mx-auto mt-18 border-[1px] border-gray-300 p-8 rounded-[12px]">
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 ">Sign Up</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center">
          <div className="basis-[50%]">
            <p className="text-base ml-2 font-bold mb-1">First Name</p>
            <div className="relative">
              <input
                placeholder="First name..."
                className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]{1,20}$/,
                    message: "First name must be 1-20 characters and contain only letters",
                  },
                })}
              />
              <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                <FaUser />
              </div>
            </div>
            {errors.firstName && <p className="text-red-500 text-sm ml-2">{errors.firstName.message}</p>}
          </div>
          <div className="basis-[50%]">
            <p className="text-base ml-2 font-bold mb-1">Last Name</p>
            <div className="relative">
              <input
                placeholder="Last name..."
                className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]{1,20}$/,
                    message: "Last name must be 1-20 characters and contain only letters",
                  },
                })}
              />
              <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                <FaUser />
              </div>
            </div>
            {errors.lastName && <p className="text-red-500 text-sm ml-2">{errors.lastName.message}</p>}
          </div>
        </div>
        <p className="text-base ml-2 font-bold mb-1 mt-2">Email</p>
        <div className="relative">
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaEnvelope />
          </div>
        </div>
        {errors.email && <p className="text-red-500 text-sm ml-2">{errors.email.message}</p>}
        <p className="text-base ml-2 font-bold mb-1 mt-2">Password</p>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm ml-2">{errors.password.message}</p>}
        <p className="text-base ml-2 font-bold mb-1 mt-2">Password Confirm</p>
        <div className="relative">
          <input
            type="password"
            placeholder="Password Confirm"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("passwordConfirm", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
        </div>
        {errors.passwordConfirm && <p className="text-red-500 text-sm ml-2">{errors.passwordConfirm.message}</p>}
        <button
          type="submit"
          onClick={() => handleRegister()}
          className={` mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? "opacity-70" : "hover:opacity-80"
          }`}
        >
          {loading ? <div>{<FaCircleNotch />}</div> : <p>Register</p>}
        </button>
        <div
          onClick={() => {
            navigate("/login");
          }}
          className="text-center mt-3 text-sm font-bold underline cursor-pointer"
        >
          Login now?
        </div>
      </form>
    </div>
  );
}
