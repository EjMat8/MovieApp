import React from "react";
import ShowItem from "../ShowList/ShowItem";
import ErrorM from "../../UI/Error";
import { IMAGE_URL, IMAGE_SIZES } from "../../../lib/api";
export default function RatingContain({ category, data }) {
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
            />
          ))
        ) : (
          <ErrorM message={`No rated ${category} yet`.toUpperCase()} />
        )}
      </div>
    </React.Fragment>
  );
}
