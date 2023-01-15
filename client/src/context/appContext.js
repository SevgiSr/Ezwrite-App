// even if we're deploying our app to the internet,
// when sending api requests to our backend,
// we don't use full url
// but relative routes instead
import React from "react";
import axios from "axios";

// i want to save my login data to browser
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    try {
      //user created in db. token created and sent back
      const response = await axios.post("/auth/register", currentUser);

      const { user, token } = response.data;

      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const loginUser = async (currentUser) => {
    try {
      const { data } = await axios.post("/auth/login", currentUser);
      const { user, token } = data;
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider value={{ registerUser, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};
