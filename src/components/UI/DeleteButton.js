import React from "react";

export default function DeleteButton({ onClick, className = "" }) {
  return (
    <button
      className={className ? `${className} btn__delete` : "btn__delete"}
      onClick={onClick}
    >
      <p>x</p>
    </button>
  );
}
