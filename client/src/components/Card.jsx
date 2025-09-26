import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import Table from "./Table";

const Card = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetching itineraries
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">

    <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-grandstander">
          Itinerary Comparer
        </h2>
        <p className="text-gray-600 font-grandstander">
          Upload PDF/JSON itineraries and compare them
        </p>
      </div>

      <Input onUpload={fetchData} onUploadSuccess={fetchData}/>
  
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
