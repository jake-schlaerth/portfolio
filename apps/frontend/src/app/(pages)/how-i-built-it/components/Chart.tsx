import "reactflow/dist/style.css";
import ReactFlow from "reactflow";
import { useMemo } from "react";

import { customNodeTypes, nodes } from "./nodes";
import { customEdgeTypes, edges } from "./edges";

export const Chart = () => {
  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      />
    </div>
  );
};
