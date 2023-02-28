import { SET_TRIGGER_TABLE, SET_TRIGGER_USER, SET_USER_DATA } from "./types";

export const initialState = {
  user: {
    data: null,
    error: false,
    loading: false,
    trigger: false,
  },
  table: {
    trigger: false,
  },
};

export const reducers = (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, user: action.payload };
    case SET_TRIGGER_USER:
      return { ...state, user: { ...state.user, trigger: action.payload } };
    case SET_TRIGGER_TABLE:
      return { ...state, table: { ...state, trigger: action.payload } };
    default:
      return state;
  }
};
