import { useState } from "react";
import "./App.css";
import AddCategory from "./Components/AddCategory";
import DisplayGifs from "./Components/DisplayGifs";

function App() {
  const [category, setCategory] = useState("");

  return (
    <>
      <div className="App">
        <h1>Main Component</h1>
        <AddCategory setCategory={setCategory} />
        <DisplayGifs category={category} />
      </div>
    </>
  );
}

export default App;
