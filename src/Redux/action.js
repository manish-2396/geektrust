import * as types from "./actionType";

export const getData = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_REQUEST });
  fetch(
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
  )
    .then((res) => res.json())
    .then((res) => dispatch({ type: types.GET_DATA_SUCCESS, payload: res }))
    .catch((err) => dispatch({ type: types.GET_DATA_FAILURE, payload: err }));
};

export const getCart = () => (dispatch) => {
  dispatch({ type: types.GET_CART_DATA_REQUEST });

  new Promise((res, rej) => {
    let cartArray = JSON.parse(localStorage.getItem("cart"));

    if (cartArray) {
      res(cartArray);
    } else {
      rej("Something went wrong");
    }
  })
    .then((res) =>
      dispatch({ type: types.GET_CART_DATA_SUCCESS, payload: res })
    )
};
