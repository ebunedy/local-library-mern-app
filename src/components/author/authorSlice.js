import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authors: [],
  status: "idle",
  error: null,
};

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    const response = await axios.get("http://localhost:5000/catalog/authors");
    return response.data.result;
  }
);

export const addAuthor = createAsyncThunk(
  "authors/addAuthor",
  async (author) => {
    const response = await axios.post(
      "http://localhost:5000/catalog/author/create",
      author
    );
    return response.data.author;
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthors.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.authors = [...action.payload];
      state.status = "successfull";
    },
    [fetchAuthors.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addAuthor.fulfilled]: (state, action) => {
      state.authors = state.authors.unshift(action.payload);
    },
  },
});

export const selectAllAuthors = (state) => state.authors.authors;
export const status = (state) => state.authors.status;
export const error = (state) => state.authors.error;

export default authorSlice.reducer;
