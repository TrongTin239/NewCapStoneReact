import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  setCookie,
  setStore,
  getStoreJson,
  setStoreJson,
  USER_LOGIN,
} from "../../utils/tools";
const initialState = {
  status: null,
  arrProduct: [],
  productDetail: {},
  carts: {
    productOrder: [],
  },
  orders: {
    orderDetail: [],
    email: "trongtin3311@gmail.com",
  },
  productsFavorite: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      const arrProduct = action.payload;
      state.arrProduct = arrProduct;
    },
    getProductDetailAction: (state, action) => {
      const productDetail = action.payload;
      state.productDetail = productDetail;
    },
    getProductToCartAction: (state, action) => {
      const itemIndex = state.carts.productOrder.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.carts.productOrder[itemIndex].quantityOrder += 1;
        localStorage.setItem(
          "orderProduct",
          JSON.stringify(state.carts.productOrder)
        );
      } else {
        const carts = { ...action.payload };
        state.carts.productOrder.push(carts);
        localStorage.setItem(
          "orderProduct",
          JSON.stringify(state.carts.productOrder)
        );
        // console.log(state.carts.productOrder[0])
      }
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.carts.productOrder.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.carts.productOrder[itemIndex].quantityOrder > 1) {
        state.carts.productOrder[itemIndex].quantityOrder -= 1;
        localStorage.setItem(
          "orderProduct",
          JSON.stringify(state.carts.productOrder)
        );
      }
    },
    deleteProductAction: (state, action) => {
      const id = action.payload;
      const itemIndex = state.carts.productOrder.findIndex(
        (item) => item.id === id
      );
      state.carts.productOrder.splice(itemIndex, 1);
      localStorage.setItem(
        "orderProduct",
        JSON.stringify(state.carts.productOrder)
      );
    },
    clearCartsAction: (state, action) => {
      state.carts.productOrder = action.payload;
    },
    getProductsFavouriteAction: (state, action) => {
      // let id = action.payload.id;
      // let index = state.productsFavorite.findIndex((item) => item.id === id);

      // if (index < 0) {
      //   state.productsFavorite.push(action.payload);
      //   localStorage.setItem(
      //     "productFavourite",
      //     JSON.stringify(state.productsFavorite)
      //   );
      // } else if (index) {
      //   state.productsFavorite.splice(index, 1);
      //   localStorage.setItem(
      //     "productFavourite",
      //     JSON.stringify(state.productsFavorite)
      //   );
      // }
      state.productsFavorite = action.payload;
    },
  },
});

export const {
  getProduct,
  getProductDetailAction,
  getProductToCartAction,
  decreaseCart,
  deleteProductAction,
  clearCartsAction,
  getProductsFavouriteAction,
} = productReducer.actions;

export default productReducer.reducer;

export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "get",
      });
      // console.log(result.data.content);
      // setArrProduct(result.data.content);
      const action = getProduct(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: "get",
      });
      // console.log(result.data.content);
      const action = getProductDetailAction(result.data.content);
      // console.log(action);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductsLikeApi = (
  id,
  accessToken = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://shop.cyberlearn.vn/api/Users/like?productId=${id}`,
        method: "Get",

        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const action = result.data.content;
      // console.log(action);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
export const getProductFavoriteApi = (accessToken) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
        method: "get",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const action = getProductsFavouriteAction(result.data.content);
      // console.log(action);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
