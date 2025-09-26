import React, { useState, useMemo } from "react";

const Table = ({ data, loading, error, onRefresh }) => {
  const [sortOption, setSortOption] = useState("");

  const calculateScore = (itinerary) => {
    let score = 100;
    let rationale = [];
    
    const cost = parseFloat(itinerary.totalCost) || 0;
    const duration = parseInt(itinerary.totalDuration) || 0;
    const activitiesCount = itinerary.activitiesCount || itinerary.activities?.length || 0;

    if (cost > 2000) {
      score -= 20;
      rationale.push("High cost");
    } else if (cost < 500 && cost > 0) {
      score -= 10;
      rationale.push("Very low cost");
    }

    if (duration < 3 && duration > 0) {
      score -= 15;
      rationale.push("Too short");
    } else if (duration > 14) {
      score -= 10;
      rationale.push("Very long");
    }

    if (activitiesCount < 5 && activitiesCount > 0) {
      score -= 10;
      rationale.push("Few activities");
    } else if (activitiesCount > 20) {
      score -= 5;
      rationale.push("Too many activities");
    }

    if (cost >= 500 && cost <= 2000 && 
        duration >= 3 && duration <= 10 && 
        activitiesCount >= 5 && activitiesCount <= 15) {
      score += 10;
      rationale.push("Well-balanced");
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      rationale: rationale.length ? rationale.join(", ") : "Standard itinerary"
    };
  };

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const dataWithScores = data.map(item => ({
      ...item,
      ...calculateScore(item)
    }));

    switch (sortOption) {
      case "score-high":
        return dataWithScores.sort((a, b) => b.score - a.score);
      case "score-low":
        return dataWithScores.sort((a, b) => a.score - b.score);
      case "cost-high":
        return dataWithScores.sort((a, b) => (b.totalCost || 0) - (a.totalCost || 0));
      case "cost-low":
        return dataWithScores.sort((a, b) => (a.totalCost || 0) - (b.totalCost || 0));
      case "duration-high":
        return dataWithScores.sort(
          (a, b) => (b.totalDuration || 0) - (a.totalDuration || 0)
        );
      case "duration-low":
        return dataWithScores.sort(
          (a, b) => (a.totalDuration || 0) - (b.totalDuration || 0)
        );
      case "activities-high":
        return dataWithScores.sort(
          (a, b) =>
            (b.activitiesCount || b.activities?.length || 0) -
            (a.activitiesCount || a.activities?.length || 0)
        );
      case "activities-low":
        return dataWithScores.sort(
          (a, b) =>
            (a.activitiesCount || a.activities?.length || 0) -
            (b.activitiesCount || b.activities?.length || 0)
        );
      default:
        return dataWithScores;
    }
  }, [data, sortOption]);

  const getScoreBadgeClass = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 75) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (score >= 40) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Uploaded Itineraries
        </h3>

        <div className="flex items-center gap-3">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Compare (Sort by)</option>
            <option value="score-high">Score – Highest First</option>
            <option value="score-low">Score – Lowest First</option>
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
                "Score",
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
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
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
                    ₹{row.totalCost || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.totalDuration || 0} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.activitiesCount || row.activities?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-col items-start space-y-1">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getScoreBadgeClass(row.score)}`}
                        title={row.rationale}
                      >
                        {row.score}/100
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-24" title={row.rationale}>
                        {row.rationale}
                      </span>
                    </div>
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