import { BaseEdge, EdgeProps } from "reactflow";

import { getCurvedPath } from "./getCurvedPath";

export const CurvedEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
}: EdgeProps) => {
  const edgePathParams = {
    sourceX,
    sourceY,
    targetX,
    targetY,
    centerXOffset: -25,
    centerYOffset: 0,
  };

  return (
    <BaseEdge path={getCurvedPath(edgePathParams)} markerEnd={markerEnd} />
  );
};
