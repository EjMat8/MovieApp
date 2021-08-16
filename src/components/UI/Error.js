import React from "react";

export default function Error({ message }) {
  return (
    <div
      style={{
        color: "#fff",
        fontSize: "5rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {message}
    </div>
  );
}
