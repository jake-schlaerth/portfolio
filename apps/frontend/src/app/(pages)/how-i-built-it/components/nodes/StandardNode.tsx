import { ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export interface StandardNodeData {
  name: string;
  modal: ReactNode;
}

export const StandardNode = ({ data }: NodeProps<StandardNodeData>) => {
  return (
    <div className="bg-neutral-800 p-4 w-48 text-center">
      {data.name}
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Left} id="left" />
    </div>
  );
};
