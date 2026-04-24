import { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import type { FolderNode, FileNode } from "../types";
import ContextMenu from "./ContextMenu";

type workspace = {
  workNodes: (FolderNode | FileNode)[];
};

interface handleRightClick {
  node: FolderNode | FileNode;
  x: number;
  y: number;
}

interface menuState {
  isVisible: boolean;
  node: FolderNode | FileNode | null;
  posX: number;
  posY: number;
}

interface deleteNodeProp {
  nodes: (FolderNode | FileNode)[];
  idToDelete: number;
}

interface addNode {
  nodes: (FolderNode | FileNode)[];
  parentId: number | null;
  newNode: FolderNode | FileNode | null;
}

const Explorer = ({ workNodes }: workspace) => {
  const [tree, setTree] = useState<(FolderNode | FileNode)[]>(workNodes);
  const [draggedNode,setDraggedNode] = useState<FolderNode | FileNode | null>(null);
  const [targetNode,setTargetNode] = useState<FolderNode | null>(null);


  const [menuOpen, setMenuOpen] = useState<menuState>({
    isVisible: false,
    node: null,
    posX: 0,
    posY: 0,
  });
  const handleClose = () => {
    setMenuOpen({
      ...menuOpen,
      isVisible: false,
      node: null,
      posX: 0,
      posY: 0,
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleRightClick = ({ node, x, y }: handleRightClick) => {
    setMenuOpen({ isVisible: true, node: node, posX: x, posY: y });
  };

  const deleteNode = ({
    nodes,
    idToDelete,
  }: deleteNodeProp): (FolderNode | FileNode)[] => {
    return nodes
      .filter((node: FolderNode | FileNode) => node.id !== idToDelete)
      .map((node) =>
        node.type == "folder"
          ? {
              ...node,
              children: deleteNode({ nodes: node.children, idToDelete }),
            }
          : node,
      );
  };
  const addNode = ({
    nodes,
    parentId,
    newNode,
  }: addNode): (FolderNode | FileNode)[] => {
    if(parentId == null || newNode == null) {return []};

    return nodes.map((node: FolderNode | FileNode) => {
      return node.type == "folder"
        ? node.id == parentId
          ? { ...node, children: [...node.children, newNode] }
          : {
              ...node,
              children: addNode({ nodes: node.children, parentId, newNode }),
            }
        : node;
    });
  };
  const handleDelete = (id: number) => {
    setTree(deleteNode({ nodes: tree, idToDelete: id }));
  };

  const handleAddNode = (parentId: number, type: "file" | "folder") => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;
    const newNode =
      type === "file"
        ? { id: Date.now(), name, type: "file" as const }
        : { id: Date.now(), name, type: "folder" as const, children: [] };
    setTree(addNode({ nodes: tree, parentId, newNode }));
  };

  const handleDrop = () =>{
    if(targetNode && draggedNode){
        const deleted = deleteNode({ nodes: tree, idToDelete: draggedNode.id })
        const added = addNode({ nodes: deleted, parentId: targetNode.id, newNode: draggedNode })
        setTree(added)
        setDraggedNode(null)
        setTargetNode(null)
    }
  }

  return (
    <>
      {tree.map((workNode: FolderNode | FileNode) => (
        <TreeNode
          node={workNode}
          depth={0}
          key={workNode.id}
          handleRightClick={handleRightClick}
          setDraggedNode={setDraggedNode}
          setTargetNode={setTargetNode}
          handleDrop={handleDrop}
        />
      ))}
      <ContextMenu
        {...menuOpen}
        handleDelete={handleDelete}
        handleAddNode={handleAddNode}
      />
    </>
  );
};

export default Explorer;
