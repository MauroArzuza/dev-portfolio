import { useState } from "react";
import "./App.css";
import Values from "values.js";
import FormColor from "./Components/FormColor";
import DisplayColors from "./Components/DisplayColors";

function App() {
  const [list, setList] = useState(new Values("red").all(5));

  console.log(list);

  return (
    <div className="App">
      <FormColor setList={setList} />
      <DisplayColors list={list} />
    </div>
  );
}

export default App;
