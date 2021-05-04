import React, { useReducer } from 'react';
import VersionContext from './versionContext';
import VersionReducer from './versionReducer';
import api from '../../api/api';
import { 
  GET_VERSIONS, 
  GET_VERSION, 
  CREATE_VERSION, 
  DELETE_VERSION, 
  UPDATE_VERSION, 
  SET_ERROR, 
  CLEAR_STATE, 
  SET_LOADING,
  GET_VERSIONS_BY_MODEL
} from '../types';

const VersionState = props => {
  const initialState = {
    versions: [],
    version: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(VersionReducer, initialState);

  //Get Versions
  const getVersions = async () => {
    setLoading();
    try {
      const res = await api.get(`/versions?sort=name`);
      dispatch({ type: GET_VERSIONS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Versions By Model
  const getVersionsByModel = async (modelId) => {
    setLoading();
    try {
      const res = await api.get(`/vehicles/${modelId}/versions?sort=name`);
      dispatch({ type: GET_VERSIONS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Version
  const getVersion = async (versionId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/versions/${versionId}`);
      dispatch({ type: GET_VERSION, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Create Version
  const createVersion = async (version) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    clearState();
    setLoading();
    try {
      const res = await api.post(`/versions`, { ...version }, config);
      dispatch({ type: CREATE_VERSION, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  }

   //Delete Version
   const deleteVersion = async (versionId) => {
    clearState();
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    setLoading();

    try {
      
      const res = await api.delete(`/versions/${versionId}`, config);
      dispatch({ type: DELETE_VERSION, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Update Version
  const updateVersion = async (version, versionId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();

    try { 
      const res = await api.put(`/versions/${versionId}`, {...version} ,config);
      dispatch({ type: UPDATE_VERSION, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <VersionContext.Provider
      value={{
        loading: state.loading,
        versions: state.versions,
        version: state.version,
        error: state.error,
        getVersionsByModel,
        getVersions,
        createVersion,
        getVersion,
        deleteVersion,
        updateVersion,
        setLoading, 
        clearState
      }}
    >
      {props.children}
    </VersionContext.Provider>
  );
};

export default VersionState;
