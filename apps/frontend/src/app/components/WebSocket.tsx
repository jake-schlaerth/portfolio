"use client";

import { locationsAtom } from "@/atoms";
import { AnalyticsEventSchema, LocationEventSchema } from "analytics-events";
import { useSetAtom } from "jotai";

export const WebSocketClient = () => {
  const setLocations = useSetAtom(locationsAtom);
  const socket = new WebSocket("wss://analytics-streamer.localhost");

  // Connection opened
  socket.addEventListener("open", function (event) {
    console.log("Connected to WebSocket server");

    socket.send("Hello Server!");
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    console.log("client received message from websocket server", event.data);

    let validatedEvent;
    try {
      validatedEvent = LocationEventSchema.parse(JSON.parse(event.data));
    } catch (error) {
      console.error(error);
      return;
    }

    const newLocation = {
      latitude: validatedEvent.latitude,
      longitude: validatedEvent.longitude,
    };

    setLocations((prev) => [newLocation, ...prev]);
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
