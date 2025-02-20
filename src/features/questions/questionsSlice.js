import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const QUESTIONS_URL = 'https://interviewapi.onrender.com/questions';

const initialState = {
  questions: [],
  status: 'idle',
  error: '',
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    try {
      const response = await axios.get(QUESTIONS_URL);
      console.log('fetch question fired');
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchDomainQuestions = createAsyncThunk(
  'questions/fetchDomainQuestions',
  async (domain) => {
    try {
      const response = await axios.get(`${QUESTIONS_URL}/domains/${domain}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (question) => {
    try {
      const response = await axios.post(QUESTIONS_URL, question);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const editQuestion = createAsyncThunk(
  'questions/editQuestion',
  async (question) => {
    try {
      const response = await axios.put(QUESTIONS_URL, question);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (id) => {
    try {
      const response = await axios.delete(`${QUESTIONS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchQuestions.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.status = 'success';
      state.questions = action.payload;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.questions.push(action.payload);
    });

    builder.addCase(editQuestion.fulfilled, (state, action) => {
      const filteredQuestions = state.questions.filter(
        (question) => question._id !== action.payload._id
      );
      state.questions = [...filteredQuestions, action.payload];
    });

    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload._id
      );
    });

    builder.addCase(fetchDomainQuestions.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDomainQuestions.fulfilled, (state, action) => {
      state.status = 'success';
      state.questions = action.payload;
    });
    builder.addCase(fetchDomainQuestions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const getAllQuestions = (state) => state.questions.questions;
export const getQuestionsStatus = (state) => state.questions.status;
export const getQuestionsError = (state) => state.questions.error;
export const getSingleQuestion = (state, id) =>
  state.questions.questions.find((question) => question._id === id);

export default questionsSlice.reducer;
