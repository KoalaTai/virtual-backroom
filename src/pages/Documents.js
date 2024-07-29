// src/pages/Documents.js 

import React, { useState } from 'react';
import { Treebeard } from 'react-treebeard';


// Sample data for the tree structure
const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};

const Documents = () => {
  const [treeData, setTreeData] = useState(data);

  const onToggle = (node, toggled) => {
    if (node.children) {
      node.toggled = toggled;
    }
    setTreeData(Object.assign({}, treeData));
  };

  return (
    <div>
      <h1>Document Management</h1>
      <Treebeard
        data={treeData}
        onToggle={onToggle}
      />
    </div>
  );
};

export default Documents;
