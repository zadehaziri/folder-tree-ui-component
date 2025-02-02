import React from 'react';
import { FolderAction } from '../types';

export const FolderTreeContext = React.createContext<React.Dispatch<FolderAction> | null>(null);