import { Handle, NodeProps, Position } from "reactflow";

export interface InformationNodeData {
  blurb: string;
}

export const InformationNode = ({ data }: NodeProps<InformationNodeData>) => {
  return (
    <div className="bg-neutral-800 p-4 w-64">
      <p className="text-[8px]">{data.blurb}</p>
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
