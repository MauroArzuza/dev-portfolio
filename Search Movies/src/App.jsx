import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/MainPage";
import SingleMovie from "./Components/SingleMovie";

// https://www.omdbapi.com/?apikey=cf296882&s=troya
// https://www.omdbapi.com/?apikey=cf296882&i=tt0337341

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
