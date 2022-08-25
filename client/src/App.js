import React from "react";
import AppRoutes from "./appRoutes/AppRoutes";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/authContext";
import { useUserContext } from "./context/userContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [, handleUserChange] = useUserContext();
  const navigate = useNavigate();

  const [, handleAuthChange] = useAuthContext();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    getUserData(token);
  }, []);

  const getUserData = async (token) => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/me", {
        headers: {
          auth_token: token,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
      }

      const user = await response.json();

      handleUserChange(user.userData);
      handleAuthChange(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
