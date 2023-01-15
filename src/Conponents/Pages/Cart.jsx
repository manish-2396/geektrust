import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../Redux/action";
import styled from "../Style/Cart.module.css";

const Cart = () => {
  const { Cart } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  let sum = 0;

 
  for(let i=0; i<Cart.length; i++){
    sum+= Cart[i].price * Cart[i].quantity;
  }

  console.log(sum);


  const handleQuantity = (event, Id) => {
    let { name, color, currency, gender, imageURL, price, type, id } =
      Cart.find((item) => item.id === Id);
    let obj = {
      name,
      id,
      color,
      currency,
      gender,
      imageURL,
      price,
      type,
      quantity: Number(event.target.value),
    };

    let updateCart = [];

    for (let i = 0; i < Cart.length; i++) {
      if (Cart[i].id === Id) {
        updateCart.push(obj);
      } else {
        updateCart.push(Cart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(updateCart));
    dispatch(getCart());
  };

  const handleDelete = (id) => {
    const updateCart = Cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updateCart));
    dispatch(getCart());
  };
  
  return (
    <div>
      <h2 style={{margin:"3rem 3rem"}}>Shopping Cart</h2>
      <div style={{ display: Cart?.length === 0 ? "none" : "block" }}>
        <div className={styled.main}>
          <div>
            {Cart &&
              Cart.map((item) => {
                return (
                  <div key={item.id} className={styled.Cart}>
                    <div>
                      <img
                        className={styled.img}
                        src={item.imageURL}
                        ali={item.type}
                      />
                    </div>
                    <div>
                      <h4>{item.name}</h4>
                      <h4>Rs. {item.price}</h4>
                    </div>
                    <div>
                      <select
                      className={styled.updateCartSelect}
                        value={item.quantity}
                        onChange={(event) => handleQuantity(event, item.id)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div>
                      <button className={styled.delete} onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div style={{ display: Cart?.length > 0 ? "none" : "block" }}>
        <h3 style={{ textAlign: "center" , marginTop: "3rem"}}> No Data on Cart</h3>
      </div>
      <div>
        <h4 style={{textAlign:"center" , marginTop:"2rem"}}>{`Total amount  Rs ${sum}`}</h4>
      </div>
    </div>
  );
};

export default Cart;
