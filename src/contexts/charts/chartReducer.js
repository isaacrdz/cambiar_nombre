import { 
  SET_ERROR, 
  CLEAR_STATE,
  SET_LOADING,
  GET_TOTALS_DASHBOARD,
  GET_LEADS_MONTHLY_CHART,
  GET_CLOSURE_TOP_STORES,
  GET_CLOSURE_TOP_USERS,
GET_SUBSTATUS_AGENT_CHART,
GET_PIE_STATUS_CHART
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LEADS_MONTHLY_CHART:
      return {
        ...state,
        leadsMonthlyChart: {
          categories: action.payload.categories,
          serie: action.payload.bar.series[0].data
        },
        loadingCharts: false,
        error: null
      }
      case GET_SUBSTATUS_AGENT_CHART:
        return {
          ...state,
          substatusAgentChart: action.payload,
          loadingCharts: false,
          error: null
        }
        case GET_PIE_STATUS_CHART:
      return {
        ...state,
        pieStatus: action.payload,
        loadingCharts: false,
        error: null
      }
    case GET_TOTALS_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        loadingCharts: false,
        error: null
      }
    case GET_CLOSURE_TOP_STORES:
      return {
        ...state,
        closureTopStores: action.payload,
        loadingCharts: false,
        error: null
      }
    case GET_CLOSURE_TOP_USERS:
      return {
        ...state,
        closureTopUsers: action.payload,
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
        error: null,
        closureTopUsers:false,
        closureTopStores:false,
        // leadsMonthlyChart:false,
        pieStatus:false
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
