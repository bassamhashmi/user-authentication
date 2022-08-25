import React from "react";
import { Image, Button } from "react-bootstrap";
import { useAuthContext } from "../context/authContext";
import { useUserContext } from "../context/userContext";

const Dashboard = () => {
  const [, handleAuthChange] = useAuthContext();
  const [user] = useUserContext();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    handleAuthChange(false);
  };

  return (
    <div className="container">
      <div className="row align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-6 offset-3">
          <Image
            src="\assets\img\MERN-logo.png"
            width="300px"
            className="mx-auto d-block"
            alt="logo"
          />
          <h1 className="text-center" style={{ marginTop: "20px" }}>
            Welcome {user?.fullName}
          </h1>
          <p className="text-center mb-5" style={{ marginTop: "20px" }}>
            User Authentication - Built with MERN Stack <br />
            frontEnd and backEnd complete
          </p>

          <div className="d-grid mx-auto">
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>

          <p className="mt-5 mb-3 text-muted text-center">© Bassam Hashmi</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
