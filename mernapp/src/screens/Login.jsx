import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate=useNavigate();
  const handleOnChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    
    if (!json.success) {
      alert("ENTER VALID CREDENTIALS");
    }
    else{
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/",{state:{useremail:localStorage.getItem("userEmail")}})}
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn fw-bold bg-success">
            Submit
          </button>
          <Link className="m-3 btn bg-warning fw-bold" to="/SignUp">
            I am a new user.
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
