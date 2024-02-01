import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(
        "http://document.thibaulthenrion.com/listFiles"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  /*const handleDelete = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };
  */

  const handleUpload = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch(
        "http://document.thibaulthenrion.com/uploadFile",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      alert("File(s) uploaded successfully!");
      setFiles([]); // Clear the list after upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file(s).");
    }
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
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Envoyer
      </button>
    </div>
  );
};

export default FileUploadPage;

// http://document.thibaulthenrion.com/uploadFile
