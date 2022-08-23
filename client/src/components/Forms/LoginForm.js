import React from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleClickSignup }) => {
  const [_isAuthenticated, handleAuthChange] = useAuthContext();

  const [userInput, setUserInput] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleSignin = async () => {
    const response = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      handleAuthChange(true);
      navigate("/");
    }
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

        <Form.Check type="checkbox" label="Remember me" />

        <p className="text-center mt-4 mb-4" onClick={handleClickSignup}>
          New User? Click here to Signup!
        </p>
      </Form.Group>
      <div className="d-grid mx-auto">
        <Button onClick={handleSignin}>Sign in</Button>
      </div>
    </>
  );
};

export default LoginForm;
