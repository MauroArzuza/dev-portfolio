import React, { useState } from "react";
import Values from "values.js";

const FormColor = ({ setList }) => {
  const [color, setColor] = useState("blue");
  const [error, setError] = useState(false);

  const handleGenerator = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(5);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    console.log(color);
  };
  return (
    <div className="form-color">
      <h1>COLOR PALETE GENERATOR</h1>
      <form onSubmit={handleGenerator}>
        <input
          type="text"
          placeholder="#fff"
          onChange={(e) => setColor(e.target.value)}
        />
        <input type="submit" value="Generar" />
      </form>
      {error ? (
        <p className="error">El color que ingresaste no existe...</p>
      ) : null}
    </div>
  );
};

export default FormColor;
