// MODULES
import React from 'react';

// Keep the context update as minimum as possible during the lifecycle of the application.
const state_initial = {
  // UI props
  ui_toasts: [],
  ui_lang: 'en',
  ui_theme: 'light',
  // user props
  user_auth: null, // false = logged out, true = logged in, null = waiting for the server response
  // httponly cookie in the browser's backend for authentication
  user_id: null,
  user_username: null,
  user_email: null,
  user_email_verified: null,
  user_role: null,
  user_img: null,
};

function reducer(value = state_initial, action) {
  return {
    ...action,
  };
}

export const Context = React.createContext();

export function Provider({ children }) {
  const [state, set_state] = React.useReducer(reducer, state_initial);
  const value = { state, set_state };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default {
  Context,
  Provider,
};
