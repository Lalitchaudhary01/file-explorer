import React, { useState } from "react";

const initialFileStructure = [
  {
    name: "Folder 1",
    type: "folder",
    children: [
      {
        name: "Subfolder 1.1",
        type: "folder",
        children: [
          {
            name: "Subfolder 1.1.1",
            type: "folder",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Folder 2",
    type: "folder",
    children: [],
  },
];

const Folder = ({ data, addFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleAddFolder = () => {
    if (newFolderName) {
      addFolder(data, newFolderName);
      setNewFolderName(""); // Reset the input field after adding folder
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div onClick={toggleFolder} style={{ cursor: "pointer" }}>
        {data.type === "folder" ? (isOpen ? "📂" : "📁") : "📄"} {data.name}
      </div>
      {isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {data.children &&
            data.children.map((child, index) => (
              <Folder key={index} data={child} addFolder={addFolder} />
            ))}

          {data.type === "folder" && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="New Folder Name"
                style={{ marginRight: "10px" }}
              />
              <button onClick={handleAddFolder}>Add Folder</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);

  const addFolder = (parentFolder, folderName) => {
    const addFolderRecursively = (folder) => {
      if (folder === parentFolder) {
        folder.children.push({
          name: folderName,
          type: "folder",
          children: [],
        });
      } else if (folder.children) {
        folder.children.forEach(addFolderRecursively);
      }
    };

    const newStructure = [...fileStructure];
    newStructure.forEach(addFolderRecursively);
    setFileStructure(newStructure);
  };

  return (
    <div>
      {fileStructure.map((folder, index) => (
        <Folder key={index} data={folder} addFolder={addFolder} />
      ))}
    </div>
  );
};

const File = () => {
  return (
    <div>
      <h1>Folder Structure</h1>
      <FileExplorer />
    </div>
  );
};

export default File;
