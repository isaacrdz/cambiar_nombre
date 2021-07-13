import React, { useReducer } from 'react';
import DocumentContext from './documentContext';
import DocumentReducer from './documentReducer';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import { 
  GET_DOCUMENTS, 
  GET_DOCUMENTS_BY_STORE, 
  CREATE_DOCUMENT, 
  GET_DOCUMENT, 
  DELETE_DOCUMENT, 
  UPDATE_DOCUMENT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
 } from '../types';

const DocumentState = props => {
  const initialState = {
    documents: [],
    document: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(DocumentReducer, initialState);

  //Get Documents
  const getDocuments = async () => {
    setLoading();
    try {
      const res = await api.get(`/documents?sort=title`);
      dispatch({ type: GET_DOCUMENTS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

   //Get Document
   const getDocument = async (documentId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/documents/${documentId}`);
      dispatch({ type: GET_DOCUMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  const getDocumentsByMultiStore = async (query) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/documents/multiStores?${query}`);
      dispatch({ type: GET_DOCUMENTS_BY_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Document
  const getDocumentsByStore = async (storeId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/stores/${storeId}/documents`);
      dispatch({ type: GET_DOCUMENTS_BY_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Create Document
  const createDocument = async (document, file) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`

      }
    };
    setLoading();

    try {
      const uploadConfig = await api.post("/uploads/image", { type: file.type, fileName: file.name }, config);

      await api.put(uploadConfig.data.url, file,
        {
          headers: { "Content-Type": file ? file.type : null }
        }
      );

      const dataKey = uploadConfig.data.key;

      const res = await api.post(`/documents`, { ...document, file: dataKey }, config);
      dispatch({ type: CREATE_DOCUMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

   //Delete Document
   const deleteDocument = async (documentId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`

      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/documents/${documentId}`, config);
      dispatch({ type: DELETE_DOCUMENT, payload: res.data.deletedId })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Update Document
  const updateDocument = async (document, documentId, file) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`

      }
    };
    setLoading();
    try {
      let res;
      let uploadConfig;
      if(file){
      uploadConfig = await api.post("/uploads/image", { type: file.type, fileName: file.name },config);

      await api.put(uploadConfig.data.url, file, {
        headers: {
          headers: { "Content-Type": file ? file.type : null }
        }
      });

      const dataKey = uploadConfig.data.key;

      res = await api.post(`/documents`, { ...document, file: dataKey }, config);
      dispatch({ type: UPDATE_DOCUMENT, payload: res.data.data });
      }else{
        res = await api.put(`/documents/${documentId}`, {...document} ,config);
        dispatch({ type: UPDATE_DOCUMENT, payload: res.data.data })
      }
      
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <DocumentContext.Provider
      value={{
        loading: state.loading,
        documents: state.documents,
        document: state.document,
        error: state.error,
        getDocuments,
        getDocument,
        createDocument,
        deleteDocument,
        updateDocument,
        getDocumentsByStore,
        getDocumentsByMultiStore,
        clearState,
        setLoading
      }}
    >
      {props.children}
    </DocumentContext.Provider>
  );
};

export default DocumentState;
