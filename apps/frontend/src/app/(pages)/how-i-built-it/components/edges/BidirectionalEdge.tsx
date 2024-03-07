import { BaseEdge, useStore, EdgeProps, ReactFlowState } from "reactflow";

import { getCurvedPath } from "./getCurvedPath";

export function BidirectionalEdge({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
}: EdgeProps) {
  const isBiDirectionalEdge = useStore((state: ReactFlowState) =>
    state.edges.some((edge) => edge.source === target && edge.target === source)
  );

  if (!isBiDirectionalEdge) {
    throw new Error(
      "desired bidirectional edge does not have bidirectional edges defined"
    );
  }

  const edgePathParams = {
    sourceX,
    sourceY,
    targetX,
    targetY,
    centerXOffset: sourceY > targetY ? 12 : -12,
    centerYOffset: sourceX < targetX ? 12 : -12,
  };

  return (
    <BaseEdge path={getCurvedPath(edgePathParams)} markerEnd={markerEnd} />
  );
}
