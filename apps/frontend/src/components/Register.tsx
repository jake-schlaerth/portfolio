import { useState } from "react";
import { useSetAtom } from "jotai";
import { sessionIdAtom } from "../atoms";

export function Register() {
  const [name, setName] = useState("");
  const setSessionId = useSetAtom(sessionIdAtom);

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setSessionId(data.id);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h2>Enter Your Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleRegister}>Join</button>
    </div>
  );
}
