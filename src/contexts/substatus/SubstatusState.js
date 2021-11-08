import React, { useReducer } from "react";
import SubstatusContext from "./substatusContext";
import SubstatusReducer from "./substatusReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_SUBSTATUSES,
  GET_SUBSTATUS,
  CREATE_SUBSTATUS,
  DELETE_SUBSTATUS,
  UPDATE_SUBSTATUS,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";

const SubstatusState = (props) => {
  const initialState = {
    substatuses: [],
    substatus: {},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(SubstatusReducer, initialState);

  const getSubstatusesByStatus = async (statusId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearSubstatusState();
    setLoading();
    try {
      const res = await api.get(
        `/status/${statusId}/substatus?sort=name`,
        config
      );
      dispatch({ type: GET_SUBSTATUSES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Substatuses
  const getSubstatuses = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearSubstatusState();
    setLoading();
    try {
      const res = await api.get(`/substatus?sort=name`, config);
      dispatch({ type: GET_SUBSTATUSES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Substatus
  const getSubstatus = async (substatusId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearSubstatusState();
    setLoading();
    try {
      const res = await api.get(`/substatus/${substatusId}`, config);
      dispatch({ type: GET_SUBSTATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Create Substatus
  const createSubstatus = async (substatus, status) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };

    clearSubstatusState();
    setLoading();
    try {
      const res = await api.post(
        `status/${status}/substatus`,
        { ...substatus },
        config
      );
      dispatch({ type: CREATE_SUBSTATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Delete Substatus
  const deleteSubstatus = async (substatusId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.delete(`/substatus/${substatusId}`, config);
      dispatch({ type: DELETE_SUBSTATUS, payload: res.data.deletedId });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Update Substatus
  const updateSubstatus = async (substatus, substatusId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearSubstatusState();
    setLoading();

    try {
      const res = await api.put(
        `/substatus/${substatusId}`,
        { ...substatus },
        config
      );
      dispatch({ type: UPDATE_SUBSTATUS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearSubstatusState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <SubstatusContext.Provider
      value={{
        loading: state.loading,
        substatuses: state.substatuses,
        substatus: state.substatus,
        error: state.error,
        getSubstatuses,
        createSubstatus,
        getSubstatus,
        deleteSubstatus,
        updateSubstatus,
        getSubstatusesByStatus,
        setLoading,
        clearSubstatusState,
      }}
    >
      {props.children}
    </SubstatusContext.Provider>
  );
};

export default SubstatusState;
