import type { FolderNode } from "../types";

const mockTree: FolderNode = {
    id: 1, 
    name: 'root',
    type: 'folder',
    children: [
        {
            id: 2,
            name: 'test.txt',
            type: 'file'
        },{
            id: 3,
            name: 'cv.pdf',
            type: 'file'
        },{
            id: 4,
            name: 'projects',
            type: 'folder',
            children: [
                {
                    id: 5,
                    name: 'project1.docx',
                    type: 'file'
                },{
                    id: 6,
                    name: 'project2.pptx',
                    type: 'file'
                }
            ]
        }
    ]
}

export default mockTree;