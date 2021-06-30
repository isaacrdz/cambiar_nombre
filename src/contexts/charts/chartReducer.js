import { 
  SET_ERROR, 
  CLEAR_STATE,
  SET_LOADING,
  GET_TOTALS_DASHBOARD
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TOTALS_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        loadingCharts: false,
        error: null
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingCharts: false
      };
    case CLEAR_STATE:
      return {
        leadsByStore: [],
        appointmentsByStore: [],
        visitsByStore: [],
        soldsByStore: [],
        monthly: [],
        daily: [],
        models: [],
        hours: [],
        linearStores: [],
        pieStatus: [],
        storeSubstatus: [],
        profitChart: [],
        leadsStoreChart: [],
        total: null,
        totalLeads: null,
        totalVisits: null,
        totalAppointments: null,
        totalSolds: null,
        loadingCharts: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loadingCharts: true
      };
    default:
      return state;
  }
};
