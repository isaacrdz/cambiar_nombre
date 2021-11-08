import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import api from "../../api/api";
import {
  GET_USERS,
  GET_USER,
  GET_AGENTS,
  UPDATE_USER,
  DELETE_USER,
  CREATE_USER,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_USERS_BY_STORE,
  SET_AGENT,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserState = (props) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
    count: null,
    agents: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const AdvancedResults = async (pagination, query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(
        `/users?page=${pagination.page}&limit=${pagination.limit}${query}&searchType=and`,
        config
      );
      dispatch({
        type: GET_USERS,
        payload: res.data.data,
        count: res.data.pagination.total,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  const getUsers = async (pagination, query, typeQuery) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      let res;
      if (!query) query = "";

      if (pagination) {
        res = await api.get(
          `/users?page=${pagination.page}&limit=${pagination.limit}&searchIndex=name-email-phone-role&searchText=${query}&searchType=${typeQuery}&validation=1`,
          config
        );
      }
      dispatch({
        type: GET_USERS,
        payload: res.data.data,
        count: res.data.pagination.total,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  const setAgent = async (user) => dispatch({ type: SET_AGENT, payload: user });

  //Get Agents
  const getAgents = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    if (!query) query = "";

    setLoading();
    try {
      const res = await api.get(
        `/users/agents?sort=name&role=user&isActive=true${query}`,
        config
      );
      dispatch({ type: GET_AGENTS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Users By Store
  const getUsersByStore = async (pagination, query, typeQuery, multiStores) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(
        `/users?page=${pagination.page}&limit=${pagination.limit}&searchIndex=name-email-phone-role&searchText=${query}&searchType=${typeQuery}&validation=1${multiStores}`,
        config
      );
      dispatch({
        type: GET_USERS_BY_STORE,
        payload: res.data.data,
        count: res.data.pagination.total,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Single Item by ID
  const getUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/users/${userId}`, config);
      dispatch({
        type: GET_USER,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Delete User
  const deleteUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}}`,
      },
    };
    setLoading();
    try {
      const res = await api.delete(`/users/${userId}`, config);
      dispatch({ type: DELETE_USER, payload: res.data.deletedId });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Create User
  const createUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}}`,
      },
    };
    clearUserState();
    setLoading();
    try {
      const res = await api.post(`/users`, { ...user }, config);
      dispatch({ type: CREATE_USER, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Update User
  const updateUser = async (user, userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}}`,
      },
    };
    setLoading();
    try {
      const res = await api.put(`/users/${userId}`, { ...user }, config);
      dispatch({ type: UPDATE_USER, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearUserState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        user: state.user,
        agents: state.agents,
        error: state.error,
        count: state.count,
        getUsers,
        getAgents,
        getUser,
        deleteUser,
        createUser,
        updateUser,
        clearUserState,
        setLoading,
        getUsersByStore,
        AdvancedResults,
        setAgent,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
