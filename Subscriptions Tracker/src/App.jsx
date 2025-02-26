import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import FormAddMoney from "./Components/AddMoney/FormAddMoney";
import MainControl from "./Components/MainControl/MainControl";

function App() {
  const [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const component = isValid ? (
    <MainControl count={count} />
  ) : (
    <FormAddMoney setIsValid={setIsValid} setCount={setCount} />
  );

  return (
    <div className="App">
      {count}
      <Header />
      {component}
    </div>
  );
}

export default App;
