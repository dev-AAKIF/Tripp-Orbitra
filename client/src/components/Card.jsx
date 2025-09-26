// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const Card = () => {
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [fileType, setFileType] = useState("pdf");
// // //   const [tableData, setTableData] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   // Fetch itineraries from backend
// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const res = await axios.get("http://localhost:9000/api/itineraries");
// // //       setTableData(res.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("Failed to fetch data from API");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const handleFileChange = (event) => {
// // //     const file = event.target.files[0];
// // //     console.log(file, "sdfghjk")
// // //     setSelectedFile(file);
// // //   };

// // //   const handleFileTypeChange = (event) => {
// // //     setFileType(event.target.value);
// // //   };

// // //   const handleUpload = async () => {
// // //     if (!selectedFile) {
// // //       setError("Please select a file to upload");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("file", selectedFile);
// // //       formData.append("fileType", fileType);

// // //       await axios.post("http://localhost:9000/api/itineraries/upload", formData, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });

// // //       await fetchData();
// // //       console.log(formData);
// // //       setSelectedFile(null);
// // //       document.getElementById("fileInput").value = "";
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("Failed to upload file");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const statusColors = {
// // //       Active: "bg-green-100 text-green-800",
// // //       Inactive: "bg-red-100 text-red-800",
// // //       Pending: "bg-yellow-100 text-yellow-800",
// // //     };

// // //     return (
// // //       <span
// // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //           statusColors[status] || "bg-gray-100 text-gray-800"
// // //         }`}
// // //       >
// // //         {status}
// // //       </span>
// // //     );
// // //   };

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// // //       {/* Header */}
// // //       <div className="mb-6">
// // //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //           File Upload & Itinerary Comparison
// // //         </h2>
// // //         <p className="text-gray-600">
// // //           Upload PDF/JSON itineraries and compare them
// // //         </p>
// // //       </div>

// // //       {/* File Upload Section */}
// // //       <div className="bg-gray-50 rounded-lg p-6 mb-6">
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           {/* File Input */}
// // //           <div className="md:col-span-1">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Select File
// // //             </label>
// // //             <input
// // //               id="fileInput"
// // //               type="file"
// // //               onChange={handleFileChange}
// // //               accept={fileType === "pdf" ? ".pdf" : ".json"}
// // //               className="block w-full text-sm text-gray-500 
// // //                          file:mr-4 file:py-2 file:px-4 file:rounded-full 
// // //                          file:border-0 file:text-sm file:font-semibold 
// // //                          file:bg-blue-50 file:text-blue-700 
// // //                          hover:file:bg-blue-100"
// // //             />
// // //           </div>

// // //           {/* File Type Selector */}
// // //           <div className="md:col-span-1">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               File Type
// // //             </label>
// // //             <select
// // //               value={fileType}
// // //               onChange={handleFileTypeChange}
// // //               className="block w-full px-3 py-2 border border-gray-300 
// // //                          rounded-md shadow-sm focus:outline-none 
// // //                          focus:ring-blue-500 focus:border-blue-500"
// // //             >
// // //               <option value="pdf">PDF</option>
// // //               <option value="json">JSON</option>
// // //             </select>
// // //           </div>

// // //           {/* Upload Button */}
// // //           <div className="md:col-span-1 flex items-end">
// // //             <button
// // //               onClick={handleUpload}
// // //               disabled={loading || !selectedFile}
// // //               className="w-full flex items-center justify-center px-4 py-2 
// // //                          bg-blue-600 text-white rounded-md 
// // //                          hover:bg-blue-700 focus:outline-none 
// // //                          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
// // //                          disabled:opacity-50 disabled:cursor-not-allowed"
// // //             >
// // //               {loading ? "Processing..." : "Upload"}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Selected File Info */}
// // //         {selectedFile && (
// // //           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
// // //             <span className="text-sm text-blue-700">
// // //               Selected: {selectedFile.name} (
// // //               {(selectedFile.size / 1024).toFixed(1)} KB)
// // //             </span>
// // //           </div>
// // //         )}

// // //         {/* Error Message */}
// // //         {error && (
// // //           <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
// // //             <span className="text-sm text-red-700">{error}</span>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Data Table Section */}
// // //       <div>
// // //         <div className="flex items-center justify-between mb-4">
// // //           <h3 className="text-lg font-semibold text-gray-900">
// // //             Uploaded Itineraries
// // //           </h3>
// // //           <button
// // //             onClick={fetchData}
// // //             disabled={loading}
// // //             className="px-3 py-1 text-sm bg-gray-100 text-gray-700 
// // //                        rounded-md hover:bg-gray-200 focus:outline-none 
// // //                        focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
// // //           >
// // //             Refresh
// // //           </button>
// // //         </div>

// // //         {/* Table */}
// // //         <div className="overflow-x-auto border border-gray-200 rounded-lg">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   ID
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Total Cost
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Duration
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Activities
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
// // //                     Loading data...
// // //                   </td>
// // //                 </tr>
// // //               ) : tableData.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
// // //                     No itineraries uploaded
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 tableData.map((row, i) => (
// // //                   <tr key={i} className="hover:bg-gray-50">
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// // //                       {row._id || i + 1}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// // //                       ${row.totalCost}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// // //                       {row.totalDuration} days
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// // //                       {row.activities?.length || 0}
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Card;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Input from "./Input";

// // const Card = () => {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [fileType, setFileType] = useState("pdf");
// //   const [postedBy, setPostedBy] = useState(""); // Add postedBy state
// //   const [tableData, setTableData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Fetch itineraries from backend
// //   // const fetchData = async () => {
// //   //   setLoading(true);
// //   //   setError("");

// //   //   try {
// //   //     const res = await axios.get("http://localhost:9000/api/itineraries");
// //   //     setTableData(res.data || []);
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //     setError("Failed to fetch data from API");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   // useEffect(() => {
// //   //   fetchData();
// //   // }, []);

// //   // Update your fetchData function in the React component

// // const fetchData = async () => {
// //   setLoading(true);
// //   setError("");

// //   try {
// //     const res = await axios.get("http://localhost:9000/api/itineraries");
// //     console.log("API Response:", res.data);
    
// //     // Handle different response formats
// //     if (res.data.success && res.data.data) {
// //       // If the response has success flag and data array
// //       setTableData(res.data.data);
// //     } else if (Array.isArray(res.data)) {
// //       // If the response is directly an array
// //       setTableData(res.data);
// //     } else if (res.data) {
// //       // If there's some other data structure
// //       setTableData([res.data]);
// //     } else {
// //       setTableData([]);
// //     }
// //   } catch (err) {
// //     console.error("Fetch error:", err);
// //     setError("Failed to fetch data from API: " + (err.response?.data?.message || err.message));
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     console.log(file, "selected file");
// //     setSelectedFile(file);
// //   };

// //   const handleFileTypeChange = (event) => {
// //     setFileType(event.target.value);
// //   };

// //   const handlePostedByChange = (event) => {
// //     setPostedBy(event.target.value);
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedFile) {
// //       setError("Please select a file to upload");
// //       return;
// //     }

// //     if (!postedBy.trim()) {
// //       setError("Please enter your name or user ID");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", selectedFile);
// //       formData.append("fileType", fileType);
// //       formData.append("postedBy", postedBy.trim()); // Add postedBy to form data

// //       console.log("Uploading with data:", {
// //         file: selectedFile.name,
// //         fileType,
// //         postedBy: postedBy.trim()
// //       });

// //       await axios.post("http://localhost:9000/api/itineraries/upload", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       await fetchData();
// //       setSelectedFile(null);
// //       setPostedBy(""); // Reset postedBy field
// //       document.getElementById("fileInput").value = "";
// //     } catch (err) {
// //       console.error("Upload error:", err);
// //       setError(err.response?.data?.message || "Failed to upload file");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusColors = {
// //       Active: "bg-green-100 text-green-800",
// //       Inactive: "bg-red-100 text-red-800",
// //       Pending: "bg-yellow-100 text-yellow-800",
// //     };

// //     return (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// //           statusColors[status] || "bg-gray-100 text-gray-800"
// //         }`}
// //       >
// //         {status}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// //       {/* Header */}
// //       <div className="mb-6">
// //         <h2 className="text-2xl font-bold text-gray-900 mb-2 font-grandstander">
// //           Itinerary Comparer
// //         </h2> 
// //         <p className="text-gray-600 font-grandstander">
// //           Upload PDF/JSON itineraries and compare them
// //         </p>
// //       </div>

// //       {/* File Upload Section */}
// //        <Input />

// //       {/* Data Table Section */}
// //       <div>
// //         <div className="flex items-center justify-between mb-4">
// //           <h3 className="text-lg font-semibold text-gray-900">
// //             Uploaded Itineraries
// //           </h3>
// //           <button
// //             onClick={fetchData}
// //             disabled={loading}
// //             className="px-3 py-1 text-sm bg-gray-100 text-gray-700 
// //                        rounded-md hover:bg-gray-200 focus:outline-none 
// //                        focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
// //           >
// //             Refresh
// //           </button>
// //         </div>

// //         {/* Table */}
// //         <div className="overflow-x-auto border border-gray-200 rounded-lg">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   ID
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Filename
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Total Cost
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Duration
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Activities
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Posted By
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
// //                     Loading data...
// //                   </td>
// //                 </tr>
// //               ) : tableData.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
// //                     No itineraries uploaded
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 tableData.map((row, i) => (
// //                   <tr key={row._id || i} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {row._id?.slice(-6) || i + 1}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {row.filename || 'N/A'}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       ${row.totalCost || 0}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {row.totalDuration || 0} days
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {row.activitiesCount || row.activities?.length || 0}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {row.postedBy || 'N/A'}
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Input from "./Input";
// import Table from "./Table";

// const Card = () => {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch itineraries
//   const fetchData = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.get("http://localhost:9000/api/itineraries");

//       if (res.data.success && res.data.data) {
//         setTableData(res.data.data);
//       } else if (Array.isArray(res.data)) {
//         setTableData(res.data);
//       } else {
//         setTableData([]);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch data: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2 font-grandstander">
//           Itinerary Comparer
//         </h2>
//         <p className="text-gray-600 font-grandstander">
//           Upload PDF/JSON itineraries and compare them
//         </p>
//       </div>

//       {/* Input Component (refreshes table after upload) */}
//       <Input onUploadSuccess={fetchData} onUpload={handleUpload} />

//       {/* Table Component */}
//       <Table
//         data={tableData}
//         loading={loading}
//         error={error}
//         onRefresh={fetchData}
//       />
//     </div>
//   );
// };

// export default Card;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import Table from "./Table";

const Card = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch itineraries
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:9000/api/itineraries");

      if (res.data.success && res.data.data) {
        setTableData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setTableData(res.data);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-grandstander">
          Itinerary Comparer
        </h2>
        <p className="text-gray-600 font-grandstander">
          Upload PDF/JSON itineraries and compare them
        </p>
      </div>

      {/* Input Component (refreshes table after upload) */}
      <Input onUpload={fetchData}/>
      

      {/* Table Component */}
      <Table
        data={tableData}
        loading={loading}
        error={error}
        onRefresh={fetchData}
      />
    </div>
  );
};

export default Card;
