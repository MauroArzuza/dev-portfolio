import "./App.css";
import React, { useState } from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Result from "./Components/Result";
import Message from "./Components/Message";

function App() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [total, setTotal] = useState(0);

  let component;
  if (total === 0) {
    component = <Message />;
  } else {
    component = <Result total={total} amount={amount} term={term} />;
  }

  return (
    <>
      <Header title="Cotizador de prestamos" />
      <div className="formContainer">
        <Form
          amount={amount}
          setAmount={setAmount}
          term={term}
          setTerm={setTerm}
          setTotal={setTotal}
        />
      </div>
      <div className="message">{component}</div>
    </>
  );
}

export default App;
