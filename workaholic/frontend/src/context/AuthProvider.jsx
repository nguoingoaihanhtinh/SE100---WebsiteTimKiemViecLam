import { createContext, useState, useEffect } from "react";
import { useCheckLoginQuery } from "../redux/rtk/user.service";
import { useNavigate } from "react-router-dom";
import { useLazyGetJobsSavedQuery } from "../redux/rtk/job.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { data: user, isLoading: isUserLoading } = useCheckLoginQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [savedJobs, setSavedJobs] = useState([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [trigger] = useLazyGetJobsSavedQuery();
  const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(undefined);
  };

  const getSavedJobs = async () => {
    try {
      const res = await trigger().unwrap();
      setSavedJobs(res.data);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  useEffect(() => {
    if (isUserLoading) {
      setIsAuthLoading(true);
    } else {
      if (user && user?.user) {
        getSavedJobs();
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
      } else {
        logout();
      }
      setIsAuthLoading(false);
    }
  }, [user, isUserLoading]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        savedJobs,
        setSavedJobs,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
