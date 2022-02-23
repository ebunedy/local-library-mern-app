import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBooks, fetchBooks } from "../book/bookSlice";
import { addBookInstance } from "./bookinstanceSlice";

const BookInstanceForm = () => {
  const [bookInstance, setBookInstance] = useState({
    book: "",
    imprint: "",
    status: "",
    dateDueBack: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookInstance({ ...bookInstance, [name]: value });
  };

  const { book, imprint, status, dateDueBack } = bookInstance;
  const save =
    [book, imprint, status, dateDueBack].every(Boolean) &&
    addRequestStatus === "idle";

  const submit = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus("pending");
        const result = await dispatch(addBookInstance(bookInstance));
        unwrapResult(result);
        window.location = "http://localhost:5000/bookinstances";
      } catch (error) {
        setAddRequestStatus("failed");
        console.error("error adding bookinstance", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="form">
      <h1>create a book instance</h1>
      <form onSubmit={submit}>
        <label htmlFor="book">
          Book
          <select name="book" id="book" required={true} onChange={handleChange}>
            <option value=""></option>
            {books.map((item) => {
              const { _id: id, title } = item;
              return (
                <option value={id} key={id}>
                  {title}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="imprint">
          Imprint
          <input
            type="text"
            name="imprint"
            id="imprint"
            required={true}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="status">
          Status
          <select
            name="status"
            id="status"
            required={true}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Available">Available</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Loaned">Loaned</option>
            <option value="Reserved">Reserved</option>
          </select>
        </label>
        <label htmlFor="dateDueBack">
          Date due back
          <input
            type="date"
            name="dateDueBack"
            id="dateDueBack"
            required={true}
            onChange={handleChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BookInstanceForm;
