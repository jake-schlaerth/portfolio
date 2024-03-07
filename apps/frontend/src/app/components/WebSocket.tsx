"use client";

import { useSetAtom } from "jotai";

import { locationsAtom } from "@/atoms";
import { LocationEventSchema } from "analytics-events";

export const WebSocketClient = () => {
  const setLocations = useSetAtom(locationsAtom);
  const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER || "");

  socket.addEventListener("message", function (event) {
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

  socket.addEventListener("error", function (event) {
    console.error("WebSocket error:", event);
  });

  return <></>;
};
