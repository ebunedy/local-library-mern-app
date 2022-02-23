import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addGenre } from "../genre/genreSlice";

const AddGenre = () => {
  const [name, setName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const onChangeGenreName = (e) => {
    setName(e.target.value);
  };

  const save = [name].every(Boolean) && addRequestStatus === "idle";

  const submit = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus("pending");
        const result = await dispatch(addGenre({ name }));
        unwrapResult(result);
        setName("");
        window.location = "http://localhost:3000/genres";
      } catch (error) {
        setAddRequestStatus("failed");
        console.error("Failed to add Genre", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="form">
      <h1>create a genre</h1>
      <form onSubmit={submit}>
        <label htmlFor="genrename">
          Genere Name
          <input
            type="text"
            name="name"
            id="genrename"
            value={name}
            onChange={onChangeGenreName}
            required={true}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddGenre;
