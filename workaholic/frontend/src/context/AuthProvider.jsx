import { createContext, useState, useEffect } from "react";
import { useCheckLoginQuery } from "../redux/rtk/user.service";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const { data: user } = useCheckLoginQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const navigate = useNavigate();
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(undefined);
  };

  useEffect(() => {
    if (user && user?.user) {
      setUserData(user.user);
      login();
      if (
        user.user.role === "Employer" &&
        !location.pathname.startsWith("/employer") &&
        !location.pathname.startsWith("/login")
      ) {
        navigate("/employer/dashboard");
      }
      if (user.user.role === "User" && location.pathname.startsWith("/employer")) {
        navigate("/");
      } else if (user.user.role === "Admin" && !location.pathname.startsWith("/admin")) {
        navigate("/");
      }
    }
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
