import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../style/UploadPage.css";

const FileUploadPage = () => {
  const token = localStorage.getItem("token");
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(
        "http://document.thibaulthenrion.com/listFiles",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadedFiles(data); // Assuming data is an array of objects
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, [token]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setSelectedFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    // Check if a file is selected
    if (!files.length) {
      alert("Please select a file to upload.");
      return;
    }

    // Check if a type is selected
    if (!selectedType) {
      alert("Please select a type for the file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append(
      "body",
      JSON.stringify({ name: selectedFileName, type: selectedType })
    );

    try {
      const response = await fetch(
        "http://document.thibaulthenrion.com/uploadFile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, ${errorMessage}`
        );
      }
      fetchUploadedFiles();
      setFiles([]);
      setSelectedFileName(null);
      setSelectedType(""); // Reset selected type

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await fetch(
        `http://document.thibaulthenrion.com/deleteFile/${documentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== documentId)
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
      <div className="UploadContainer">
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          {selectedFileName ? (
            <p style={{ color: "#333", margin: 0 }}>{selectedFileName}</p>
          ) : (
            <p style={{ color: "#777", margin: 0 }}>
              Drag 'n' drop ici, ou clique pour sélectionner ton fichier
            </p>
          )}
        </div>

        <select
          id="fileType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Type de document</option>
          <option value="Rapport">Rapport</option>
          <option value="Cdc">CDC</option>
        </select>

        <button className="upload-button" onClick={handleUpload}>
          Envoyer
        </button>
      </div>

      <div className="uploaded-files">
        <h2>Fichiers upload:</h2>
        <div className="InfoContainer">
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index} className="documentInfo">
                <div>ID: {file.id}</div>
                <span>Nom du document: {file.name}</span>
                <span>Type: {file.type}</span>
                <span>Date d'ajout: {file.submitionDate}</span>
                <br />
                <button
                  onClick={() => handleDelete(file.id)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;
