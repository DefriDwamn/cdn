import React from 'react';
import { ChonkyIconFA, FileBrowser, FileNavbar, FileList, FileContextMenu, FileContextMenuItem } from 'chonky';

function App() {
  const files = [
    { id: '1', name: 'file1.txt', isDir: false },
    { id: '2', name: 'file2.jpg', isDir: false },
    { id: '3', name: 'folder1', isDir: true },
  ];

  const handleFileAction = (action) => {
    console.log(action);
  };

  return (
    <div className="App">
      <h1>CDN File Browser</h1>
      <FileBrowser files={files} onFileAction={handleFileAction}>
        <FileNavbar />
        <FileList />
        <FileContextMenu>
          <FileContextMenuItem icon={ChonkyIconFA.folder} onClick={() => alert('Folder clicked')}>Open Folder</FileContextMenuItem>
          <FileContextMenuItem icon={ChonkyIconFA.download} onClick={() => alert('Download clicked')}>Download</FileContextMenuItem>
        </FileContextMenu>
      </FileBrowser>
    </div>
  );
}

export default App;
