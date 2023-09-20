import React, { useState,useRef, useEffect} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = ({ foodItem }) => {
  let dispatch = useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  let options = foodItem.options[0];
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


  }
  let finalPrice=qty*parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div className="card mt-3 oncardhover " style={{ width: "18rem", height: "380px" }}>
      <img
        style={{ height: "200px", objectFit: "fill" }}
        src={foodItem.img}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text"></p>
        <div className="container w-100">
          <select className="m-2 h-100   bg-success rounded bg-secondary.bg-gradient" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100  bg-success rounded bg-secondary.bg-gradient" onChange={(e)=>setSize(e.target.value)} ref={priceRef}>
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <div className="d-inline h-100 fs-4">{finalPrice}</div>
          <hr></hr>
          <button
            className="btn bg-warning text-white justify-center "
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
