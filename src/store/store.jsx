import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import AlumniReducer from './alumniSclice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    alumni: AlumniReducer,
  },
});

export default store; 