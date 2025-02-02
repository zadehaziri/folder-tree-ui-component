# 📁 Folder Tree UI Component

A dynamic, interactive Folder Tree UI Component built with React, TypeScript, and Tailwind CSS, featuring drag-and-drop functionality and intuitive folder management.

## 🌟 Features

- **Drag and Drop Folder Management**
  - Reorder folders
  - Move folders into other folders
  - Drag folders in and out of subfolders

- **Folder Operations**
  - Add new folders
  - Edit folder names
  - Delete folders (with subfolder confirmation)
  - Collapse and expand folder hierarchies

- **Responsive and Modern Design**
  - Built with Tailwind CSS
  - Smooth micro-interactions
  - Hover and active state animations

## 🛠 Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useReducer)
- **Drag and Drop**: react-dnd

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/zadehaziri/folder-tree-ui-component.git
   cd folder-tree-ui-component
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📦 Project Structure

```
src/
├── components/
│   ├── Folder.tsx          # Individual folder component
│   └── FolderTree.tsx      # Main folder tree container
├── contexts/
│   └── FolderTreeContext.tsx  # Global state context
├── reducer.ts               # State management logic
└── types.ts                 # TypeScript type definitions
```

## 🎨 Key Components

### `Folder.tsx`
- Handles individual folder rendering
- Manages folder-level interactions
- Supports editing, deleting, and drag-drop

### `FolderTree.tsx`
- Renders the entire folder tree
- Manages global folder state
- Provides "Add Folder" functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌈 Roadmap

- [ ] Add unit and integration tests
- [ ] Implement more advanced drag-and-drop interactions
- [ ] Create more customization options
- [ ] Add keyboard navigation support

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-dnd](https://react-dnd.github.io/react-dnd/)

