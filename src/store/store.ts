import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loadState, saveState } from "../utils";

import { authReducer } from './auth';
import { usersReducer } from './users';
import { messagesReducer } from './messages';
import { conversationsReducer } from './conversations';

const preloadedState = loadState();

export const store = configureStore({
  preloadedState,
  reducer: {
    auth: authReducer,
    users: usersReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
  devTools: true,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({ ...state });
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
