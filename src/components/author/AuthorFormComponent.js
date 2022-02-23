import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addAuthor } from "../author/authorSlice";

const AuthorFormComponent = () => {
  const [author, setAuthor] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    dateOfDeath: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuthor({ ...author, [name]: value });
  };

  const { firstName, lastName, dateOfBirth } = author;
  const save =
    [firstName, lastName, dateOfBirth].every(Boolean) &&
    addRequestStatus === "idle";
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus("pending");
        const result = await dispatch(addAuthor(author));
        unwrapResult(result);
        setAuthor({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          dateOfDeath: "",
        });
        window.location = "http://localhost:3000/authors";
      } catch (error) {
        setAddRequestStatus("failed");
        console.error("Failed to add Author", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="form">
      <h1>create an author</h1>
      <form onSubmit={submit}>
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="dateOfBirth">
          Date Of Birth
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            onChange={handleChange}
            required={true}
          />
        </label>
        <label htmlFor="dateOfDeath">
          Date Of Death
          <input
            type="date"
            name="dateOfDeath"
            id="dateOfDeath"
            onChange={handleChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AuthorFormComponent;
