import React, { useReducer } from "react";
import StatusContext from "./statusContext";
import StatusReducer from "./statusReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  GET_STATUSES,
  GET_STATUS,
  CREATE_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";

const StatusState = (props) => {
  const initialState = {
    statuses: [],
    status: {},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(StatusReducer, initialState);

  //Get Statuses
  const getStatuses = async () => {
    setLoading();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const res = await api.get(`/status?sort=name`, config);
      dispatch({ type: GET_STATUSES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Status
  const getStatus = async (statusId) => {
    clearStatusState();
    setLoading();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const res = await api.get(`/status/${statusId}`, config);
      dispatch({ type: GET_STATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Delete Status
  const deleteStatus = async (statusId) => {
    setLoading();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const res = await api.delete(`/status/${statusId}`, config);
      dispatch({ type: DELETE_STATUS, payload: res.data.deletedId });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Create Status
  const createStatus = async (status) => {
    clearStatusState();
    setLoading();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const res = await api.post(`/status`, { ...status }, config);
      dispatch({ type: CREATE_STATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Update Make
  const updateStatus = async (status, statusId) => {
    clearStatusState();
    setLoading();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const res = await api.put(`/status/${statusId}`, { ...status }, config);
      dispatch({ type: UPDATE_STATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearStatusState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <StatusContext.Provider
      value={{
        loading: state.loading,
        statuses: state.statuses,
        status: state.status,
        error: state.error,
        getStatus,
        getStatuses,
        createStatus,
        deleteStatus,
        updateStatus,
        clearStatusState,
        setLoading,
      }}
    >
      {props.children}
    </StatusContext.Provider>
  );
};

export default StatusState;
