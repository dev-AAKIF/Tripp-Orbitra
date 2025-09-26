// import React from "react";

// const Table = ({ data, loading, error, onRefresh }) => {
//   return (
//     <div className="mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Uploaded Itineraries</h3>
//         <button
//           onClick={onRefresh}
//           disabled={loading}
//           className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md
//                      hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500
//                      disabled:opacity-50"
//         >
//           Refresh
//         </button>
//       </div>

//       {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

//       <div className="overflow-x-auto border border-gray-200 rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {["ID", "Filename", "Total Cost", "Duration", "Activities", "Posted By"].map(
//                 (header) => (
//                   <th
//                     key={header}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   Loading data...
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   No itineraries uploaded
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, i) => (
//                 <tr key={row._id || i} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {row._id?.slice(-6) || i + 1}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {row.filename || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${row.totalCost || 0}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {row.totalDuration || 0} days
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {row.activitiesCount || row.activities?.length || 0}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {row.postedBy || "N/A"}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;

import React, { useState, useMemo } from "react";

const Table = ({ data, loading, error, onRefresh }) => {
  const [sortOption, setSortOption] = useState("");

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sorted = [...data];
    switch (sortOption) {
      case "cost-high":
        return sorted.sort((a, b) => (b.totalCost || 0) - (a.totalCost || 0));
      case "cost-low":
        return sorted.sort((a, b) => (a.totalCost || 0) - (b.totalCost || 0));
      case "duration-high":
        return sorted.sort(
          (a, b) => (b.totalDuration || 0) - (a.totalDuration || 0)
        );
      case "duration-low":
        return sorted.sort(
          (a, b) => (a.totalDuration || 0) - (b.totalDuration || 0)
        );
      case "activities-high":
        return sorted.sort(
          (a, b) =>
            (b.activitiesCount || b.activities?.length || 0) -
            (a.activitiesCount || a.activities?.length || 0)
        );
      case "activities-low":
        return sorted.sort(
          (a, b) =>
            (a.activitiesCount || a.activities?.length || 0) -
            (b.activitiesCount || b.activities?.length || 0)
        );
      default:
        return sorted; // no sorting
    }
  }, [data, sortOption]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Uploaded Itineraries
        </h3>

        <div className="flex items-center gap-3">
          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Compare (Sort by)</option>
            <option value="cost-high">Total Cost – Highest First</option>
            <option value="cost-low">Total Cost – Lowest First</option>
            <option value="duration-high">
              Total Duration – Longest First
            </option>
            <option value="duration-low">
              Total Duration – Shortest First
            </option>
            <option value="activities-high">Activities – Most First</option>
            <option value="activities-low">Activities – Least First</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md 
                       hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 
                       disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Filename",
                "Total Cost",
                "Duration",
                "Activities",
                "Posted By",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No itineraries uploaded
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <tr key={row._id || i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row._id?.slice(-6) || i + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.filename || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.totalCost || "N/A"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.totalDuration || 0} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.activitiesCount || row.activities?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.postedBy || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
