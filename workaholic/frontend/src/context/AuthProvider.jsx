import { createContext, useState, useEffect } from "react";
import { useCheckLoginQuery } from "../redux/rtk/user.service";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const { data: user } = useCheckLoginQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(undefined);
  };

  useEffect(() => {
    if (user && user.user) {
      setUserData(user.user);
      login();
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
