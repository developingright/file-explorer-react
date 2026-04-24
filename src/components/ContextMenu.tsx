import type { FolderNode, FileNode } from "../types";

interface propType {
  isVisible: boolean;
  node: FolderNode | FileNode | null;
  posX: number;
  posY: number;
  handleDelete: (id: number) => void;
  handleAddNode: (parentId: number, type: "file" | "folder") => void;
}

const ContextMenu = (state: propType) => {
  return (
    <>
      {state.isVisible && (
        <div
          className="flex flex-col w-26 h-fit bg-gray-400 p-1 rounded-sm"
          style={{ position: "fixed", top: state.posY, left: state.posX }}
        >
          <button className="text-sm  text-white hover:bg-gray-500/25 px-2  py-1 w-full cursor-pointer">
            Rename
          </button>
          {state.node && state.node.type == "folder" && (
            <button
              className="text-sm  text-white hover:bg-gray-500/25 px-2 py-1 w-full cursor-pointer"
              onClick={() =>
                state.node && state.handleAddNode(state.node.id, "file")
              }
            >
              New File
            </button>
          )}
          {state.node && state.node.type == "folder" && (
            <button
              className="text-sm  text-white hover:bg-gray-500/25 px-2  py-1 w-full cursor-pointer"
              onClick={() =>
                state.node && state.handleAddNode(state.node.id, "folder")
              }
            >
              New Folder
            </button>
          )}
          <button
            className="text-sm  text-white hover:bg-gray-500/25 px-2   py-1 w-full cursor-pointer"
            onClick={() => state.node && state.handleDelete(state.node?.id)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
