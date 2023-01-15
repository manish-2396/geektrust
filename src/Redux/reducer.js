import * as types from "./actionType"

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    Cart: [],
    
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.GET_DATA_REQUEST:{
        return {
            isLoading: true,
            isError: false,
            data: [],
            Cart: [],
        }
    }

    case types.GET_DATA_SUCCESS:{
        return {
            isLoading: false,
            isError: false,
            data: payload,
            Cart: JSON.parse(localStorage.getItem("cart")) || [],
        }
    }
    case types.GET_DATA_FAILURE:{
        return {
            isLoading: false,
            isError: true,
            data: payload,
            Cart: []
        }
    }

     case types.GET_CART_DATA_REQUEST:{
        return {
            isLoading: true,
            isError: false,
            Cart: []
        }
    }

    case types.GET_CART_DATA_SUCCESS:{
        return {
            isLoading: false,
            isError: false,
            Cart: payload,
            
        }
    }
    case types.GET_CART_DATA_FAILURE:{
        return {
            isLoading: false,
            isError: true,
            Cart: payload,
        }
    }




  

  default:
    return state
  }
}
