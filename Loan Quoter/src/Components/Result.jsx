import React from "react";

const Result = ({ total, amount, term }) => {
  return (
    <div className="result">
      <h2>Cotización:</h2>
      <p>La cantidad solicitada es: ${amount}.</p>
      <p>El plazo es de: ${term} meses.</p>
      <p>La pago mensual es de: ${(total / term).toFixed(2)}.</p>
      <p>Total a pagar: ${total}.</p>
    </div>
  );
};

export default Result;
