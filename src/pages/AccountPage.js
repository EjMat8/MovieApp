import React from "react";
import { useSelector } from "react-redux";
import RatingContainList from "../components/Shows/ShowRating/RatingContainList";
export default function AccountPage() {
  const {
    rated: { movie, tv },
  } = useSelector((state) => state);
  const rated = { movie: movie, tv: tv };
  const ratedKeys = Object.keys(rated);
  return (
    <div className="account-ratings">
      {Object.values(rated).map((el, i) => (
        <RatingContainList
          key={ratedKeys[i]}
          category={ratedKeys[i]}
          data={Object.values(el)}
        />
      ))}
    </div>
  );
}
