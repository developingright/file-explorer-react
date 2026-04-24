import { useState } from "react";
import type { FileNode, FolderNode } from "../types";
import { FileIcon, FolderIcon, FolderOpen } from "lucide-react";

type TreeNodeProps = {
  node: FileNode | FolderNode;
  depth: number;
  handleRightClick: (args: {
    node: FileNode | FolderNode;
    x: number;
    y: number;
  }) => void;
  setDraggedNode: (node: FileNode | FolderNode | null) => void;
  setTargetNode: (node: FolderNode | null) => void;
  handleDrop : () => void;
};

const TreeNode = ({
  node,
  depth,
  handleRightClick,
  setDraggedNode,
  setTargetNode,
  handleDrop
}: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (node.type == "folder") {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div
      style={{ marginLeft: `${depth * 6.5}px` }}
      draggable={true}
      onDragStart={(e) => { e.stopPropagation(); setDraggedNode(node); }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); node.type == "folder" && setTargetNode(node); }}
      onDrop={(e) => { e.stopPropagation(); handleDrop(); }}
      className={depth > 0 ? 'border-l-2 pl-1' : ''}
    >
      <div
        className="flex gap-1"
        onClick={handleOpen}
        onContextMenu={(event) => {
          event.preventDefault();
          handleRightClick({ node, x: event.clientX, y: event.clientY });
        }}
      >
        {node.type == "file" ? (
          <FileIcon width={20} />
        ) : !isOpen ? (
          <FolderIcon width={20} />
        ) : (
          <FolderOpen width={20} />
        )}
        <h5>{node.name}</h5>
      </div>
      {isOpen &&
        node &&
        node.type == "folder" &&
        node.children.length >= 1 &&
        node.children.map((subNode) => (
          <TreeNode
            node={subNode}
            key={subNode.id}
            depth={depth + 1}
            handleRightClick={handleRightClick}
            setDraggedNode={setDraggedNode}
            setTargetNode={setTargetNode}
            handleDrop={handleDrop}
          />
        ))}
    </div>
  );
};

export default TreeNode;
