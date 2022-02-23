import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllGenres, status, fetchGenres } from "./genreSlice";

const GenreListsComponent = () => {
  const dispatch = useDispatch();
  const genres = useSelector(selectAllGenres);
  const fetchStatus = useSelector(status);
  console.log(genres);
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchGenres());
    }
  }, [fetchStatus, dispatch]);

  return (
    <ul>
      {genres.map((item) => {
        return <li key={item._id}>{item.name}</li>;
      })}
    </ul>
  );
};

export default GenreListsComponent;
