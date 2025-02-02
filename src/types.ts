export type FolderNode = {
    id: string;
    name: string;
    isEditing: boolean;
    isCollapsed: boolean;
    parentId: string | null;
    children: FolderNode[];
  };
  
  export type FolderAction =
    | { type: 'ADD_FOLDER'; parentId: string | null }
    | { type: 'DELETE_FOLDER'; id: string }
    | { type: 'TOGGLE_COLLAPSE'; id: string }
    | { type: 'START_EDIT'; id: string }
    | { type: 'UPDATE_NAME'; id: string; newName: string }
    | { type: 'MOVE_NODE'; draggedId: string; targetId: string; position: 'inside' | 'before' | 'after' };