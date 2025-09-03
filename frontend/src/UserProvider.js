import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // Check for token on app load and set the user
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      const storedUserId = localStorage.getItem("userId");
      // console.log("User Data:", userData);
      // console.log("Stored User ID:", storedUserId);
      setUser(userData);
      setUserId(storedUserId);
    }
  }, [token]);

  // Login function to store the token and user data
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userId", userData._id);
    setToken(token);
    setUser(userData);
    setUserId(userData._id);
  };

  // Logout function to remove token and user data
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setToken(null);
    setUser(null);
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ user, token, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
