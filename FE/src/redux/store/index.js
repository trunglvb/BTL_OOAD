import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authenticatedReducer';

export const store = configureStore({
  reducer: {
    authReducer,
  },
});
