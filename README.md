# React File Explorer

A VS Code-style file explorer built by hand in React + TypeScript. No AI, no tutorials, no component libraries.

| File Tree | Context Menu |
|-----------|--------------|
| ![File tree](src/assets/screenshot-tree.png) | ![Context menu](src/assets/screenshot-context-menu.png) |

## Purpose

Built as a practice project to understand how this kind of UI actually works under the hood. The goal was to write it from scratch and be able to explain every line.

## What It Does

- **Recursive tree rendering** - folders can be nested infinitely deep, one component handles every level
- **Collapsible folders** - click to open/close, closed folders are removed from the DOM (not just hidden)
- **Dynamic icons** - file, closed folder, and open folder icons that update on click
- **Right-click context menu** - appears at cursor position, dismisses on outside click
- **Add files and folders** - right-click any folder to add a child by name
- **Delete nodes** - right-click any node to remove it (recursively removes children too)
- **Drag and drop** - drag any file or folder into another folder to move it

## Concepts Practiced

**Recursive components**
`TreeNode` renders itself inside itself. A folder maps over its children and renders a `<TreeNode>` for each one. Any depth of nesting works automatically with a single component.

**Recursive state mutations**
`deleteNode` and `addNode` are pure recursive functions that walk the tree and return a new tree. No direct mutation, React state is always replaced with a new object.

**useState for local UI state**
Each `TreeNode` manages its own `isOpen` boolean independently. Parent components don't know or care which folders are open.

**useEffect for global listeners**
The context menu closes when you click anywhere on the page. That needs `document.addEventListener` on mount and `removeEventListener` on unmount to clean up.

**Drag and drop via HTML5 API**
`onDragStart`, `onDragOver`, and `onDrop` track which node is being dragged and where it's going. On drop: delete from old position, insert into new parent.

**TypeScript discriminated unions**
`FileNode` and `FolderNode` are separate types with a shared `type` field. TypeScript narrows the type automatically inside `if (node.type === 'folder')` checks, no casting needed.

## Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vite

## Run Locally

```bash
npm install
npm run dev
```

## Why Build It by Hand

Anyone can prompt an AI to generate a file explorer. Writing it yourself forces you to understand:

- Why recursive data structures need recursive components
- Why immutable state updates matter in React
- How browser events bubble and when to use `stopPropagation`
- How to split UI state between local and lifted state
