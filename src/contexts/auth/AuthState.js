import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  REGISTER_SUCCESS,
  REGISTER,
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
  const clearError = () => dispatch({ type: SET_ERROR });

  const register = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/auth/register", values, config);
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    }
  };

  //Update profile
  const updateProfile = async (values, type) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();

    let res;
    try {
      if (type === "photo") {
        const uploadConfig = await api.post(
          "/uploads/image",
          { type: values.type, fileName: values.name },
          config
        );

        await api.put(uploadConfig.data.url, values, {
          headers: {
            headers: { "Content-Type": values ? values.type : null },
          },
        });

        const dataKey = uploadConfig.data.key;

        res = await api.put(`/auth/updatedetails`, { image: dataKey }, config);
      } else {
        res = await api.put("/auth/updatedetails", values, config);
      }

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data.error,
      });
    }
  };

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
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.error });
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
        type: SET_ERROR,
        payload: err.response.data.error,
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
        clearError,
        login,
        loadUser,
        logout,
        updateProfile,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
});

export default AuthState;
