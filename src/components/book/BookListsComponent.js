import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, fetchBooks, status } from "./bookSlice";

const BookListsComponent = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const fetchStatus = useSelector(status);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [fetchStatus, dispatch]);

  if (status === "pending") {
    <div>pending fetch</div>;
  }
  return (
    <div>
      <h2>books</h2>
      {books.map((item) => {
        const { _id: id, title, author } = item;
        return (
          <div key={id}>
            <ul>
              <li>
                {title} by{" "}
                <span>{`${author.firstName} ${author.lastName}`}</span>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default BookListsComponent;
