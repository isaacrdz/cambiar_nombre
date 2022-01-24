import {
  GET_LEADS,
  GET_LEAD,
  SET_ERROR,
  CLEAR_CURRENT_LEAD,
  CLEAR_STATE,
  SET_LOADING,
  UPDATE_LEAD,
  CREATE_LEAD,
  CALL_USER,
  ASSIGN_AGENTS,
  SELECTED_LEADS,
  SELECTED_STORES,
  SELECTED_CARTYPES,
  SET_TAB,
  SET_CHECKBOX,
  SET_REJECTED
} from "../types";
import _ from "lodash";

export default (state, action) => {
  switch (action.type) {
    case SET_TAB:
      return {
        ...state,
        tab: action.payload
      };
      case SET_CHECKBOX:
      return {
        ...state,
        checkBox: action.payload
      }
    case SELECTED_LEADS:
      let x = 0;
      if(action && action.payload && action.payload.length) x = action.payload.length
      return{
        ...state,
        selectedLeads: action.payload,
        x: x,
        loading: false,
        error: null,
      };

    case SELECTED_STORES:
      return{
        ...state,
        selectedStores: action.payload,
        loading: false,
        error: null,
      };

    case SELECTED_CARTYPES:
      return{
        ...state,
        selectedCarTypes: action.payload,
        loading: false,
        error: null,
        };
    case CLEAR_CURRENT_LEAD:
      return{
        ...state,
        lead: {},
        loading: false,
        error: null,
      };
    case CREATE_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
        loading: false,
        error: null,
      };
    case GET_LEADS:

      let leadsSize = 0;
      if(action && action.payload &&  action.payload.length) leadsSize = action.payload.length;
      return {
        ...state,
        leadsSize: leadsSize,
        leads: [...state.leads, ...action.payload],
        loading: false,
        error: null,
      };
    case SET_REJECTED:
      return {
        ...state,
        isRejected: action.payload
      }
    case UPDATE_LEAD:
      return {
        ...state,
        lead: action.payload,
        loading: false,
        error: null,
      };
    case CALL_USER:
      return {
        ...state,
        loading: false,
        callToken: action.payload,
        error: null,
      };
    case GET_LEAD:
      let sortedActivities = action.payload.activities;
      sortedActivities = _.orderBy(sortedActivities, ["createdAt"], ["desc"]);
      action.payload.activities = sortedActivities;

      let sortedComments = action.payload.comments;
      sortedComments = _.orderBy(sortedComments, ["createdAt"], ["desc"]);
      action.payload.comments = sortedComments;

      let sortedRecordings = action.payload.recordings;
      sortedRecordings = _.orderBy(sortedRecordings, ["createdAt"], ["desc"]);
      action.payload.recordings = sortedRecordings;
      return {
        ...state,
        lead: action.payload,
        loading: false,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_STATE:
      return {
        ...state,
        lead: {},
        leads: [],
        chart: [],
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ASSIGN_AGENTS: 
    state.leads.map( ( lead, index ) => {
      if(action.payload.leads.includes(lead._id)){
        state.leads[index].agent = action.payload.user;
        state.leads[index].assignedDate = action.payload.assignedDate;
      }
      return false;
    })

    if(action.tab !== 'all'){
      let type = action.tab.split('.')[0];
      switch(type){
        case 'assigned':
          state.leads = state.leads.filter( item => item.agent === undefined || item.agent === null)
          break;
        default:
          break;
      }
    }


    return {
      ...state,
      loading: false,
      error: false,
      }

    default:
      return {
        ...state
      };
  }
};
