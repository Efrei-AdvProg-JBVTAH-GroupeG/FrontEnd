import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../style/UploadPage.css";

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("/listFiles", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadedFiles(data.map((file) => ({ name: file })));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setSelectedFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("file", files[0]);

    try {
      const response = await fetch("/uploadFile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset state after successful upload
      setFiles([]);
      setSelectedFileName(null);

      const uploadedFile = await response.json();
      setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);

      alert("File(s) uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file(s).");
    }
  };

  const handleDelete = async (fileName) => {
    try {
      const response = await fetch(`/deleteFile/${fileName}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted file from the state
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileName)
      );

      alert("File deleted successfully!");
    } catch (error) {
      console.error("Deletion failed:", error);
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="containerUpload">
      <header className="header">
        <h1>File Upload Page</h1>
      </header>

      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {selectedFileName ? (
          <p style={{ color: "#333", margin: 0 }}>{selectedFileName}</p>
        ) : (
          <p style={{ color: "#777", margin: 0 }}>
            Drag 'n' drop ici, ou clique pour sélectionner tes fichiers
          </p>
        )}
      </div>

      <button className="upload-button" onClick={handleUpload}>
        Envoyer
      </button>

      <div className="uploaded-files">
        <h2>Fichiers upload:</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <button
                onClick={() => handleDelete(file.name)}
                className="delete-button"
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
