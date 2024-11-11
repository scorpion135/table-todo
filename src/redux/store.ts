import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users';
import tasksReducer from './slices/tasks';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
