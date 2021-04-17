import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './test2';

const FlowGraph = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div
      style={{
        height: '500px',
        width: '100%',
        border: '1px solid',
      }}
    >
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={(reactFlowInstance) => reactFlowInstance.fitView()}
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default FlowGraph;
