import React from 'react';
import WorkflowCanvas from './components/WorkflowCanvas';
import NodePanel from './components/NodePanel';
import Toolbox from './components/Toolbox';
import './styles.css';

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <Toolbox />
        <NodePanel />
      </div>
      <WorkflowCanvas />
    </div>
  );
}

export default App;
