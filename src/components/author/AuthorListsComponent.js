import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAuthors, fetchAuthors, status } from "./authorSlice";

const AuthorListsComponent = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAllAuthors);
  const fetchStatus = useSelector(status);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchAuthors());
    }
  }, [fetchStatus, dispatch]);

  return (
    <div>
      <ul>
        {authors.map((item) => {
          const { _id, firstName, lastName } = item;
          return (
            <li key={_id}>
              {firstName} {lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AuthorListsComponent;
