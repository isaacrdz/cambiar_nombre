import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-community/async-storage";

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
  SET_ERROR,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  SET_LOADING,
  CLEAR_STATE,
} from "../types";

const AuthState = (async = (props) => {
  const initialState = {
    token: "",
    isAuthenticated: false,
    user: {},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Current User
  const loadUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };

    try {
      const res = await api.get(`/auth/me`, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
  };

  //Login User
  const login = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading();

    try {
      const res = await api.post("/auth/login", values, config);
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
});

export default AuthState;
