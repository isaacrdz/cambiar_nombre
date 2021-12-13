import React, { useReducer } from "react";
import ChartContext from "./chartContext";
import ChartReducer from "./chartReducer";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SET_ERROR,
  GET_TOTALS_DASHBOARD,
  CLEAR_STATE,
  SET_LOADING,
  GET_LEADS_MONTHLY_CHART,
  GET_CLOSURE_TOP_STORES,
  GET_CLOSURE_TOP_USERS,
  GET_SUBSTATUS_AGENT_CHART,
  GET_PIE_STATUS_CHART,
} from "../types";

const ChartState = (props) => {
  const initialState = {
    total: null,
    totalLeads: null,
    totalVisits: null,
    totalAppointments: null,
    totalSolds: null,
    error: null,
    loadingCharts: false,
    leadsMonthlyChart: false,
    pieStatus: false,
    substatusAgentChart: false,
    closureTopStores: false,
    closureTopUsers: false,
  };

  const [state, dispatch] = useReducer(ChartReducer, initialState);
  //Get Pie Status Chart

  const getPieStatusChart = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/pieStatusChart?${query}`, config);
      dispatch({ type: GET_PIE_STATUS_CHART, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const getSubstatusAgentChart = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/substatusAgentChart?${query}`, config);
      dispatch({ type: GET_SUBSTATUS_AGENT_CHART, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };
  //Get Monthly Leads
  const getLeadsMonthlyChart = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/leadsMonthlyChart?${query}`, config);

      dispatch({ type: GET_LEADS_MONTHLY_CHART, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  //Get Totals Dashboard
  const getTotalsDashboard = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/getTotalsDashboard?${query}`, config);
      dispatch({ type: GET_TOTALS_DASHBOARD, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  //Get Top Users
  const getClosureTopUsers = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/closureTopUsers?${query}`, config);
      dispatch({ type: GET_CLOSURE_TOP_USERS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };
  //Get Top Stores
  const getClosureTopStores = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/charts/closureTopStores`, config);
      dispatch({ type: GET_CLOSURE_TOP_STORES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };
  //Clear State
  const clearCharts = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ChartContext.Provider
      value={{
        loadingCharts: state.loadingCharts,
        error: state.error,

        getTotalsDashboard,
        totalLeads: state.totalLeads,
        totalVisits: state.totalVisits,
        totalAppointments: state.totalAppointments,
        totalSolds: state.totalSolds,
        total: state.total,

        getLeadsMonthlyChart,
        leadsMonthlyChart: state.leadsMonthlyChart,

        getClosureTopUsers,
        closureTopUsers: state.closureTopUsers,

        getClosureTopStores,
        closureTopStores: state.closureTopStores,

        getSubstatusAgentChart,
        substatusAgentChart: state.substatusAgentChart,

        getPieStatusChart,
        pieStatus: state.pieStatus,

        clearCharts,
        setLoading,
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};

export default ChartState;
