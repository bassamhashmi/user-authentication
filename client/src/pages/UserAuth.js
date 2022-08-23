import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import { Image } from "react-bootstrap";
import SignupForm from "../components/Forms/SignupForm";
import { useAuthContext } from "../context/authContext";

const UserAuth = () => {
  const [isAuthenticated, _handleAuthChange] = useAuthContext();
  const [pageName, setPageName] = React.useState("Sign In Page");
  const [newUser, setNewUser] = React.useState(false);

  /////////////////////////////////////
  const handleClickSignup = () => {
    setPageName("Sign Up Page");
    setNewUser(true);
  };

  const handleSignupConfirmed = () => {
    setPageName("Sign In Page");
    setNewUser(false);
  };

  return (
    <div className="container">
      <div className="row align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-4 offset-4">
          <Image
            src="\assets\img\MERN-logo.png"
            width="300px"
            className="mx-auto d-block"
            alt="logo"
          />
          {isAuthenticated ? (
            <h1 className="text-center" style={{ marginTop: "20px" }}>
              You are already logged in!
            </h1>
          ) : (
            <>
              <h1 className="text-center" style={{ marginTop: "20px" }}>
                {pageName}
              </h1>
              <p className="text-center" style={{ marginTop: "20px" }}>
                User Authentication - Built with MERN Stack <br />
                frontEnd and backEnd complete
              </p>
              {newUser ? (
                <SignupForm handleSignupConfirmed={handleSignupConfirmed} />
              ) : (
                <LoginForm handleClickSignup={handleClickSignup} />
              )}
              <p className="mt-5 mb-3 text-muted text-center">
                © Bassam Hashmi
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
