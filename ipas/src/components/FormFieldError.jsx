import React from "react";

const FormFieldError = ({ message }) => {
  return (
    <div
      style={{
        color: "red",
        fontSize: ".8rem",
      }}
    >
      {message}
    </div>
  );
};

export default FormFieldError;
