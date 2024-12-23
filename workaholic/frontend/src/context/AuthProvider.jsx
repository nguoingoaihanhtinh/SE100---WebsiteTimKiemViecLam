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
      const role = user.user.role;
      const currentPath = location.pathname;
      if (role === "Employer" && !currentPath.startsWith("/employer") && !currentPath.startsWith("/login")) {
        navigate("/employer/dashboard");
      } else if (role === "User" && currentPath.startsWith("/employer")) {
        navigate("/");
      } else if (role === "Admin" && !currentPath.startsWith("/admin")) {
        navigate("/admin");
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
