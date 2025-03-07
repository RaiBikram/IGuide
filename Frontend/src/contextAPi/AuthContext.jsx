import { createContext, useEffect, useState } from "react";

// context
export const AuthContext = createContext();

// provider
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("auth");
    const tokenData = localStorage.getItem("token");
    // console.log("auth", tokenData); // Log the token to ensure it's correctly retrieved

    const parsedData = data ? JSON.parse(data) : null;
    if (parsedData) {
      setAuth(parsedData);
    }

    // Update token state directly from localStorage on first load
    if (tokenData) {
      setToken(tokenData);
    }
  }, []); // The effect runs only once when the component is mounted

  const authData = {
    auth,
    setAuth,
    user,
    setUser,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
