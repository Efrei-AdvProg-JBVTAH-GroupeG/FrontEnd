import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Upload Page</h1>
      </header>

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop ici, ou clique pour selectionner tes fichiers</p>
      </div>
      <div>
        <h2>Fichiers upload:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name} - {file.size} bytes
              <button
                onClick={() => handleDelete(file)}
                style={{ marginLeft: "10px" }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadPage;
