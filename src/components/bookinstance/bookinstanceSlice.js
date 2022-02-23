import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookinstances: [],
  status: "idle",
  error: null,
};

export const fetchBookinstance = createAsyncThunk(
  "bookinstances/fetchBookinstance",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/catalog/bookinstances"
    );
    return response.data.result;
  }
);

export const addBookInstance = createAsyncThunk(
  "bookinstances/addBookinstance",
  async (bookInstance) => {
    const response = await axios.post(
      "http://localhost:5000/catalog/bookinstance/create",
      bookInstance
    );
    return response.data.bookinstance;
  }
);

const bookinstanceSlice = createSlice({
  name: "bookinstances",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBookinstance.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBookinstance.fulfilled]: (state, action) => {
      state.status = "successful";
      state.bookinstances = [...action.payload];
    },
    [fetchBookinstance.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addBookInstance.fulfilled]: (state, action) => {
      state.bookinstances = state.bookinstances.unshift(action.payload);
    },
  },
});

export const selectAllBookintances = (state) =>
  state.bookinstances.bookinstances;

export const error = (state) => state.bookinstances.error;
export const status = (state) => state.bookinstances.status;

export default bookinstanceSlice.reducer;
