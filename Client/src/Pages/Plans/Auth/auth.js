import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   const [token, setToken] = useState('');
   const navigate = useNavigate();




  const login = async (username, password) => {
    try {
            const res = await axios.post('http://localhost:5287/api/auth/login', {
              username,
              password
            });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            alert("Login successful!");
            navigate("/leadGet");
          } catch (err) {
            alert("Login failed.");
          }
        };
  //     if (response.data.token) {
  //       // Set the user and token in state
  //       // setUser({
  //       //   username,
  //       //   token: response.data.token,
  //       // });
  //       // Store the token in localStorage for persistence
  //      // localStorage.setItem("token", response.data.token);
  //       setToken(res.data.token);
  //      localStorage.setItem('token', res.data.token);
  //     alert("Login successful!");
  //     } else {
  //       throw new Error("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     throw error;
  //   }
  // };

  const logout = () => {
    // Remove user and token from state
    setUser(null);
    // Remove the token from localStorage
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );};

export const useAuth = () => {
  return useContext(AuthContext);
};
