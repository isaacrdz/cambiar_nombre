import React, { useReducer } from "react";
import VehicleContext from "./vehicleContext";
import VehicleReducer from "./vehicleReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-community/async-storage";
import {
  GET_VEHICLES,
  GET_VEHICLES_BY_MAKE,
  GET_VEHICLE,
  DELETE_VEHICLE,
  UPDATE_VEHICLE,
  CREATE_VEHICLE,
  SET_ERROR,
  SET_LOADING,
  CLEAR_STATE,
  GET_VEHICLES_BY_CAT,
} from "../types";

const VehicleState = (props) => {
  const initialState = {
    vehicles: [],
    vehicle: {},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(VehicleReducer, initialState);

  //Get Vehicles
  const getVehiclesByMake = async (makeId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`makes/${makeId}/vehicles`,config);
      dispatch({ type: GET_VEHICLES_BY_MAKE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Vehicles
  const getVehicles = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/vehicles?sort=model`,config);
      dispatch({ type: GET_VEHICLES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Vehicles
  const getVehicle = async (vehicleId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/vehicles/${vehicleId}`,config);
      dispatch({ type: GET_VEHICLE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Delete Vehicle
  const deleteVehicle = async (vehicleId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.delete(`/vehicles/${vehicleId}`, config);
      dispatch({ type: DELETE_VEHICLE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Create Vehicle
  const createVehicle = async (vehicle) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(
        `makes/${vehicle.make}/vehicles`,
        { ...vehicle },
        config
      );
      dispatch({ type: CREATE_VEHICLE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Update Vehicle
  const updateVehicle = async (vehicle, vehicleId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.put(
        `/vehicles/${vehicleId}`,
        { ...vehicle },
        config
      );
      dispatch({ type: UPDATE_VEHICLE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  const getVehicleByCat = async (vehicleCat) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/vehicles/vehiclesByCategory/${vehicleCat}`,config);
      dispatch({ type: GET_VEHICLES_BY_CAT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <VehicleContext.Provider
      value={{
        loading: state.loading,
        vehicles: state.vehicles,
        vehicle: state.vehicle,
        error: state.error,
        getVehiclesByMake,
        getVehicles,
        getVehicle,
        createVehicle,
        deleteVehicle,
        updateVehicle,
        getVehicleByCat,
        clearState,
        setLoading,
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
