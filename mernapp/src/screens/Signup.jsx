import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let navigate=useNavigate();
  const handleOnChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.geolocation,
      }),
    });
    const json=await response.json()
    console.log(json)
    if (!json.success){
        alert('ENTER VALID CREDENTIALS')
    }else{navigate("/Login")}
  };

  return (
    <>
      <div className="container" >
       
        <form onSubmit={handleSubmit}>
          <div className="fs-3 fst-italic fw-bolder text-success text-center">
            SIGN-UP to{" "}
            <span className="text-warning fst-italic fs-2"> GoFood</span>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={handleOnChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              name="geolocation"
              value={credentials.geolocation}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn fw-bold bg-success">
            Submit
          </button>
          <Link className="m-3 btn bg-warning fw-bold" to="/Login">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
