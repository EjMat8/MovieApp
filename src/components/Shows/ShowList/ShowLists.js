import React from "react";

import { IMAGE_URL, IMAGE_SIZES } from "../../../lib/api";
import ShowItem from "./ShowItem";
export default function ShowRows({ category, data }) {
  return (
    <div className="show-row">
      <h2 className="heading-2">{category}</h2>
      <div className="show-list">
        {data.map((el) => (
          <ShowItem
            key={el.id}
            id={el.id}
            category={category}
            imageURL={`${IMAGE_URL}/${IMAGE_SIZES.backdropSizes[1]}/${
              el.backdrop_path || el.poster_path
            }`}
            title={el.name || el.title || el.original_title}
          />
        ))}
      </div>
    </div>
  );
}
