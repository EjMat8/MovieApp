import React, { useEffect } from "react";
import Modal from "../../UI/Modal";
import { VIDEO_URL } from "../../../lib/api";
import { useHttp } from "../../../hooks/useHttp";
import Loader from "../../UI/Loader";
import ErrorLoad from "../../UI/Error";
export default function ShowTrailer({ id, type, onClick }) {
  const [{ data, isLoading }, getData] = useHttp();

  useEffect(() => {
    getData(`/${type}/${id}${VIDEO_URL}`, "get");
  }, [getData, id, type]);

  let url = null;
  if (!data.data || isLoading)
    return (
      <Modal>
        <Loader />
      </Modal>
    );

  if (data.data.results.length) {
    url = data.data.results.find(
      (el) => el.type === "Trailer" || el.type === "Teaser"
    )?.key;
  }

  return (
    <Modal onClick={onClick}>
      {url ? (
        <iframe
          className="trailer"
          src={`https://www.youtube.com/embed/${url}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onClick={(e) => e.stopPropagation()}
        ></iframe>
      ) : (
        <ErrorLoad message="No Trailer Found" />
      )}
    </Modal>
  );
}
