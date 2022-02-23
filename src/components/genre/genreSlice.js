import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  genres: [],
  error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await axios.get("http://localhost:5000/catalog/genres");
  return response.data.result;
});

export const addGenre = createAsyncThunk("genres/addGenres", async (genre) => {
  const response = await axios.post(
    "http://localhost:5000/catalog/genre/create",
    genre
  );
  return response.data.genre;
});

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGenres.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchGenres.fulfilled]: (state, action) => {
      state.status = "successful";
      state.genres = [...action.payload];
    },
    [fetchGenres.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [addGenre.fulfilled]: (state, action) => {
      state.genres = state.genres.unshift(action.payload);
    },
  },
});

export const selectAllGenres = (state) => state.genres.genres;
export const error = (state) => state.genres.error;
export const status = (state) => state.genres.status;

export default genreSlice.reducer;
