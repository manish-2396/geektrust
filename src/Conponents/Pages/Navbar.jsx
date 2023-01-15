import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import styled from "../Style/Navbar.module.css";
import { textDecoration } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../Redux/action";

const Navbar = () => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCart());
  }, [getCart]);

  return (
    <nav className={styled.nav}>
      <div className={styled.nav}>
        <div>TeeRex Store</div>
      </div>
      <div className={styled.nav}>
        <div>
          <NavLink style={{ textDecoration: "none", fontSize: "1rem" }} to="/">
            Products
          </NavLink>
        </div>

        <NavLink to="/cart" style={{ textDecoration: "none" }}>
          <div className={styled.newcart}>
            <BsCart3 />
            <div className={styled.qunatutyCart}>{Cart.length}</div>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
