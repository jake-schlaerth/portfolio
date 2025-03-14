import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="App">
      <h1>Vite + React + TypeScript</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
