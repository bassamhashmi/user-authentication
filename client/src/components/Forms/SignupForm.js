import React from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";

const SignupForm = ({ handleSignupConfirmed }) => {
  const [userInput, setUserInput] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    const response = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userInput.fullName,
        email: userInput.email,
        password: userInput.password,
      }),
    });

    const json = await response.json();
    handleSignupConfirmed();

    console.log(json);
  };

  const handleInputChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FloatingLabel label="Full Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="firstName lastName"
          name="fullName"
          value={userInput.fullName}
          onChange={handleInputChange}
        />
      </FloatingLabel>
      <FloatingLabel label="Email Address" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={userInput.email}
          onChange={handleInputChange}
        />
      </FloatingLabel>
      <FloatingLabel label="Password" className="mb-5">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={userInput.password}
          onChange={handleInputChange}
        />
      </FloatingLabel>
      <div className="d-grid mx-auto">
        <Button onClick={handleSignup}>Sign Up</Button>
      </div>
    </>
  );
};

export default SignupForm;
