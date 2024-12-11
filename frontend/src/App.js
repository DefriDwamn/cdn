import React, { useEffect, useState } from 'react';
import { setChonkyDefaults, FileBrowser, FileNavbar, FileList, FileContextMenu } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';

setChonkyDefaults({
  iconComponent: ChonkyIconFA,
  disableSelection: true,
  disableDragAndDropProvider: true,
});

function App() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('/content'); // Абсолютный путь

  useEffect(() => {
    // Загружаем содержимое текущей директории
    fetch(`http://45.93.200.200${currentPath}/`) // Убедитесь, что путь корректен
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sanitizedFiles = data.map((file, index) => ({
          id: file.name || `file-${index}`,
          name: file.name,
          isDir: file.type === 'directory',
          size: file.size,
          modDate: new Date(file.mtime),
        }));
        setFiles(sanitizedFiles);
      })
      .catch((error) => console.error('Error fetching files:', error));
  }, [currentPath]);

  const handleFileAction = (action) => {
    console.log(action);

    if (action.id === 'mouse_click_file') {
      const clickedFile = action.payload.file;

      if (clickedFile) {
        if (clickedFile.isDir) {
          // Переход в директорию
          setCurrentPath(`${currentPath}/${clickedFile.name}`);
        } else {
          // Открытие файла
          const fileUrl = `http://45.93.200.200${currentPath}/${clickedFile.name}`;
          window.open(fileUrl, '_blank');
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>CDN File Browser</h1>
      <FileBrowser files={files} onFileAction={handleFileAction}>
        <FileNavbar />
        <FileList />
        <FileContextMenu />
      </FileBrowser>
    </div>
  );
}

export default App;