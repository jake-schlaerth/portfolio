"use client";

export const WebSocketClient = () => {
  const socket = new WebSocket("wss://analytics-streamer.localhost");

  // Connection opened
  socket.addEventListener("open", function (event) {
    console.log("Connected to WebSocket server");
    socket.send("Hello Server!");
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    console.log("client received message from websocket server", event.data);
  });

  // Listen for errors
  socket.addEventListener("error", function (event) {
    console.error("WebSocket error:", event);
  });

  // Listen for when the connection is closed
  socket.addEventListener("close", function (event) {
    console.log("Disconnected from WebSocket server");
  });

  return <></>;
};
