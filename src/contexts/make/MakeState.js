import React, { useReducer } from 'react';
import MakeContext from './makeContext';
import MakeReducer from './makeReducer';
import api from '../../api/api';
import { 
  GET_MAKES, 
  GET_MAKE, 
  CREATE_MAKE, 
  DELETE_MAKE, 
  UPDATE_MAKE, 
  SET_ERROR, 
  CLEAR_STATE, 
  SET_LOADING 
} from '../types';

const MakeState = props => {
  const initialState = {
    makes: [],
    make: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(MakeReducer, initialState);

  //Get Makes
  const getMakes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      // console.log('okas');
      const res = await api.get(`/makes?sort=name`,config);
      dispatch({ type: GET_MAKES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Make
  const getMake = async (makeId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/makes/${makeId}`,config);
      dispatch({ type: GET_MAKE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Create Make
  const createMake = async (make) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    clearState();
    setLoading();
    try {
      const res = await api.post(`/makes`, { ...make }, config);
      dispatch({ type: CREATE_MAKE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  }

   //Delete Make
   const deleteMake = async (makeId) => {
    clearState();
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    setLoading();

    try {
      
      const res = await api.delete(`/makes/${makeId}`, config);
      dispatch({ type: DELETE_MAKE, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Update Make
  const updateMake = async (make, makeId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();

    try { 
      const res = await api.put(`/makes/${makeId}`, {...make} ,config);
      dispatch({ type: UPDATE_MAKE, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <MakeContext.Provider
      value={{
        loading: state.loading,
        makes: state.makes,
        make: state.make,
        error: state.error,
        getMakes,
        createMake,
        getMake,
        deleteMake,
        updateMake,
        setLoading, 
        clearState
      }}
    >
      {props.children}
    </MakeContext.Provider>
  );
};

export default MakeState;
