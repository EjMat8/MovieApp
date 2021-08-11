import React from "react";
import ShowItem from "../ShowList/ShowItem";
import ErrorM from "../../UI/Error";
import { useDispatch } from "react-redux";
import DeleteButton from "../../UI/DeleteButton";
import { IMAGE_URL, IMAGE_SIZES } from "../../../lib/api";
import { deleteRating } from "../../../store/rate-action";
export default function RatingContain({ category, data }) {
  const dispatch = useDispatch();
  const onDeleteHandler = (type, id) => {
    dispatch(deleteRating(type, id));
  };
  return (
    <React.Fragment>
      <h2 className="heading-2">{`Your Rated ${category}`}</h2>
      <div className="rate-contain">
        {Object.values(data).length ? (
          data.map((el) => (
            <ShowItem
              key={el.id}
              imageURL={`${IMAGE_URL}/${IMAGE_SIZES.backdropSizes[1]}/${
                el.backdrop_path || el.poster_path
              }`}
              title={el.name || el.title || el.original_title}
              category={category}
              id={el.id}
              UtilEl={
                <DeleteButton
                  className="show-item__action--delete"
                  onClick={onDeleteHandler.bind(null, category, el.id)}
                />
              }
            />
          ))
        ) : (
          <ErrorM message={`No rated ${category} yet`.toUpperCase()} />
        )}
      </div>
    </React.Fragment>
  );
}
