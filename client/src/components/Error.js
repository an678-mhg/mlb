import React from "react";

const Error = ({ error }) => {
  return (
    <ul>
      {error.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
};

export default Error;
