import { useState } from "react";
import { FaCircleNotch, FaKey, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/rtk/user.service";

export default function LoginPage() {
  const [login] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // const response = await authApi.login({
    //   email,
    //   password,
    // });
    // if (response?.status === "success") {
    //   window.location.reload();
    // } else {
    // }
    try {
      await login({
        email,
        password,
      }).unwrap();

      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err);
      setShowError(true);
    }
  };
  return (
    <div className="!text-gray-800 w-[500px] mx-auto mt-24 border-[1px] border-gray-300 p-8 rounded-[12px]">
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 ">Sign in</header>
      <p className="text-base ml-2 font-bold mb-1">Email</p>
      <form>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaUser />
          </div>
          <input
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setShowErrorEmail(false);
              setShowError(false);
              setEmail(e.target.value);
            }}
            className={` w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full ${
              (showErrorEmail || showError) && "border-red-400 bg-red-100"
            }`}
          ></input>
        </div>
        {showErrorEmail && <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide an email !!!</p>}
        <p className="ml-2 font-bold mt-3 mb-1">Password</p>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setShowErrorPassword(false);
              setShowError(false);
              setPassword(e.target.value);
            }}
            className={` w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 border-[1px] border-[#F1EFF1] rounded-full ${
              (showErrorPassword || showError) && "border-red-400 bg-red-100"
            }`}
          ></input>
        </div>
        {showErrorPassword && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide a password !!!</p>
        )}
        {showError && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Email or password is not correct !!!</p>
        )}
        <p className="text-xs font-medium ml-2 inline-block underline mt-1 cursor-pointer">Forgot your password ?</p>
        <button
          onClick={(e) => handleLogin(e)}
          className={` mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? "opacity-70" : "hover:opacity-80"
          }`}
        >
          {loading ? <div>{<FaCircleNotch />}</div> : <p>Login</p>}
        </button>
        <div
          onClick={() => {
            navigate("/register");
          }}
          className="text-center mt-3 text-sm font-bold underline cursor-pointer"
        >
          Register now?
        </div>
      </form>
    </div>
  );
}
