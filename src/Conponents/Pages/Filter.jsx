import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "../Style/Fliter.module.css";

const Filter = () => {
  const [search, setSearch] = useSearchParams();

  const initPrice = search.getAll("byprice");
  const initColor = search.getAll("bycolor");
  const initType = search.getAll("bytype");
  const initGender = search.getAll("bygender");

  const [price, setPrice] = useState(initPrice || "");
  const [color, setColor] = useState(initColor || "");
  const [type, setType] = useState(initType || "");
  const [gender, setGender] = useState(initGender || "");

  const handleChangeByColour = (event) => {
    const option = event.target.value;

    let newfilter = [...color];
    if (color.includes(option)) {
      newfilter.splice(newfilter.indexOf(option), 1);
    } else {
      newfilter.push(option);
    }
    setColor(newfilter);
  };

  const handleChangeByGender = (event) => {
    const option = event.target.value;

    let newfilter = [...gender];
    if (gender.includes(option)) {
      newfilter.splice(newfilter.indexOf(option), 1);
    } else {
      newfilter.push(option);
    }
    setGender(newfilter);
  };

  const handleChangeByType = (event) => {
    const option = event.target.value;

    let newfilter = [...type];
    if (type.includes(option)) {
      newfilter.splice(newfilter.indexOf(option), 1);
    } else {
      newfilter.push(option);
    }
    setType(newfilter);
  };

  const handleChangeByPrice = (event) => {
    const option = event.target.value;
    let newfilter = [...price];
    if (price.includes(option)) {
      newfilter.splice(newfilter.indexOf(option), 1);
    } else {
      newfilter.push(option);
    }
    setPrice(newfilter);
  };

  useEffect(() => {
    if (gender || color || type || price) {
      const params = {};
      gender && (params.bygender = gender);
      color && (params.bycolor = color);
      type && (params.bytype = type);
      price && (params.byprice = price);
      setSearch(params);
    }
  }, [gender, color, type, price]);

  return (
    <div className={styled.fliterContainer}>
      <h4>Colour</h4>
      <div>
        <div>
          <input
            type="checkbox"
            value="Red"
            defaultChecked={color.includes("Red")}
            onChange={handleChangeByColour}
          />
          <span>Red</span>
        </div>
        <div>
          <input
            type="checkbox"
            value="Blue"
            defaultChecked={color.includes("Blue")}
            onChange={handleChangeByColour}
          />
          <span>Blue</span>
        </div>
        <div>
          <input
            type="checkbox"
            value="Green"
            defaultChecked={color.includes("Green")}
            onChange={handleChangeByColour}
          />
          <span>Green</span>
        </div>
      </div>
      <br />
      <h4>Gender</h4>
      <div>
        <div>
          <input
            type="checkbox"
            value="Men"
            defaultChecked={gender.includes("Men")}
            onChange={handleChangeByGender}
          />
          <span>Men</span>
        </div>
        <div>
          <input
            type="checkbox"
            value="Women"
            defaultChecked={gender.includes("Women")}
            onChange={handleChangeByGender}
          />
          <span>Women</span>
        </div>
      </div>
      <br />
      <h4>Price</h4>
      <div>
        <input
          type="checkbox"
          defaultChecked={price.includes("price1")}
          value="price1"
          onChange={handleChangeByPrice}
        />
        <span>0 - Rs 250</span>
        <br />
        <input
          type="checkbox"
          defaultChecked={price.includes("price2")}
          value="price2"
          onChange={handleChangeByPrice}
        />
        <span>Rs 251 - Rs 450</span>
        <br />
        <input
          type="checkbox"
          defaultChecked={price.includes("price3")}
          value="price3"
          onChange={handleChangeByPrice}
        />
        <span>Rs 450 +</span>
      </div>
      <br />
      <h4>Type</h4>
      <div>
        <div>
          <input
            type="checkbox"
            value="Polo"
            defaultChecked={type.includes("Polo")}
            onChange={handleChangeByType}
          />
          <span>Polo</span>
        </div>
        <div>
          <input
            type="checkbox"
            value="Hoodie"
            defaultChecked={type.includes("Hoodie")}
            onChange={handleChangeByType}
          />
          <span>Hoodie</span>
        </div>
        <div>
          <input
            type="checkbox"
            value="Basic"
            defaultChecked={type.includes("Basic")}
            onChange={handleChangeByType}
          />
          <span>Basic</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
