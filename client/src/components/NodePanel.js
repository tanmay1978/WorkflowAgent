import React, { useState } from 'react';

function NodePanel({ selectedNode, updateNode }) {
  const [config, setConfig] = useState({});

  const handleSave = () => {
    updateNode(selectedNode.id, config);
  };

  return (
    <div className="node-panel">
      <h3>Node Configuration</h3>
      {selectedNode && (
        <>
          <input
            type="text"
            placeholder="Task Description"
            onChange={(e) => setConfig({ ...config, task: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </>
      )}
    </div>
  );
}

export default NodePanel;
