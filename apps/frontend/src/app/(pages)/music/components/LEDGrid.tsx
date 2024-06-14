import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const LED = ({ position, color }) => (
  <Sphere args={[0.1, 16, 16]} position={position}>
    <meshStandardMaterial color={color} />
  </Sphere>
);

export const LEDGrid = () => {
  const gridSize = 10;
  const grid = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Calculate position to evenly space out LEDs
      const position = [i - gridSize / 2, j - gridSize / 2, 0];
      grid.push(<LED key={`${i}-${j}`} position={position} color="white" />);
    }
  }

  return <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>{grid}</Canvas>;
};
