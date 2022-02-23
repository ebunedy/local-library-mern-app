import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAuthors, fetchAuthors } from "../author/authorSlice";
import { selectAllGenres, fetchGenres } from "../genre/genreSlice";
import { addBook } from "./bookSlice";

const BookFormComponent = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    summary: "",
    isbn: "",
    genre: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const genres = useSelector(selectAllGenres);
  const authors = useSelector(selectAllAuthors);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchGenres());
  }, [dispatch]);

  const { title, author, summary, isbn, genre } = book;
  const save =
    [title, author, summary, isbn, genre].every(Boolean) &&
    addRequestStatus === "idle";

  const submit = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus("pending");
        const result = await dispatch(addBook(book));
        unwrapResult(result);
        window.location = "http://localhost:3000/books";
      } catch (error) {
        setAddRequestStatus("failed");
        console.error("failed to add book", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="form">
      <h1>create a book</h1>
      <form onSubmit={submit}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="author">
          Author
          <select
            name="author"
            id="author"
            required={true}
            onChange={handleChange}
          >
            <option value=""></option>
            {authors.map((item) => {
              const { _id: id, firstName, lastName } = item;
              return (
                <option value={id} key={id}>
                  {firstName} {lastName}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="summary">
          Summary
          <textarea
            name="summary"
            id="summary"
            cols="30"
            rows="10"
            onChange={handleChange}
            required={true}
          ></textarea>
        </label>
        <label htmlFor="isbn">
          ISBN
          <input
            type="number"
            id="isbn"
            name="isbn"
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="genre">
          Genre
          <select
            name="genre"
            id="genre"
            onChange={handleChange}
            required={true}
          >
            <option value=""></option>
            {genres.map((item) => {
              const { _id: id, name } = item;
              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BookFormComponent;
