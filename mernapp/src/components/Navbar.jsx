import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("name");
    localStorage.removeItem("dateOfJoining");
    navigate("/Login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link to="/">
          <span className="navbar-brand fs-1 fw-bold fst-italic ">GoFood</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item ">
              <Link className="nav-link active fs-5" to="/">
                Home 
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <Link className="nav-link active fs-5" to="/myorder">
                My Orders
              </Link>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/Login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/Signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="d-flex ">
              <div
                className="btn bg-white text-success mx-1 oncardhover"
                onClick={() => setCartView(true)}
              >
                MyCart &nbsp;
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart></Cart>
                </Modal>
              ) : null}
              <div
                className=" oncardhover btn bg-white text-danger mx-1"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
