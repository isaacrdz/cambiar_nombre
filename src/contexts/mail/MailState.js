import React, { useReducer } from 'react';
import MailContext from './mailContext'
import MailReducer from './mailReducer'
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import { 
  CREATE_MAIL, 
  CREATE_MAIL_ATTACHMENT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from '../types';

const MailState = props => {
  const initialState = {
    mails: [],
    mail: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(MailReducer, initialState);

  const clearError = () => dispatch({ type: SET_ERROR })

  //Create Mail
  const createMail = async (mail) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`

      }
    };
    setLoading();
    try {
      const res = await api.post(`/mails`, { ...mail }, config);
      dispatch({ type: CREATE_MAIL, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})
    }
  }

  //Create Mail attachment
  const createMailAttachment = async (mail, attachment, documentNames) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`

      }
    };

    setLoading();
    try {
      const res = await api.post(`/mails`, { ...mail, attachments: attachment, documentNames }, config);
      dispatch({ type: CREATE_MAIL_ATTACHMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})
    }
  }

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <MailContext.Provider
      value={{
        loading: state.loading,
        mails: state.mails,
        mail: state.mail,
        error: state.error,
        createMail,
        clearState,
        setLoading,
        createMailAttachment,
        clearError
      }}
    >
      {props.children}
    </MailContext.Provider>
  );
};

export default MailState;
