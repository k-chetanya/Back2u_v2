import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // backend cookie auto validates
    setIsAuth(true); // after login
  }, []);

  const login = () => setIsAuth(true);

  const logout = async () => {
    await logoutUser();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);