import React from "react";

const NodeSelector = ({ nodeCount, handleNodeCountChange }) => {
  return (
    <div>
      <label htmlFor="nodeCount">Number of Nodes:</label>
      <input
        id="nodeCount"
        type="number"
        min="2"
        value={nodeCount}
        onChange={handleNodeCountChange}
      />
    </div>
  );
};

export default NodeSelector;
