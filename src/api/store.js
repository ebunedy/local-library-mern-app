import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "../components/author/authorSlice";
import bookSlice from "../components/book/bookSlice";
import bookinstanceSlice from "../components/bookinstance/bookinstanceSlice";
import genreSlice from "../components/genre/genreSlice";

export default configureStore({
  reducer: {
    authors: authorSlice,
    books: bookSlice,
    bookinstances: bookinstanceSlice,
    genres: genreSlice,
  },
});
