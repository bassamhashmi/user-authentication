import React from "react";
import { Image, Button } from "react-bootstrap";
import { useAuthContext } from "../context/authContext";
import { useUserTokenContext } from "../context/userTokenContext";

const Dashboard = () => {
  const [_isAuthenticated, handleAuthChange] = useAuthContext();
  const [userToken, { handleUserTokenChange }] = useUserTokenContext();
  const [userFullName, serUserFullName] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api/auth/me", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          auth_token: userToken,
        },
      });

      const json = await response.json();

      serUserFullName(json.userData.fullName);
    };

    fetchData();
  }, []);

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
            Welcome {userFullName}
          </h1>
          <p className="text-center mb-5" style={{ marginTop: "20px" }}>
            User Authentication - Built with MERN Stack <br />
            frontEnd and backEnd complete
          </p>

          <div className="d-grid mx-auto">
            <Button
              onClick={() => {
                handleAuthChange(false);
              }}
            >
              Sign Out
            </Button>
          </div>
          {/* <div className="d-grid mx-auto">
            <Button onClick={handlebtnClick}>Get User Data</Button>
          </div> */}

          <p className="mt-5 mb-3 text-muted text-center">© Bassam Hashmi</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
