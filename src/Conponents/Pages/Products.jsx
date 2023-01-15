import { filter } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCart, getData } from "../../Redux/action";
import styled from "../Style/Product.module.css";
import { v4 as uuidv4 } from "uuid";

const Products = () => {
  const [search, setSearch] = useSearchParams();

  const initPrice = search.getAll("byprice");
  const initColor = search.getAll("bycolor");
  const initType = search.getAll("bytype");
  const initGender = search.getAll("bygender");
  const initSearch = search.get("q");

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state);

  let filterData;

  if (data) {
    filterData = data;
  }

  if (initPrice.length === 1) {
    if (initPrice.includes("price1")) {
      filterData = filterData?.filter((e) => e.price <= 250);
    } else if (initPrice.includes("price2")) {
      filterData = filterData?.filter((e) => e.price > 250 && e.price <= 450);
    } else {
      filterData = filterData?.filter((e) => e.price > 450);
    }
  } else if (initPrice.length === 2) {
    if (initPrice.includes("price1") && initPrice.includes("price2")) {
      filterData = filterData.filter(
        (e) => e.price <= 250 || (e.price > 250 && e.price <= 450)
      );
    } else if (initPrice.includes("price1") && initPrice.includes("price3")) {
      filterData = filterData.filter((e) => e.price <= 250 || e.price > 450);
    } else if (initPrice.includes("price2") && initPrice.includes("price3")) {
      filterData = filterData.filter(
        (e) => (e.price > 250 && e.price <= 450) || e.price > 450
      );
    }
  }

  if (initColor.length > 0) {
    filterData = filterData?.filter((e) => initColor.includes(e.color));
  }

  if (initType.length > 0) {
    filterData = filterData?.filter((e) => initType.includes(e.type));
  }

  if (initGender.length > 0) {
    filterData = filterData?.filter((e) => initGender.includes(e.gender));
  }

  if (initSearch) {
    filterData = filterData.filter(
      (e) =>
        e.color.toLowerCase() === initSearch ||
        e.type.toLowerCase() === initSearch ||
        e.name.toLowerCase() === initSearch
    );
  }

  useEffect(() => {
    dispatch(getData());
  }, [getData]);

  const handleCart = (item) => {
    const { name, color, currency, gender, imageURL, price, type } = item;

    let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

    let obj = {
      id: uuidv4(),
      name,
      color,
      currency,
      gender,
      imageURL,
      price,
      quantity: 1,
      type,
    };
    cartArray.push(obj);
    localStorage.setItem("cart", JSON.stringify(cartArray));
    alert("Cart added successfully!");
    dispatch(getData());
  };

  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>Loading...</h4>;
  }

  return (
    <div className={styled.productContainer}>
      {filterData &&
        filterData.map((item) => {
          return (
            <div key={item.id} className={styled.singleProductContainer}>
              <div>
                <h5>{item.name}</h5>
              </div>
              <div>
                <img src={item.imageURL} alt={item.type} />
              </div>
              <div className={styled.priceCartContainer}>
                <div>
                  <h5>Rs.{item.price}</h5>
                </div>
                <div>
                  <button onClick={() => handleCart(item)}>Add to cart</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
