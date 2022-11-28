import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailReg } from "../../constants";
import { Creds } from "./types";

const Login = () => {
  const [credentials, setCredentials] = useState<Creds>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    if (!emailReg.test(credentials.email) && credentials.password.length < 6) {
      setError("Wrong Credentials");
    } else if (
      emailReg.test(credentials.email) &&
      credentials.password.length < 6
    ) {
      setError("Wrong Password");
    } else if (
      !emailReg.test(credentials.email) &&
      credentials.password.length > 5
    ) {
      setError("Wrong Email");
    } else {
      alert("Successful Login");
      navigate("/");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="email"
          name="email"
          className="form-control col-4"
        />
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="password"
          name="password"
          className="form-control col-4"
        />
        <div>{error}</div>
      </div>
      <button
        onClick={handleSignIn}
        className="btn btn-info d-block mx-auto mt-3"
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
