import React from "react";
import { Marker as LeafletMarker } from "react-leaflet";
import L from "leaflet";

interface CustomMarkerProps {
  position: [number, number];
}

export const Marker = ({ position }: CustomMarkerProps) => {
  const customMarkerIcon = L.divIcon({
    className: "custom-marker-icon",
    html: `<span style="width: 10px; height: 10px; background-color: white; border-radius: 50%; display: block;"></span>`,
    iconSize: [10, 10],
  });

  return <LeafletMarker position={position} icon={customMarkerIcon} />;
};
