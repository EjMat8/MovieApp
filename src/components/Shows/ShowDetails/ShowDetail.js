import React from "react";
import { useSelector } from "react-redux";
import Details from "../../Details/Details";
const ShowDetail = ({ id, category, data: { data, isLoading }, genre }) => {
  const { movie } = useSelector((state) => state);

  const selectedShow = movie[category].find((el) => el.id === +id);

  let type;

  if (selectedShow.title) type = "movie";
  if (selectedShow.name) type = "tv";

  return (
    <React.Fragment>
      <Details
        selectedShow={selectedShow}
        genre={genre(data, selectedShow)}
        isLoading={isLoading}
        type={type}
      />
    </React.Fragment>
  );
};

export default ShowDetail;
