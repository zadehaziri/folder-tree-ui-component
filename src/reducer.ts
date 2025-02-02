import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { FolderNode, FolderAction } from './types';

const findNode = (nodes: FolderNode[], id: string): FolderNode | undefined => {
    for (const node of nodes) {
        if (node.id === id) return node;
        const found = findNode(node.children, id);
        if (found) return found;
    }
    return undefined;
};

const removeNode = (nodes: FolderNode[], id: string): void => {
    for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].id === id) {
            nodes.splice(i, 1);
        } else {
            removeNode(nodes[i].children, id);
        }
    }
};

export const folderReducer = (state: FolderNode[], action: FolderAction): FolderNode[] => {
    return produce(state, (draft: FolderNode[]) => {
        switch (action.type) {
            case 'ADD_FOLDER': {
                const { parentId } = action;
                const newFolder: FolderNode = {
                    id: uuidv4(),
                    name: 'New Folder',
                    isEditing: true,
                    isCollapsed: false,
                    children: [],
                    parentId: parentId
                };
                if (parentId === null) {
                    draft.push(newFolder);
                } else {
                    const parent = findNode(draft, parentId);
                    if (parent) {
                        parent.children.push(newFolder);
                    }
                }
                break;
            }
            case 'DELETE_FOLDER': {
                removeNode(draft, action.id);
                break;
            }
            case 'TOGGLE_COLLAPSE': {
                const node = findNode(draft, action.id);
                if (node) node.isCollapsed = !node.isCollapsed;
                break;
            }
            case 'START_EDIT': {
                const node = findNode(draft, action.id);
                if (node) node.isEditing = true;
                break;
            }
            case 'UPDATE_NAME': {
                const node = findNode(draft, action.id);
                if (node) {
                    node.name = action.newName;
                    node.isEditing = false;
                }
                break;
            }
            case 'MOVE_NODE': {
                const { draggedId, targetId, position } = action;
                let draggedNode: FolderNode | undefined;
                let draggedParent: FolderNode[] | undefined;

                const findAndRemoveDragged = (nodes: FolderNode[]): boolean => {
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].id === draggedId) {
                            draggedNode = nodes[i];
                            draggedParent = nodes;
                            nodes.splice(i, 1);
                            return true;
                        }
                        if (findAndRemoveDragged(nodes[i].children)) return true;
                    }
                    return false;
                };

                findAndRemoveDragged(draft);

                if (!draggedNode || !draggedParent) break;

                // @ts-ignore
                const validDraggedNode: FolderNode = draggedNode;

                const findTarget = (nodes: FolderNode[]): boolean => {
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].id === targetId) {
                            // Update the parentId of the dragged node
                            validDraggedNode.parentId = nodes[i].id;
                            nodes[i].children.push(validDraggedNode);
                            // Ensure the target folder is not collapsed
                            nodes[i].isCollapsed = false;
                            return true;
                        }
                        if (findTarget(nodes[i].children)) return true;
                    }
                    return false;
                };

                findTarget(draft);
                break;
            }
            default:
                break;
        }
    });
};