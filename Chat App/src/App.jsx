import "./App.css";
import Chat from "./Components/Chat";
import User from "./Components/User";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div className="App">
      <User />
      <Chat />
    </div>
  );
}

export default App;
