import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from '../features/questions/questionsSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export default store;
