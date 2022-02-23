import { useEffect } from "react";
import {
  selectAllBookintances,
  status,
  fetchBookinstance,
} from "./bookinstanceSlice";
import { useSelector, useDispatch } from "react-redux";

const BookIstanceListsComponent = () => {
  const dispatch = useDispatch();
  const bookinstances = useSelector(selectAllBookintances);
  const fetchStatus = useSelector(status);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchBookinstance());
    }
  }, [dispatch, fetchStatus]);

  return (
    <div className="container">
      {bookinstances.map((item) => {
        const {
          _id: id,
          book: { title, summary, isbn },
          status,
        } = item;
        return (
          <div key={id} className="card">
            <h5>{title}</h5>
            <p>{summary}</p>
            <p>
              <span>ISBN: {isbn}</span> <span>STATUS: {status}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BookIstanceListsComponent;
