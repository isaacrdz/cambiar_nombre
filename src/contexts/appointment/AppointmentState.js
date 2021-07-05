import React, { useReducer } from 'react';
import AppointmentContext from './appointmentContext';
import AsyncStorage from "@react-native-community/async-storage";
import AppointmentReducer from './appointmentReducer';
import api from '../../api/api';
import { 
  GET_APPOINTMENTS, 
  CREATE_APPOINTMENT, 
  GET_APPOINTMENT, 
  DELETE_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_APPOINTMENTS_BY_USER,
  GET_APPOINTMENTS_BY_STORE,
  GET_APPOINTMENTS_AR
} from '../types';

const AppointmentState = props => {
  const initialState = {
    appointments: [],
    appointment: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(AppointmentReducer, initialState);

  //Get Appointments
  const getAppointments = async () => {
    setLoading();
    try {
      const res = await api.get(`/appointments?status=true`);
      dispatch({ type: GET_APPOINTMENTS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Appointments By User
  const getAppointmentsByUser = async (userId) => {
    setLoading();
    try {
      const res = await api.get(`users/${userId}/appointments`);
      dispatch({ type: GET_APPOINTMENTS_BY_USER, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Appointments By Store
  const getAppointmentsByStore = async (stores) => {
    setLoading();
    try {
      const res = await api.get(`/appointments/admin?${stores}&status=true`);
      dispatch({ type: GET_APPOINTMENTS_BY_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get Appointment
   const getAppointment = async (appointmentId) => {
    setLoading();
    try {
      const res = await api.get(`/appointments/${appointmentId}`);
      dispatch({ type: GET_APPOINTMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Delete Appointment
  const deleteAppointment = async (appointmentId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/appointments/${appointmentId}`, config);
      dispatch({ type: DELETE_APPOINTMENT, payload: res.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };


  //Create Appointment
  const createAppointment = async (appointment) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/appointments`, { 
        ...appointment,
        endDate: appointment.allDay ? appointment.startDate : appointment.endDate,
      }, config);
      dispatch({ type: CREATE_APPOINTMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update Appointment
  const updateAppointment = async (appointment, appointmentId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.put(`/appointments/${appointmentId}`, {...appointment} ,config);
      dispatch({ type: UPDATE_APPOINTMENT, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get appointments AdvancedResults
  const getAppointmentsAR = async (search) =>{
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.get(`/appointments${search}` ,config);
      dispatch({ type: GET_APPOINTMENTS_AR, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  }

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AppointmentContext.Provider
      value={{
        loading: state.loading,
        appointments: state.appointments,
        appointment: state.appointment,
        error: state.error,
        getAppointments,
        createAppointment,
        getAppointment,
        deleteAppointment,
        updateAppointment,
        clearState,
        setLoading,
        getAppointmentsByUser,
        getAppointmentsByStore,
        getAppointmentsAR
      }}
    >
      {props.children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentState;
