import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const idRef = useRef<string>(Math.random().toString(36).substring(7));
  const id = idRef.current;
  console.log(id);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/web_socket");

    ws.onopen = () => {
      console.log("WebSocket is open");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(`Hello from id ${id}!`);
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={sendMessage}>Send a Message</button>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
