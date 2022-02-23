import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  books: [],
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:5000/catalog/books");
  return response.data.result;
});

export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
  const response = await axios.post(
    "http://localhost:5000/catalog/book/create",
    newBook
  );
  return response.data.book;
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "successful";
      state.books = state.books.concat(action.payload);
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addBook.fulfilled]: (state, action) => {
      state.books = state.books.unshift(action.payload);
    },
  },
});

export const selectAllBooks = (state) => state.books.books;
export const selectAllAuthorsGenres = (state) => state.books.authorsGenres;
export const error = (state) => state.books.error;
export const status = (state) => state.books.status;
export const statusOfAuthorsGenres = (state) => state.books.authorsGenreStatus;

export default bookSlice.reducer;
