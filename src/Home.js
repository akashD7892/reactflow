import React, { useCallback, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
 
var initialNodes = [
  { id: '1', position: { x: 200, y: 150 }, data: { label: '1' } },
  { id: '2', position: { x: 200, y: 300 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 

export default function App() { 

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  const [label, setLabel] = useState('') ;
  

  const onNodeDoubleClick = (event, node) => { 
    console.log("Deleting Node ID:", node.id);
    setNodes((prevElements) => prevElements.filter((el) => el.id !== node.id)); 
    setSelectedNodeId(null) ;
    
  };
  
  const onNodeClick = (event, node) => {
    console.log(":selected")
    setSelectedNodeId(node);
  } 

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  }; 

  const handleSaveTitle = () => {
    if (selectedNodeId) {
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNodeId.id ? { ...n, data: { ...n.data, label: label } } : n
      );
      setNodes(updatedNodes);
    }

    setSelectedNodeId(null)
  };

  const onCreateNode = () => {
     const newNode = {
        id:(nodes.length + 1 ).toString() ,
        type:'default' ,
        data:{ label: 'New Node'} ,
        position: {x:100, y:100 } ,
     } ;

     setNodes( (els) => [ ...els , newNode ]) ;
  } ;
   
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

 

  
 
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <button onClick={onCreateNode} style={{background:'lightblue', height:'40px', width:'100px', marginTop:'50px', borderRadius:'10px', fontStyle:'italic', fontWeight:'bold'}}>Create Node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick} 
        onNodeClick={onNodeClick}
       
         
        // nodeTypes={{ custom: CustomNode }}
      /> 

    { selectedNodeId && (
        <div style={{ position: 'absolute', top: selectedNodeId.position.y, left: selectedNodeId.position.x + 200, backgroundColor: 'white', padding: '10px', border: '0.5px solid black', borderRadius: '5px' }}>
         <input 
    value={label} 
    onChange={handleInputChange} 
    style={{ border: 'none', borderBottom: '1px solid black', marginRight: '10px' }} 
  />
  <div style={{marginTop:'20px'}}>
    <button onClick={handleSaveTitle} style={{ marginRight: '5px' }}>Save</button>
    <button onClick={() => setSelectedNodeId(null)} style={{ marginRight: '5px', backgroundColor: 'red', color: 'white' }}>Cancel</button>
  </div>
      </div>
      )} 

   
    
    </div>
  );
} ;

