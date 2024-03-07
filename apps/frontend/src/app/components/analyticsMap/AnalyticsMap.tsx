"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAtom } from "jotai";

import { LocationEvent } from "analytics-events";
import { locationsAtom } from "@/atoms";
import { InternalLink } from "@/components";
import { Marker } from "./Marker";

const AnalyticsMap = () => {
  const defaultPosition: [number, number] = [39.8283, -98.5795]; // Approximate center of the US
  const zoom = 4;

  const [locations, setLocations] = useAtom(locationsAtom);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/locations");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="hidden md:flex h-[33vh] w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <MapContainer
          center={defaultPosition}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
          doubleClickZoom={false}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
          {locations.map((location: Omit<LocationEvent, "eventName">, idx) => {
            return (
              <Marker
                key={idx}
                position={[location.latitude, location.longitude]}
              />
            );
          })}
        </MapContainer>
        <div className="text-center">
          <p className="mt-3">
            this is a map of people who have visited my site
          </p>
          <p>
            it updates in real time via a websocket consumer of a message queue
          </p>
          <p>
            <InternalLink href="/how-i-built-it">learn more</InternalLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsMap;
