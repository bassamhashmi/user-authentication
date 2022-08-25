import React from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [, handleAuthChange] = useAuthContext();

  const [userInput, setUserInput] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    const user = {
      email: userInput.email,
      password: userInput.password,
    };

    const url = "http://localhost:3001/api/auth/signin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const json = await response.json();

      if (!response.ok) {
        alert("Details are incorrect!");
        return;
      }

      localStorage.setItem("token", json.auth_token);

      handleAuthChange(true);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }

    setUserInput({
      email: "",
      password: "",
    });
  };

  const handleClickSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Form.Group className="mb-3">
        <FloatingLabel label="Email Address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={userInput.email}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={userInput.password}
            onChange={handleInputChange}
          />
        </FloatingLabel>

        <Form.Check className="mb-4" type="checkbox" label="Remember me" />

        <div className="d-grid mx-auto">
          <Button onClick={handleLogin}>Sign in</Button>
        </div>
      </Form.Group>
      <div className="d-grid mx-auto mt-5">
        <Button onClick={handleClickSignup}>
          New User? Click here to Signup!
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
