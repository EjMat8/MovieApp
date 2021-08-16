import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { queryAction } from "../../../store/query-slice";
import FBIMAGE from "../../../assets/download.png";
const ShowItem = React.forwardRef(
  ({ imageURL, title, id, category, UtilEl = null }, ref) => {
    const dispatch = useDispatch();
    return (
      <figure
        ref={ref ? ref : null}
        onClick={() => {
          dispatch(queryAction.setQuery(""));
        }}
        className="show-item"
      >
        <Link to={`/show/${category}/${id}`}>
          <img
            src={imageURL.includes("null") ? FBIMAGE : imageURL}
            alt="pic"
            className="show-item__img"
          />
          <figcaption className="show-item__title">{title}</figcaption>
        </Link>
        {UtilEl && UtilEl}
      </figure>
    );
  }
);
export default React.memo(ShowItem);
