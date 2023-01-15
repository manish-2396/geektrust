import React, { useState } from "react";

import styled from "../Style/Home.module.css";
import { BsSearch } from "react-icons/bs";
import Filter from "./Filter";
import Products from "./Products";
import { useSearchParams } from "react-router-dom";



const Home = () => {


  const [text , setText] = useState('')
  const [search, setSearch] = useSearchParams();

  const initPrice = search.getAll("q");

  const handleClick = () => {
    setSearch({q: text.toLowerCase()})
  }


  return (
    <div className={styled.home}>
      <div className={styled.input}>
        <div>
          <input placeholder="Search for Product..." onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <button className={styled.btn} onClick={handleClick}>
            <BsSearch />
          </button>
        </div>
      </div>
      <div className={styled.flexContainer}>
        <div className={styled.FliterContainer}>
          <Filter />
        </div>
        <div>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Home;
