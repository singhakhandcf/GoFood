import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("")
  const location=useLocation();
  console.log(location)
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="welcome-bar fw-bold fs-1 pb-5 text-warning">{location.state!==null?`Welcome ${location.state.useremail} `:`Welcome to GoFood`}</div>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                  />
                 
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/250×250/?burger"
                  className="d-block w-100"
                  style={{ filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/300×300/?pasta"
                  className="d-block  w-100"
                  style={{ filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="https://source.unsplash.com/random/300×300/?pizza"
                  className="d-block w-100"
                  style={{ filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="container">
          {foodCat !== []
            ? foodCat.map((data) => {
                return (
                  <div className=" mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                      <hr></hr>
                    </div>
                    <div className="food_items">
                      {foodItem !== []
                        ? foodItem.filter(
                              (item) =>( item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase()))
                            ).map((filterItems) => {
                              return (
                                <div key={filterItems._id} className="oncardhover-container">
                                  <Card foodItem={filterItems} />
                                </div>
                              );
                            })
                        : ""}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
