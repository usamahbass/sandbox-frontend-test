import { SET_TRIGGER_TABLE, SET_TRIGGER_USER, SET_USER_DATA } from "./types";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setTriggerUser = (triggerUser) => ({
  type: SET_TRIGGER_USER,
  payload: triggerUser,
});

export const setTriggerTable = (triggerTable) => ({
  type: SET_TRIGGER_TABLE,
  payload: triggerTable,
});
