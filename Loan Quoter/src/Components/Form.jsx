import React, { useState } from "react";
import "../App.css";
import { calculateTotal } from "../helpers";

const Form = ({ amount, setAmount, term, setTerm, setTotal }) => {
  const [error, setError] = useState(false);

  const calculateLoan = (e) => {
    e.preventDefault();
    if (amount === 0 || term === "") {
      setError(true);
      return;
    }
    setError(false);

    const total = calculateTotal(amount, term);
    setTotal(total);
    // console.log(total);
  };

  return (
    <>
      <form onSubmit={calculateLoan}>
        <div className="column">
          <div>
            <label>Cantidad Préstamo</label>
            <input
              type="number"
              placeholder="Ej: $3000"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Plazo para pagar:</label>
            <select
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            >
              <option value="">Seleccionar</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
        </div>
        <div className="btnSubmit">
          <input type="submit" value="Calcular" />
        </div>
      </form>
      {error ? <p className="error">"Debes llenar todos los campos"</p> : ""}
    </>
  );
};

export default Form;
