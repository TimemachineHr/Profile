import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "orgNode",
    data: {
      label: "Arnold Atthetop",
      role: "CEO",
      subordinates: ["2", "3", "4"],
    },
    position: { x: 300, y: 50 },
  },
  {
    id: "2",
    type: "orgNode",
    data: {
      label: "Thor Throwthis",
      role: "VP Lighting",
      subordinates: ["5", "6"],
    },
    position: { x: 150, y: 200 },
  },
  {
    id: "3",
    type: "orgNode",
    data: {
      label: "Olivia Ownsthis",
      role: "VP Marketing",
      subordinates: ["7", "8"],
    },
    position: { x: 450, y: 200 },
  },
  {
    id: "4",
    type: "orgNode",
    data: {
      label: "Sophia System",
      role: "VP Finance",
      subordinates: ["9", "10"],
    },
    position: { x: 600, y: 200 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e1-3", source: "1", target: "3", type: "smoothstep" },
  { id: "e1-4", source: "1", target: "4", type: "smoothstep" },
];

const OrgChartPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleExpand = useCallback(
    (nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      const newNodes = [];
      const newEdges = [];

      node.data.subordinates.forEach((subId, index) => {
        if (!nodes.find((n) => n.id === subId)) {
          newNodes.push({
            id: subId,
            type: "orgNode",
            data: { label: `Employee ${subId}`, role: "Employee" },
            position: {
              x: node.position.x + index * 100 - 50,
              y: node.position.y + 150,
            },
          });
          newEdges.push({
            id: `e${nodeId}-${subId}`,
            source: nodeId,
            target: subId,
            type: "smoothstep",
          });
        }
      });

      // Update nodes and edges
      setNodes((nds) => nds.concat(newNodes));
      setEdges((eds) => eds.concat(newEdges));
    },
    [nodes, setNodes, setEdges]
  );

  // Custom Node Component
  const OrgNode = ({ data, id }) => (
    <div className="p-2 rounded-lg shadow-lg bg-white text-center w-32">
      <div className="font-semibold text-sm">{data.label}</div>
      <div className="text-xs text-gray-500">{data.role}</div>
      {data.subordinates && (
        <button
          onClick={() => handleExpand(id)}
          className="mt-1 text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded"
        >
          Expand
        </button>
      )}
    </div>
  );

  const nodeTypes = {
    orgNode: OrgNode,
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default OrgChartPage;
