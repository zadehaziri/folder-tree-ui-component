import React, { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { folderReducer } from '../reducer';
import Folder from './Folder';
import { FolderTreeContext } from '../contexts/FolderTreeContext';
import { FolderNode } from '../types';

const initialState: FolderNode[] = [
  {
    id: 'common-questions',
    name: 'Common questions',
    isEditing: false,
    isCollapsed: false,
    parentId: null,
    children: [
      {
        id: 'shipping-issues',
        name: 'Shipping issues',
        isEditing: false,
        isCollapsed: false,
        parentId: 'common-questions',
        children: [
          {
            id: '2',
            name: 'Missing products',
            isEditing: false,
            isCollapsed: false,
            parentId: 'shipping-issues',
            children: [],
          },
          {
            id: '3',
            name: 'Lost tracking number',
            isEditing: false,
            isCollapsed: false,
            parentId: 'shipping-issues',
            children: [],
          },
          {
            id: '4',
            name: "Can't find order",
            isEditing: false,
            isCollapsed: false,
            parentId: 'shipping-issues',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Dissatisfied customers',
    isEditing: false,
    isCollapsed: true,
    parentId: null,
    children: [{
      id: 'placeholder-dc',
      name: 'Add subfolder',
      isEditing: false,
      isCollapsed: false,
      parentId: '5',
      children: []
    }],
  },
  {
    id: '6',
    name: 'Technical difficulties',
    isEditing: false,
    isCollapsed: true,
    parentId: null,
    children: [{
      id: 'placeholder-td',
      name: 'Add subfolder',
      isEditing: false,
      isCollapsed: false,
      parentId: '6',
      children: []
    }],
  },
];

const FolderTree: React.FC = () => {
  const [state, dispatch] = useReducer(folderReducer, initialState);

  return (
    <DndProvider backend={HTML5Backend}>
      <FolderTreeContext.Provider value={dispatch}>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-sm mx-auto border rounded-lg p-4 bg-white shadow-md relative">
            {/* Add Button at the Top-Right Corner */}
            <button
              onClick={() => dispatch({ type: 'ADD_FOLDER', parentId: null })}
              className="absolute top-4 right-4 text-[#6366F1] hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
            >
              <span className="text-lg">+</span>
              Add
            </button>

            {/* Title */}
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Responses
            </div>

            {/* Render the Folder Tree */}
            {state.map((node) => (
              <Folder key={node.id} node={node} depth={0} parentId={null} />
            ))}
          </div>
        </div>
      </FolderTreeContext.Provider>
    </DndProvider>
  );
};

export default FolderTree;