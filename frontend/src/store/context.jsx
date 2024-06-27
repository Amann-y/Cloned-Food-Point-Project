import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [flag, setFlag] = useState(localStorage.getItem("token"));
  const [adminButton, setAdminButton] = useState(false)
  const [token, setToken] = useState(null)
  const [url, setUrl] = useState("http://localhost:5500")

  const storeToken = (token) => {
    localStorage.setItem("token", token);
    setFlag(true);
    setToken(token)
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const removeToken = () => {
    setFlag(false);
    localStorage.removeItem("token");
  };

  const AdminBtn = (val)=>{
    setAdminButton(val)
  }

  return (
    <AppContext.Provider value={{ flag, storeToken, token, removeToken, getToken,AdminBtn, adminButton, url }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
