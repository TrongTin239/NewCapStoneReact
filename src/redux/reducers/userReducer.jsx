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
import { history } from "../../index";
import { useDispatch } from "react-redux";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
  messRegister: {},
  messLogin: {},
  messUpdate: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getMessageLoginAction: (state, action) => {
      state.messLogin = action.payload;
    },
    getMessageRegisterAction: (state, action) => {
      state.messRegister = action.payload;
    },
  },
});

export const {
  getProfileAction,
  getMessageLoginAction,
  getMessageRegisterAction,
} = userReducer.actions;

export default userReducer.reducer;

export const signupApi = (userData) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: userData,
      });
      console.log(result.data.content);
      history.push("/login");
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(getMessageRegisterAction(err.response.data));
    }
  };
};

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        data: userLogin,
      });
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.accessToken);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);

      history.push("/profile");
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(getMessageLoginAction(err.response.data));
    }
  };
};

export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
  console.log(accessToken);
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getProfile",
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const action = getProfileAction(result.data.content);
      dispatch(action);

      //Save username, password to local storage
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProfileApi = (
  updateData,
  accessToken = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/updateProfile",
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: updateData,
      });
      console.log(result);
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
    }
  };
};
