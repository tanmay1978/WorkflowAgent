import React from 'react';

function Toolbox({ addNode }) {
  const nodeTypes = [
    { type: 'input', label: 'Input Node' },
    { type: 'task', label: 'Task Node' },
    { type: 'output', label: 'Output Node' }
  ];

  return (
    <div className="toolbox">
      <h3>Toolbox</h3>
      {nodeTypes.map((node) => (
        <button
          key={node.type}
          onClick={() => addNode(node.type)}
        >
          {node.label}
        </button>
      ))}
    </div>
  );
}

export default Toolbox;
