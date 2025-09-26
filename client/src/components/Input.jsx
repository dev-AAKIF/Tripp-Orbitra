// // import React, { useState } from "react";

// // const Input = ({ onUpload }) => {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [fileType, setFileType] = useState("pdf");
// //   const [postedBy, setPostedBy] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // Handle file input
// //   const handleFileChange = (e) => {
// //     setSelectedFile(e.target.files[0]);
// //   };

// //   // Handle file type change
// //   const handleFileTypeChange = (e) => {
// //     setFileType(e.target.value);
// //   };

// //   // Handle posted by change
// //   const handlePostedByChange = (e) => {
// //     setPostedBy(e.target.value);
// //   };

// //   // Handle upload
// //   const handleUpload = () => {
// //     if (!selectedFile || !postedBy.trim()) return;

// //     setLoading(true);

// //     const newItinerary = {
// //       id: Math.random().toString(36).substr(2, 6),
// //       filename: selectedFile.name,
// //       type: fileType.toUpperCase(),
// //       postedBy,
// //       totalCost: "$85000", // demo
// //       duration: "2 days", // demo
// //       activities: 5, // demo
// //     };

// //     onUpload(newItinerary);

// //     // Reset form
// //     setSelectedFile(null);
// //     setFileType("pdf");
// //     setPostedBy("");
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //         {/* File Input */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Select File
// //           </label>
// //           <input
// //             id="fileInput"
// //             type="file"
// //             onChange={handleFileChange}
// //             accept={fileType === "pdf" ? ".pdf" : ".json"}
// //             className="block w-full text-sm text-gray-500 
// //                        file:mr-4 file:py-2 file:px-4 file:rounded-full 
// //                        file:border-0 file:text-sm file:font-semibold 
// //                        file:bg-blue-50 file:text-blue-700 
// //                        hover:file:bg-blue-100"
// //           />
// //         </div>

// //         {/* File Type Selector */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             File Type
// //           </label>
// //           <select
// //             value={fileType}
// //             onChange={handleFileTypeChange}
// //             className="block w-full px-3 py-2 border border-gray-300 
// //                        rounded-md shadow-sm focus:outline-none 
// //                        focus:ring-blue-500 focus:border-blue-500"
// //           >
// //             <option value="pdf">PDF</option>
// //             <option value="json">JSON</option>
// //           </select>
// //         </div>

// //         {/* Posted By Input */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Your Name/ID *
// //           </label>
// //           <input
// //             type="text"
// //             value={postedBy}
// //             onChange={handlePostedByChange}
// //             placeholder="Enter your name or user ID"
// //             className="block w-full px-3 py-2 border border-gray-300 
// //                        rounded-md shadow-sm focus:outline-none 
// //                        focus:ring-blue-500 focus:border-blue-500
// //                        placeholder-gray-400"
// //           />
// //         </div>

// //         {/* Upload Button */}
// //         <div className="flex items-end">
// //           <button
// //             onClick={handleUpload}
// //             disabled={loading || !selectedFile || !postedBy.trim()}
// //             className="w-full flex items-center justify-center px-4 py-2 
// //                        bg-blue-600 text-white rounded-md 
// //                        hover:bg-blue-700 focus:outline-none 
// //                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
// //                        disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             {loading ? "Processing..." : "Upload"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Input;

// // Input.jsx - Updated version
// import React, { useState } from "react";
// import axios from "axios";

// const Input = ({ onUploadSuccess }) => {  // Changed from onUpload to onUploadSuccess
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileType, setFileType] = useState("pdf");
//   const [postedBy, setPostedBy] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle file input
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Handle file type change
//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//   };

//   // Handle posted by change
//   const handlePostedByChange = (e) => {
//     setPostedBy(e.target.value);
//   };

//   // Handle upload - Now with actual API call
//   const handleUpload = async () => {
//     if (!selectedFile || !postedBy.trim()) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('fileType', fileType);
//       formData.append('postedBy', postedBy);

//       // Make API call to your backend
//       const response = await axios.post('http://localhost:9000/api/itineraries/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         // Call the success callback to refresh the table
//         onUploadSuccess();
        
//         // Reset form
//         setSelectedFile(null);
//         setFileType("pdf");
//         setPostedBy("");
        
//         alert('File uploaded successfully!');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Upload failed: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* File Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select File
//           </label>
//           <input
//             id="fileInput"
//             type="file"
//             onChange={handleFileChange}
//             accept={fileType === "pdf" ? ".pdf" : ".json"}
//             className="block w-full text-sm text-gray-500 
//                        file:mr-4 file:py-2 file:px-4 file:rounded-full 
//                        file:border-0 file:text-sm file:font-semibold 
//                        file:bg-blue-50 file:text-blue-700 
//                        hover:file:bg-blue-100"
//           />
//         </div>

//         {/* File Type Selector */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             File Type
//           </label>
//           <select
//             value={fileType}
//             onChange={handleFileTypeChange}
//             className="block w-full px-3 py-2 border border-gray-300 
//                        rounded-md shadow-sm focus:outline-none 
//                        focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="pdf">PDF</option>
//             <option value="json">JSON</option>
//           </select>
//         </div>

//         {/* Posted By Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Your Name/ID *
//           </label>
//           <input
//             type="text"
//             value={postedBy}
//             onChange={handlePostedByChange}
//             placeholder="Enter your name or user ID"
//             className="block w-full px-3 py-2 border border-gray-300 
//                        rounded-md shadow-sm focus:outline-none 
//                        focus:ring-blue-500 focus:border-blue-500
//                        placeholder-gray-400"
//           />
//         </div>

//         {/* Upload Button */}
//         <div className="flex items-end">
//           <button
//             onClick={handleUpload}
//             disabled={loading || !selectedFile || !postedBy.trim()}
//             className="w-full flex items-center justify-center px-4 py-2 
//                        bg-blue-600 text-white rounded-md 
//                        hover:bg-blue-700 focus:outline-none 
//                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useState } from "react";
import axios from "axios";

const Input = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("pdf");
  const [postedBy, setPostedBy] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Debug log
    setSelectedFile(file);
  };

  // Handle file type change
  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    // Clear file when type changes to force re-selection with correct type
    setSelectedFile(null);
  };

  // Handle posted by change
  const handlePostedByChange = (e) => {
    setPostedBy(e.target.value);
  };

  // Handle upload - Optimized for your multer configuration
  const handleUpload = async () => {
    if (!selectedFile || !postedBy.trim()) {
      alert('Please select a file and enter your name/ID');
      return;
    }

    // Validate file type matches your backend filter
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const validExtensions = ['pdf', 'json'];
    const validMimeTypes = ['application/pdf', 'application/json', 'text/json'];
    
    if (!validExtensions.includes(fileExtension)) {
      alert(`Please select a valid file type. Allowed: ${validExtensions.join(', ').toUpperCase()}`);
      return;
    }

    // Additional MIME type check
    if (!validMimeTypes.includes(selectedFile.type) && selectedFile.type !== '') {
      console.warn('MIME type warning:', selectedFile.type, 'might not be accepted by server');
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      // Use the exact field name your backend expects
      formData.append('file', selectedFile, selectedFile.name);
      
      // Add metadata that your backend can access via req.body
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

      // Log FormData contents for debugging
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Make API call matching your exact backend route
      const response = await axios.post('http://localhost:9000/api/itineraries/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // Increased timeout for file processing
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      });

      console.log('Upload response:', response.data);

      if (response.data && response.data.success) {
        // Call the success callback to refresh the table
        if (onUploadSuccess) {
          onUploadSuccess();
        }
        
        // Reset form
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
        // Server responded with error status
        errorMessage += error.response.data?.message || `Server error (${error.response.status})`;
        console.log('Server error response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        errorMessage += 'No response from server. Please check if the server is running.';
      } else {
        // Something else happened
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
        {/* File Input */}
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
          {selectedFile && (
            <p className="text-xs text-gray-600 mt-1">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>

        {/* File Type Selector */}
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

        {/* Posted By Input */}
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

        {/* Upload Button */}
        <div className="flex items-end">
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