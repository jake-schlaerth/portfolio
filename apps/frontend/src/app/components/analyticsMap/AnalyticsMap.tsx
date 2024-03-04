"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAtom } from "jotai";

import { locationsAtom } from "@/atoms";
import { Marker } from "./Marker";
import { LocationEvent } from "analytics-events";

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
    <MapContainer
      center={defaultPosition}
      zoom={zoom}
      style={{ height: "370px", width: "600px" }}
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
  );
};

export default AnalyticsMap;
