type FileNode = {
    id: number,
    name: string
    type: 'file'
}

type FolderNode = {
    id: number,
    name: string,
    type: 'folder',
    children : (FileNode | FolderNode)[]
}

export type { FileNode, FolderNode }
