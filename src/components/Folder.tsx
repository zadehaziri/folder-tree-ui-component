import React, { useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FolderNode } from '../types';
import { FolderTreeContext } from '../contexts/FolderTreeContext';

const Folder: React.FC<{
  node: FolderNode;
  depth: number;
  parentId: string | null;
}> = ({ node, depth, parentId }) => {
  const dispatch = useContext(FolderTreeContext)!;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'FOLDER',
    item: { id: node.id, parentId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'FOLDER',
    drop: (item: { id: string }, monitor) => {
      // Always place the dragged folder inside the target folder
      dispatch({
        type: 'MOVE_NODE',
        draggedId: item.id,
        targetId: node.id,
        position: 'inside',
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const handleEdit = () => dispatch({ type: 'START_EDIT', id: node.id });
  const toggleCollapse = () => dispatch({ type: 'TOGGLE_COLLAPSE', id: node.id });

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_FOLDER', id: node.id });
    setIsConfirmingDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className="select-none">
      <div
        ref={ref}
        className={`group flex items-center gap-2 p-1 hover:bg-gray-50 ${isDragging ? 'opacity-50' : ''
          } ${isOver ? 'bg-blue-50' : ''}`}
        style={{ paddingLeft: `${depth * 24}px` }}
      >
        {node.isEditing && (
          <span className="text-gray-400 text-lg cursor-move">⋮</span>
        )}

        <button
          onClick={toggleCollapse}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors leading-none"
          style={{ marginTop: '1px' }}
        >
          {node.children.length > 0 && (
            <svg
              className={`w-3 h-3 transform transition-transform ${!node.isCollapsed && node.name !== 'Common questions' ? 'rotate-180' : ''}`}
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Folder or Document Icon */}
        <span className="flex items-center">
          {node.children.length > 0 ? (
            <svg className="w-5 h-5 text-[#6366F1]" viewBox="0 0 24 24">
              <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4H4Z" fill="currentColor" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24">
              <path d="M3 4h18v12H7l-4 4z" fill="currentColor" />
            </svg>
          )}
        </span>

        {node.isEditing ? (
          <div className="relative flex items-center bg-[#E8E8E8] rounded-md p-1">
            <input
              autoFocus
              defaultValue={node.name}
              onBlur={(e) => dispatch({ type: 'UPDATE_NAME', id: node.id, newName: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
              className="bg-white border-2 border-[#6366F1] rounded px-2 py-1 text-sm w-48 outline-none focus:ring-2 focus:ring-[#6366F1]/50"
            />
            <button
              className="absolute right-2 text-gray-400"
              onClick={(e) => {
                e.preventDefault();
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                input.blur();
              }}
            >
              ⤶
            </button>
          </div>
        ) : (
          <span className="text-gray-800 text-sm inline-flex items-center">{node.name}</span>
        )}

        {!node.isEditing && (
          <div className="opacity-0 group-hover:opacity-100 flex gap-1 ml-2 transition-opacity">
            <button
              onClick={handleEdit}
              className="text-gray-600 hover:bg-gray-200 p-1.5 rounded-md bg-gray-100"
              aria-label="Edit"
            >
              ✎
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-100 p-1.5 rounded-md"
              aria-label="Delete"
            >
              🗑️
            </button>
          </div>
        )}

        {isConfirmingDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete "{node.name}"?
                {node.children.length > 0 && ` This will also delete ${node.children.length} subfolder(s).`}
              </p>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={cancelDelete} 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!node.isCollapsed && (
        <>
          {node.children.map((child) => (
            <Folder key={child.id} node={child} depth={depth + 1} parentId={node.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Folder;