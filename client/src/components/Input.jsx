import React, { useState } from "react";
import axios from "axios";

const Input = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("pdf");
  const [postedBy, setPostedBy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Debug log
    setSelectedFile(file);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    setSelectedFile(null);
  };

  const handlePostedByChange = (e) => {
    setPostedBy(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !postedBy.trim()) {
      alert('Please select a file and enter your name/ID');
      return;
    }

    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const validExtensions = ['pdf', 'json'];
    const validMimeTypes = ['application/pdf', 'application/json', 'text/json'];
    
    if (!validExtensions.includes(fileExtension)) {
      alert(`Please select a valid file type. Allowed: ${validExtensions.join(', ').toUpperCase()}`);
      return;
    }

    if (!validMimeTypes.includes(selectedFile.type) && selectedFile.type !== '') {
      console.warn('MIME type warning:', selectedFile.type, 'might not be accepted by server');
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('fileType', fileType);
      formData.append('postedBy', postedBy);
      
      console.log('Uploading file:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        fileType: fileType,
        postedBy: postedBy,
        extension: fileExtension
      });

      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await axios.post('http://localhost:9000/api/itineraries/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      });

      console.log('Upload response:', response.data);

      if (response.data && response.data.success) {
        if (onUploadSuccess) {
          onUploadSuccess();
        }
        
        setSelectedFile(null);
        setFileType("pdf");
        setPostedBy("");
        
        alert('File uploaded successfully!');
      } else {
        throw new Error(response.data?.message || 'Upload failed - no success response');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Upload failed: ';
      
      if (error.response) {
        errorMessage += error.response.data?.message || `Server error (${error.response.status})`;
        console.log('Server error response:', error.response.data);
      } else if (error.request) {
        errorMessage += 'No response from server. Please check if the server is running.';
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            accept={fileType === "pdf" ? ".pdf" : ".json"}
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4 file:rounded-full 
                       file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-50 file:text-blue-700 
                       hover:file:bg-blue-100"
          />
          <div className="h-4 mt-1">
            {selectedFile && (
              <p className="text-xs text-gray-600 truncate">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Type
          </label>
          <select
            value={fileType}
            onChange={handleFileTypeChange}
            className="block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none 
                       focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pdf">PDF</option>
            <option value="json">JSON</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name/ID *
          </label>
          <input
            type="text"
            value={postedBy}
            onChange={handlePostedByChange}
            placeholder="Enter your name or user ID"
            className="block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none 
                       focus:ring-blue-500 focus:border-blue-500
                       placeholder-gray-400"
          />
        </div>

        <div className="flex items-center mt-3">
          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile || !postedBy.trim()}
            className="w-full flex items-center justify-center px-4 py-2 
                       bg-blue-600 text-white rounded-md 
                       hover:bg-blue-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;