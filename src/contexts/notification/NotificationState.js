import React, { useReducer } from 'react';
import NotificationContext from './notificationContext';
import NotificationReducer from './notificationReducer';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import { CREATE_NOTIFICATION, SET_LOADING, SET_ERROR } from '../types';

const NotificationState = props => {
  const initialState = {
    notifications: [],
    allNotifications: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const createNotification = async (notification) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      const res = await api.post(`/notifications`, { ...notification }, config);
      dispatch({ type: CREATE_NOTIFICATION, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  }

  //Clear State
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <NotificationContext.Provider
      value={{
        loading: state.loading,
        notifications: state.notifications,
        allNotifications: state.allNotifications,
        error: state.error,
        createNotification,
      }}  
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
