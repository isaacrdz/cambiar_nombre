import {
  GET_NOTIFICATIONS_BY_STORE,
  GET_UNREAD_CHATS,
  GET_NOTIFICATIONS,
  SET_ERROR,
  UPDATE_NOTIFICATION,
  GET_NOTIFICATIONS_BY_USER,
  UPDATE_NOTIFICATION_LIST,
  GET_ALL_NOTIFICATIONS_BY_USER,
  GET_ALL_NOTIFICATIONS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
    case GET_NOTIFICATIONS_BY_STORE:
    case GET_NOTIFICATIONS_BY_USER:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_NOTIFICATIONS_BY_USER:
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: action.payload,
        loading: false,
        error: null,
      };
    case GET_UNREAD_CHATS:
      return {
        ...state,
        unreadChats: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_NOTIFICATION_LIST:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        error: null,
        loading: false,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
